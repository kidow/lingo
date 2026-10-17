# Candidate-only whole-mask order wrapper. Original proof/compiler/helper bytes are unchanged.
import sys
sys.dont_write_bytecode = True
import hashlib
from pathlib import Path
HERE = Path(__file__).resolve().parent
ORIGINAL_PINS = {"NOTICE.md":"f9350780fb46088cab313ab0e8b21b8d68db252e48841052bcd6e7fd196b5ab3","candidate-compile-analysis.json":"f7684dc7ea11ee69038088e2de917f16121358d822f77488e34d2ea68401a303","engine-proof.json":"084343a21e36f0a0f58ecedf968db334ef41ff332c14810c21c57b30db12a764","engine-whole-u99dc-ue0100.json":"084343a21e36f0a0f58ecedf968db334ef41ff332c14810c21c57b30db12a764","engine-whole-u99dc.json":"084343a21e36f0a0f58ecedf968db334ef41ff332c14810c21c57b30db12a764","metadata.json":"7620dda98f5434315292cd6b0a0683e46e19e82744af5750ed64896d2ee0df13","native-preflight-source-analysis.json":"b9425441f9d0dd39d66ccfe8eb9046c0f0fb319d73d167d292dcf3145a9d12f0","native-server-compile.mjs":"f44d8a48e649a02bebc637bf4bc33a388dc0619fe870012f22b9b8cc001f9b72","native-server-source-audit.json":"a058544f2a235ae718f011aa058d5421600b9f65d1bcaef56e607fc542d7d11a","native-server-validation.json":"55e3cc1b1e8f5a676231262c6612665d928e4f7692d7e45382d6a0a4249c41e4","progressive.mjs":"dbe2bcce8e4c301ee34dc88b91ad50f57958d59d2ea219e3d5023841264d698f","serve-native.py":"6a714d256da6c69d9d81c709a4f88797285008115e418ad3eeded066ca488b4b","source-analysis.json":"2eea647025c2c843fe99b02a5cb60a381de0c50c6265ae9f10c52f6c0badb52e","source-join-analysis.json":"2ee94700603fc8ff70b44d40cf97bba88b353654a3b131ebe7318a3d388d5f3b","source-only-helper-readiness.json":"be83a78f2dd3553abb63f1fe9ed70b9632b8597857bc3c4279d69ee139d6f873","sources.json":"8a9c506484aa82217cf8eabcf59205a360423253e07e2ae4d9548f72aebd26a9","verify-source.mjs":"0865658fb010e4104175f75b8a8afbdb01996973aeda53f193af404204d663c5"}
NEW_PINS = {"progressive-order-native.mjs":"fc00dcc9c73acaf46829d93b884eb88ed030b4d0c315cf6613c763bf9b2d6a95","progressive-order-native.d.mts":"d184112616c1a443f4de2970c7c3b25c45c3e197b6e2bf49336a25cc677b3816","server-compile-order-native.mjs":"07fae98f54a25565dac6be945a705617205fcb720451103617ec3e693c534579"}
def source_text():
    for name, expected in {**ORIGINAL_PINS, **NEW_PINS}.items():
        assert hashlib.sha256((HERE/name).read_bytes()).hexdigest() == expected, 'Pinned original/order input changed: '+name
    text = (HERE/'serve-native.py').read_text()
    assert text.count("native-server-compile.mjs") == 3
    text = text.replace("native-server-compile.mjs", "server-compile-order-native.mjs")
    assert text.count('step=".01"') == 1
    text = text.replace('step=".01"', 'step=".0001"')
    return text
if __name__ == '__main__':
    text = source_text()
    namespace = {'__name__':'__main__', '__file__':str(HERE/'serve-native.py')}
    exec(compile(text, str(HERE/'serve-native.py'), 'exec'), namespace)
