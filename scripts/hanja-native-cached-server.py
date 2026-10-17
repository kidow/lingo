#!/usr/bin/env python3
"""고정 검토 helper의 최초 컴파일 결과를 RAM에서 재사용합니다."""
import sys
sys.dont_write_bytecode = True

import argparse
import ast
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
from http.server import ThreadingHTTPServer


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def assigned_read_file(tree, variable):
    """기존 HERE/'literal' read_bytes 계약만 허용하고 경로를 추측하지 않습니다."""
    assignments = [node for node in tree.body if isinstance(node, ast.Assign)
                   and any(isinstance(t, ast.Name) and t.id == variable
                           for t in node.targets)]
    require(len(assignments) == 1, f"Expected one {variable} assignment")
    paths = []
    for node in ast.walk(assignments[0].value):
        if not (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                and node.func.attr == "read_bytes" and not node.args
                and not node.keywords):
            continue
        value = node.func.value
        if (isinstance(value, ast.BinOp) and isinstance(value.op, ast.Div)
                and isinstance(value.left, ast.Name) and value.left.id == "HERE"
                and isinstance(value.right, ast.Constant)
                and isinstance(value.right.value, str)):
            paths.append(value.right.value)
    require(len(paths) == 1, f"Unsupported {variable} file contract")
    require(Path(paths[0]).name == paths[0], "Expected a local literal filename")
    return paths[0]


class ReviewedInputs:
    def __init__(self, helper, wrapper, config_file, config, expected, reader):
        self.helper = helper
        self.wrapper = wrapper
        self.config_file = config_file
        self.config = config
        self.expected = expected
        self.reader = reader

    def verify(self):
        for path, expected in self.expected.items():
            require(sha256(self.reader(path)) == expected,
                    f"Reviewed input changed: {path.name}")


def capture_contract(helper, reader=None):
    reader = reader or Path.read_bytes
    require(helper.is_absolute(), "--helper must be an absolute reviewed file path")
    require(helper.suffix == ".py", "--helper must name a reviewed Python helper")
    helper = helper.resolve()
    helper_bytes = reader(helper)
    tree = ast.parse(helper_bytes, filename=str(helper))
    wrapper = helper.parent / assigned_read_file(tree, "WRAPPER_SHA")
    config_file = helper.parent / assigned_read_file(tree, "A_BYTES")
    cache_assignments = [node for node in tree.body if isinstance(node, ast.Assign)
                         and any(isinstance(t, ast.Name) and t.id == "C"
                                 for t in node.targets)]
    require(len(cache_assignments) == 1, "Expected one original C=compiled()")
    call = cache_assignments[0].value
    require(isinstance(call, ast.Call) and isinstance(call.func, ast.Name)
            and call.func.id == "compiled" and not call.args and not call.keywords,
            "Only the reviewed eager C=compiled() helper contract is supported")
    config_bytes = reader(config_file)
    config = json.loads(config_bytes)
    require(isinstance(config, dict), "Expected an object preparation config")
    require(isinstance(config.get("selectedWhole"), str) and config["selectedWhole"],
            "Exact selectedWhole is required")
    strict_sha = config.get("strictPreparationSHA256")
    require(isinstance(strict_sha, str) and re.fullmatch(r"[0-9a-f]{64}", strict_sha),
            "Explicit strictPreparationSHA256 is required")
    strict_file = helper.parent / "strict-source-preparation.json"
    require(sha256(reader(strict_file)) == strict_sha,
            "strict-source-preparation.json does not match strictPreparationSHA256")
    expected = {helper: sha256(helper_bytes), wrapper: sha256(reader(wrapper)),
                config_file: sha256(config_bytes), strict_file: strict_sha}
    contract = ReviewedInputs(helper, wrapper, config_file, config, expected, reader)
    contract.verify()
    return contract


def install_cache(module, contract):
    """컴파일을 호출하지 않고 기존 C 객체와 원 guard를 그대로 사용합니다."""
    contract.verify()
    require(module.HERE.resolve() == contract.helper.parent, "Helper HERE mismatch")
    require(module.A == contract.config, "Imported helper config mismatch")
    require(module.SERVER_SHA == contract.expected[contract.helper], "Helper SHA mismatch")
    require(module.WRAPPER_SHA == contract.expected[contract.wrapper], "Wrapper SHA mismatch")
    require(module.A_SHA == contract.expected[contract.config_file], "Config SHA mismatch")
    original_guards = module.guards
    original_cache = module.C
    selected = contract.config["selectedWhole"]
    require(isinstance(original_cache, dict) and original_cache.get("sourceRoot") == selected,
            "Original C must belong to the exact selectedWhole")
    require(isinstance(original_cache.get("strokes"), list)
            and isinstance(original_cache.get("render"), str),
            "Original compiled strokes and renderer are required")

    def guarded():
        contract.verify()
        original_guards()

    def cached(root=None):
        guarded()
        require(root is None or root == selected,
                "Unsupported whole: cached results have no alias or fallback")
        return original_cache

    guarded()
    module.guards = guarded
    module.compiled = cached
    return original_cache


def load_reviewed_helper(contract):
    contract.verify()
    name = "hanja_cached_review_" + contract.expected[contract.helper][:16]
    spec = importlib.util.spec_from_file_location(name, contract.helper)
    require(spec is not None and spec.loader is not None, "Cannot load reviewed helper")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    try:
        # 기존 helper import는 C=compiled()를 한 번 실행하며 국내 SVG도 RAM에서 읽습니다.
        spec.loader.exec_module(module)
        install_cache(module, contract)
    except BaseException:
        sys.modules.pop(name, None)
        raise
    return module


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--helper", type=Path, required=True)
    parser.add_argument("--port", type=int, default=0)
    args = parser.parse_args()
    require(0 <= args.port <= 65535, "--port must be between 0 and 65535")
    contract = capture_contract(args.helper)
    module = load_reviewed_helper(contract)
    # 원 Handler·renderer·국내 RAM cache를 바꾸지 않습니다.
    with ThreadingHTTPServer(("127.0.0.1", args.port), module.Handler) as server:
        print(json.dumps({"helper": str(contract.helper), "pid": os.getpid(),
                          "port": server.server_address[1],
                          "sourceRoot": contract.config["selectedWhole"],
                          "originalImportCompilerCalls": 1,
                          "requestCompilerCalls": 0,
                          "cachedOriginalC": True,
                          "privateMediaSaved": False}, ensure_ascii=False), flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
