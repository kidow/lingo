#!/usr/bin/env python3
"""Fake module·RAM 파일 fixture로만 검증합니다. helper import·서버·컴파일 없음."""
import sys
sys.dont_write_bytecode = True

import hashlib
import importlib.util
import json
from pathlib import Path
from types import SimpleNamespace
import unittest

SPEC = importlib.util.spec_from_file_location(
    "hanja_native_cached_server", Path(__file__).with_name("hanja-native-cached-server.py"))
runner = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(runner)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def fixture(order=False):
    directory = Path("/reviewed-candidate")
    helper = directory / ("serve-source-order.py" if order else "serve-combined-native.py")
    config_name = "source-order-preparation.json" if order else "combined-native-source-pins.json"
    wrapper_name = "server-compile-source-order.mjs" if order else "server-compile-strict-candidate.mjs"
    strict = b'{"sourceOnly":true}\n'
    config = {"selectedWhole": "u1234", "strictPreparationSHA256": digest(strict),
              "inputSHA256": {}, "nativeApproval": False, "runtimeApplied": False}
    helper_bytes = ("WRAPPER_SHA=hashlib.sha256((HERE/'" + wrapper_name
                    + "').read_bytes()).hexdigest()\nA_BYTES=(HERE/'" + config_name
                    + "').read_bytes()\nC=compiled()\n").encode()
    files = {helper: helper_bytes, directory / wrapper_name: b"// original wrapper\n",
             directory / config_name: json.dumps(config).encode(),
             directory / "strict-source-preparation.json": strict}
    contract = runner.capture_contract(helper, files.__getitem__)
    calls = {"compiled": 0, "guards": 0, "reject_guard": False}

    def original_compiled(root=None):
        calls["compiled"] += 1
        raise AssertionError("Original compiler must never run in request cache")

    def original_guards():
        calls["guards"] += 1
        if calls["reject_guard"]:
            raise ValueError("original source pin rejected")

    handler = object()
    cache = {"sourceRoot": "u1234", "strokes": [[{"originalMask": True}]],
             "render": "function render(){}"}
    module = SimpleNamespace(HERE=directory, A=config, C=cache, Handler=handler,
                             SERVER_SHA=digest(helper_bytes),
                             WRAPPER_SHA=digest(files[directory / wrapper_name]),
                             A_SHA=digest(files[directory / config_name]),
                             guards=original_guards, compiled=original_compiled)
    return files, contract, module, calls


class CachedNativeRunnerTests(unittest.TestCase):
    def test_requests_reuse_exact_original_c_and_handler_without_compiling(self):
        files, contract, module, calls = fixture()
        original_c, handler = module.C, module.Handler
        result = runner.install_cache(module, contract)
        self.assertIs(result, original_c)
        for _ in range(25):
            self.assertIs(module.compiled(), original_c)
            self.assertIs(module.compiled("u1234"), original_c)
        self.assertIs(module.Handler, handler)
        self.assertIs(module.C, original_c)
        self.assertEqual(calls["compiled"], 0)
        self.assertEqual(calls["guards"], 51)

    def test_unsupported_roots_never_fall_back_to_cached_whole(self):
        files, contract, module, calls = fixture()
        runner.install_cache(module, contract)
        for root in ["", "u1234-ue0100", "wrong", False, 0]:
            with self.subTest(root=root), self.assertRaisesRegex(ValueError, "Unsupported whole"):
                module.compiled(root)
        self.assertEqual(calls["compiled"], 0)

    def test_every_request_rejects_helper_wrapper_config_or_strict_sha_drift(self):
        for which in ["helper", "wrapper", "config", "strict"]:
            with self.subTest(which=which):
                files, contract, module, calls = fixture()
                runner.install_cache(module, contract)
                paths = {"helper": contract.helper, "wrapper": contract.wrapper,
                         "config": contract.config_file,
                         "strict": contract.helper.parent / "strict-source-preparation.json"}
                files[paths[which]] += b"changed"
                with self.assertRaisesRegex(ValueError, "Reviewed input changed"):
                    module.compiled()
                self.assertEqual(calls["compiled"], 0)

    def test_original_source_guard_is_still_enforced(self):
        files, contract, module, calls = fixture()
        runner.install_cache(module, contract)
        calls["reject_guard"] = True
        with self.assertRaisesRegex(ValueError, "original source pin rejected"):
            module.compiled()
        self.assertEqual(calls["compiled"], 0)

    def test_order_helper_preserves_its_own_config_and_wrapper(self):
        files, contract, module, calls = fixture(order=True)
        self.assertEqual(contract.config_file.name, "source-order-preparation.json")
        self.assertEqual(contract.wrapper.name, "server-compile-source-order.mjs")
        runner.install_cache(module, contract)
        self.assertIs(module.compiled("u1234"), module.C)
        self.assertEqual(calls["compiled"], 0)

    def test_declared_strict_sha_is_required_and_must_match_before_import(self):
        for sha in [None, "0" * 64]:
            with self.subTest(sha=sha):
                files, contract, module, calls = fixture()
                config = dict(module.A)
                if sha is None:
                    del config["strictPreparationSHA256"]
                else:
                    config["strictPreparationSHA256"] = sha
                files[contract.config_file] = json.dumps(config).encode()
                with self.assertRaisesRegex(ValueError, "strictPreparationSHA256"):
                    runner.capture_contract(contract.helper, files.__getitem__)
                self.assertEqual(calls["compiled"], 0)

    def test_wrong_cached_root_is_not_accepted(self):
        files, contract, module, calls = fixture()
        module.C["sourceRoot"] = "u1234-ue0100"
        with self.assertRaisesRegex(ValueError, "exact selectedWhole"):
            runner.install_cache(module, contract)
        self.assertEqual(calls["compiled"], 0)


if __name__ == "__main__":
    unittest.main()
