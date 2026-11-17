#!/usr/bin/env python3
"""Narrow source-privacy gate. Accepted public founder/publisher names and certificate
metadata are not prohibited. Binary release/signature bytes are never modified."""
import pathlib, re, subprocess, sys, tempfile
RULES = [
 ("private email", re.compile(r"prime" + r"@elwood\.net", re.I)),
 ("local workspace path", re.compile(r"/(?:Users|home)/[A-Za-z0-9_.-]+/|[A-Za-z]:\\Users\\|/Volumes/(?:TacitaFast|[^/]+/OpenClaw)", re.I)),
 ("confidential discussion excerpt", re.compile(r"private (?:release )?conversation|Jim (?:explicitly wrote|clarified)|originating Discord [c]hannel|I authorize [r]elease", re.I)),
]
def violations(data):
 if b"\0" in data: return []
 try: text=data.decode("utf-8")
 except UnicodeDecodeError: return []
 return [name for name, pattern in RULES if pattern.search(text)]
def main():
 if "--self-test" in sys.argv:
  assert violations(b"prime" + b"@elwood.net")
  assert violations(b"/Users/" + b"someone/work")
  assert violations(b"Jim " + b"clarified in a private " + b"conversation")
  assert not violations(b"James O'Gorman, Mahomet, Illinois; Tacita Labs; public publisher")
  assert not violations(b"\0binary certificate bytes")
  print("Privacy gate self-test passed");return
 names=subprocess.check_output(["git","ls-files","-z"]).split(b"\0")
 bad=[]
 for name in names:
  if not name: continue
  path=pathlib.Path(name.decode())
  if path.is_file():
   hits=violations(path.read_bytes())
   if hits: bad.append((str(path),hits))
 for path,hits in bad: print(path+": "+", ".join(hits),file=sys.stderr)
 if bad: sys.exit(1)
 print("Privacy gate passed (tracked UTF-8 text; public identity and binary certificate metadata accepted)")
if __name__=="__main__": main()
