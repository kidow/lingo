#!/usr/bin/env python3
"""원본29핀을 보존하고 전체 자형 목록만 RAM에 추가합니다."""
import sys
sys.dont_write_bytecode = True
import argparse
import ast
import copy
import hashlib
import importlib.util
import json
import os
from pathlib import Path
from http.server import ThreadingHTTPServer

HERE = Path(__file__).resolve().parent
SELF = Path(__file__).resolve()
CONFIG_FILE = HERE / "whole-list-native-config.json"
PREP_FILE = HERE / "whole-list-native-preparation.json"
CONFIG_BYTES = CONFIG_FILE.read_bytes()
PREP_BYTES = PREP_FILE.read_bytes()
CONFIG = json.loads(CONFIG_BYTES)
PREP = json.loads(PREP_BYTES)
SELF_SHA = hashlib.sha256(SELF.read_bytes()).hexdigest()
PREP_SHA = hashlib.sha256(PREP_BYTES).hexdigest()
WHOLES = ["u9ad3", "u9ad3-k", "u9ad3-ue0100", "u9ad3-ue0101", "u9ad3-ue0102"]
CONFIG_KEYS = {"schemaVersion", "batch", "purpose", "helperFile", "sourceFile",
               "originalManifest", "strictPreparation", "cachedRunnerFile",
               "cachedRunnerSHA256", "selectedWhole", "wholeNames", "originalPins",
               "nativeApproval", "runtimeApplied", "privateMediaSaved"}

def require(value, message):
    if not value:
        raise ValueError(message)

def sha(data):
    return hashlib.sha256(data).hexdigest()

def validate_config(cfg):
    require(set(cfg) == CONFIG_KEYS, "Exact UI config keys required")
    require(cfg["schemaVersion"] == 1 and cfg["batch"] == 1122, "Exact batch required")
    require(cfg["helperFile"] == "serve-combined-native.py", "Original helper only")
    require(cfg["sourceFile"] == "sources.json", "Original sources only")
    require(cfg["originalManifest"] == "combined-native-source-pins.json", "Original manifest only")
    require(cfg["strictPreparation"] == "strict-source-preparation.json", "Original strict preparation only")
    require(cfg["cachedRunnerFile"] == "../../scripts/hanja-native-cached-server.py", "Reviewed cached runner only")
    require(cfg["cachedRunnerSHA256"] == PREP["cachedRunnerSHA256"], "Cached runner SHA changed")
    require(cfg["selectedWhole"] == "u9ad3-ue0102", "Selected whole unchanged")
    require(cfg["wholeNames"] == WHOLES, "Exact five whole names and order required")
    require(cfg["originalPins"] == PREP["originalPins"], "Original pin contract changed")
    require(len(cfg["originalPins"]) == 29, "Original29pins required")
    require(cfg["nativeApproval"] is False and cfg["runtimeApplied"] is False
            and cfg["privateMediaSaved"] is False, "No approval or private persistence")
    for filename, expected in cfg["originalPins"].items():
        require(sha((HERE / filename).read_bytes()) == expected, "Original changed: " + filename)
    require(sha((HERE / cfg["cachedRunnerFile"]).read_bytes()) == cfg["cachedRunnerSHA256"],
            "Cached runner changed")
    sources = json.loads((HERE / cfg["sourceFile"]).read_bytes())
    require(sources["wholeNames"] == cfg["wholeNames"], "Pinned sources whole list mismatch")
    require(sources["renderableWholeNames"] == cfg["wholeNames"], "Pinned renderable source list mismatch")
    require(sources["missing"] == [] and sources["aliases"] == [], "Incomplete public closure")
    for record in sources["records"].values():
        for raw in record["data"].split("$"):
            parts = raw.split(":")
            if parts[0] == "99":
                require(parts[7] in sources["records"], "Missing fixed dependency")
    audit = json.loads((HERE / cfg["originalManifest"]).read_bytes())
    require("renderableWholeNames" not in audit, "Original absent-field contract changed")
    require(audit["selectedWhole"] == cfg["selectedWhole"], "Selected root drift")
    require(audit["strictPreparationSHA256"] == cfg["originalPins"][cfg["strictPreparation"]],
            "Original strict preparation binding mismatch")
    header = json.loads((HERE / "engine-proof.json").read_bytes())
    require(set(header) == {"engineRevision", "engineHashes", "groups", "trace", "defaults"},
            "Original full5 header required")
    for root in cfg["wholeNames"]:
        filename = "engine-whole-" + root + ".json"
        require(filename in cfg["originalPins"], "Whole proof not pinned")
        proof = json.loads((HERE / filename).read_bytes())
        require(set(proof) in ({"groups", "trace", "defaults"},
                               {"engineRevision", "engineHashes", "groups", "trace", "defaults"}),
                "Exact original whole proof schema required")
        require(len(proof["trace"]) == len(proof["groups"]), "Whole row mismatch")
        for row, group in zip(proof["trace"], proof["groups"]):
            require([poly for call in row for poly in call["polygons"]] == group["polygons"],
                    "Original primitive/group mismatch")
        if "engineRevision" in proof:
            require(proof["engineRevision"] == header["engineRevision"], "Whole revision drift")
            require(proof["engineHashes"] == header["engineHashes"], "Whole engine drift")
    return {"originalPins": 29, "wholeProofs": 5, "selectedWhole": cfg["selectedWhole"],
            "sourceCompilations": 0, "engineRuns": 0, "privateHTTP": 0}

def guards():
    require(sha(PREP_FILE.read_bytes()) == PREP_SHA, "UI preparation changed")
    require(sha(CONFIG_FILE.read_bytes()) == PREP["configSHA256"], "UI config changed")
    require(sha(SELF.read_bytes()) == SELF_SHA == PREP["newFilesSHA256"]["serve-whole-list-native.py"],
            "UI helper changed")
    return validate_config(CONFIG)

def load_runner():
    filename = (HERE / CONFIG["cachedRunnerFile"]).resolve()
    spec = importlib.util.spec_from_file_location("hanja_whole_list_cached_runner", filename)
    require(spec is not None and spec.loader is not None, "Cannot load fixed cached runner")
    runner = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(runner)
    return runner

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=0)
    parser.add_argument("--check-only", action="store_true")
    args = parser.parse_args()
    require(0 <= args.port <= 65535, "Invalid port")
    checked = guards()
    if args.check_only:
        print(json.dumps({"staticCheck": True, **checked, "originalHelperImported": False,
                          "serverStarts": 0, "nativeApproval": False, "runtimeApplied": False}))
        return
    runner = load_runner()
    contract = runner.capture_contract((HERE / CONFIG["helperFile"]).resolve())
    # 원 helper import의 C=compiled() 한 번만 실행하며 국내 SVG는 원 RAM cache에 둡니다.
    module = runner.load_reviewed_helper(contract)
    original_a = copy.deepcopy(module.A)
    original_c = module.C
    original_cached = module.compiled
    original_guards = module.guards
    require("renderableWholeNames" not in original_a, "Only absent UI field may be added")
    module.A["renderableWholeNames"] = list(CONFIG["wholeNames"])
    expected_a = {**original_a, "renderableWholeNames": list(CONFIG["wholeNames"])}
    def ui_guards():
        guards()
        require(module.A == expected_a, "Only UI whole list addition is allowed")
        require(module.C is original_c, "Original compiled cache changed")
        original_guards()
    def cached(root=None):
        ui_guards()
        value = original_cached(root)
        require(value is original_c, "Original cached C identity changed")
        return value
    module.guards = ui_guards
    module.compiled = cached
    ui_guards()
    # 원 Handler·원 geometry·renderer·선택 root/guard는 그대로입니다.
    with ThreadingHTTPServer(("127.0.0.1", args.port), module.Handler) as server:
        print(json.dumps({"batch": 1122, "pid": os.getpid(), "port": server.server_address[1],
                          "sourceRoot": CONFIG["selectedWhole"], "wholeViews": CONFIG["wholeNames"],
                          "originalImportCompilerCalls": 1, "requestCompilerCalls": 0,
                          "cachedOriginalC": True, "privateMediaSaved": False,
                          "nativeApproval": False, "runtimeApplied": False}), flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass

if __name__ == "__main__":
    main()
