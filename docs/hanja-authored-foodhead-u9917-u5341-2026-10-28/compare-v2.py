#!/usr/bin/env python3
# Exact v2 normal-body scaling; immutable v1 adapter and every original source D retained.
import sys
sys.dont_write_bytecode=True
import hashlib,importlib.util
from pathlib import Path
HERE=Path(__file__).resolve().parent
BASE=HERE/'compare.py'
assert hashlib.sha256(BASE.read_bytes()).hexdigest()=='fb87de726f21566ba4513d8ec26e2d16aa2de13844cb526c0e12413b7defd082','original candidate adapter changed'
spec=importlib.util.spec_from_file_location('u9917_original_H_static_adapter',BASE)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
base.CONFIG=HERE/'config-v2.json'
base.RECIPE_SHA='4748fc6619743e9b6b22a548a31f7ec8045d30c22534b012938a26c65dca2b96'
base.__file__=__file__
if __name__=='__main__':base.main()
