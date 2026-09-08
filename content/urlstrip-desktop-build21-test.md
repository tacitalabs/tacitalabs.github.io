---
title: "URLStrip 1.3 Build 21 desktop release"
description: "Versioned URLStrip 1.3 desktop downloads and verification information."
url: "/urlstrip/releases/1.3-build21.html"
---

# URLStrip 1.3 (Build 21) desktop release

## Windows: x64

[Download URLStrip 1.3 (Build 21) for Windows](/urlstrip/releases/1.3-build21/URLStrip-1.3-build21-Windows-x64-setup.exe)

Azure Trusted Signing verified with a valid Microsoft timestamp.

SHA-256: `4fe60632d58e21bafff52e12e85aac7f0efd1d615dc7ce1197d71d3e6d3b853c`

Native Windows QA verified the installer, app, command-line tool, and uninstaller signatures. Installation and removal completed successfully, the GUI stayed running during its smoke test, and the CLI cleaned a test URL correctly.

## macOS: historical Build 21

macOS Build 21 is preserved for release history but has been superseded by [macOS 1.3 Build 22](/urlstrip/releases/1.3-build22/URLStrip-1.3-build22-macOS-universal.dmg), which fixes the packaged app icon.

[Download historical macOS Build 21](/urlstrip/releases/1.3-build21/URLStrip-1.3-build21-macOS-universal.dmg)

SHA-256: `93d165f4d0fce3cc6aeb1f3cba1c5de9f4deb17a600c82b328071362532b82d7`

## What changed in 1.3

- Optional XCancel privacy links.
- Optional daily rule checks while URLStrip is running, with a separate opt-in for verified automatic rule installation and rollback.
- Conservative local alerts for unknown share or campaign parameter names.
- Personal exact-name blocklists with global or site-specific scope and undo.
- Optional weekly desktop application update checks.
- Better Reddit short-link resolution and sharing.
- Refreshed social-share cleaning coverage.

All proactive network features are off by default. Normal URL cleaning remains local. Explicitly enabled link resolution and update checks make bounded network requests described in the app.

[Package manifest](/urlstrip/releases/1.3-build21/manifest.json) · [SHA-256 checksums](/urlstrip/releases/1.3-build21/SHA256SUMS) · [Current downloads](/download.html)
