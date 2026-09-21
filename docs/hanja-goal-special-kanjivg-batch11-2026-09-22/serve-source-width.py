"""Review source-native widths without changing any curve points."""
import runpy, os
from pathlib import Path
namespace = runpy.run_path(str(Path(__file__).with_name("serve.py")))
review = namespace["review"]
original = namespace["original_candidate"]
def candidate(entry, end=None):
    width = 3 if entry["viewBox"] == "0 0 109 109" else 300 / 109
    return original(entry, end).replace('stroke-width="5"', 'stroke-width="' + str(width) + '"').replace('stroke-width="4"', 'stroke-width="' + str(width) + '"')
review.candidate = candidate
if __name__ == "__main__":
    print("Source-width review PID", os.getpid(), flush=True)
    review.ThreadingHTTPServer(("127.0.0.1", 51839), review.Handler).serve_forever()
