# Source privacy boundary

Run `python3 scripts/check-source-privacy.py` before publication. CI checks all tracked UTF-8 text for the private email, workstation paths, and confidential discussion excerpts identified in the privacy review. This is a narrow regression guard, not a complete secret scanner.

Public founder and publisher identity, business mailboxes, and existing code-signing certificate identity/location metadata are accepted public information. Do not strip signatures, alter shipped installers, or rewrite signed feed payloads to satisfy a text check. The gate skips binary and non-UTF-8 files; review new screenshots and binary artifacts separately.

Keep private execution conversations and local evidence outside this repository. Public documentation should describe product behavior, operator procedures, and verifiable release results without quoting private instructions.
