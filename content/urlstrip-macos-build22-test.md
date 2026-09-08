---
title: "URLStrip 1.3 Build 22 macOS test"
description: "Corrected macOS application icon in a new signed and notarized test build. Stable downloads are unchanged."
url: "/urlstrip/releases/1.3-build22.html"
---

# URLStrip 1.3 (Build 22) macOS test

This macOS test build fixes the missing application icon in build 21. It preserves the same proactive privacy controls and XCancel behavior. Stable 1.2 (Build 20) downloads are unchanged.

## macOS: Apple Silicon and Intel

[Download URLStrip 1.3 (Build 22) for macOS](/urlstrip/releases/1.3-build22/URLStrip-1.3-build22-macOS-universal.dmg)

Developer ID signed, Apple notarization accepted, and notarization ticket stapled. The packaged application icon was rendered and verified from the final DMG.

SHA-256: `d42b9f4f283f5f40fcd19de8876f1ab9272eca68e85e6db04f0715f80ff3801c`

## What to test

- The URLStrip application icon in the mounted DMG and after copying to Applications.
- Optional XCancel redirects and Reddit short-link resolution and sharing.
- Defaults-off daily rule checks, verified automatic rule installation, and weekly app checks.
- Local unknown-parameter alerts and exact-name custom blocklists with undo.
- macOS preferences, clipboard behavior, and Safari extension enablement and integration.

Interactive Safari and installed-app workflow QA remain to be completed. URL cleaning is local; explicitly enabled link resolution and update checks use network requests.

Windows build 21 remains unchanged and unpublished pending Windows-native verification. [Build 21's original test page and artifact](/urlstrip/releases/1.3-build21.html) are preserved for audit.

[Package manifest](/urlstrip/releases/1.3-build22/manifest.json) · [SHA-256 checksums](/urlstrip/releases/1.3-build22/SHA256SUMS) · [Stable downloads](/download.html)
