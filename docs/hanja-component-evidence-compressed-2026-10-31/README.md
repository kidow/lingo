# Exact historical source fixtures

The manifest binds each original repository path to its existing SHA-256, Git commit, Git blob and original byte length. A single source that existed between commits instead names a checked reconstruction record: an exact Git base plus three existing patches, with all intermediate and final SHA values authenticated. Only sources needed by historical Hanja test provenance checks are retained. Identical source hashes share one gzip/base64 leaf.

Recovery: read the listed Git blob as raw bytes; verify its existing SHA-256; gzip the bytes and encode as base64. Verification decodes base64, decompresses at most 16 MiB, and checks the original SHA-256. No source normalization, hash replacement, current-file substitution or Git fallback occurs in tests.

These fixtures preserve historical inputs. They do not grant new native or product UI approval; current loader, context, policy and registry contracts are checked independently.
