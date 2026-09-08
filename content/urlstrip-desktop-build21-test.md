---
title: "URLStrip 1.3 Build 21 desktop test"
description: "Versioned URLStrip desktop test download. Stable downloads are unchanged."
url: "/urlstrip/releases/1.3-build21.html"
---

# URLStrip 1.3 (Build 21) desktop test

This is a desktop test build, not a replacement for the stable 1.2 (Build 20) downloads.

## macOS: Apple Silicon and Intel

[Download URLStrip 1.3 (Build 21) for macOS](/urlstrip/releases/1.3-build21/URLStrip-1.3-build21-macOS-universal.dmg)

Developer ID signed, Apple notarization accepted, and notarization ticket stapled.

SHA-256: `93d165f4d0fce3cc6aeb1f3cba1c5de9f4deb17a600c82b328071362532b82d7`

## Windows: pending final verification

The 1.3.0 (Build 21) Windows installer is not published yet. Its Windows-native publisher-signature verification is pending.

## What to test

- Optional XCancel redirects and Reddit short-link resolution and sharing.
- Defaults-off daily rule checks, verified automatic rule installation, and weekly app checks.
- Local unknown-parameter alerts and exact-name custom blocklists with undo.
- macOS preferences, clipboard behavior, and Safari extension enablement and integration.

Interactive Safari and Windows install/upgrade, clipboard, WebView2, and GUI checks remain native QA tasks. URL cleaning is local; explicitly enabled link resolution and update checks use network requests.

[Package manifest](/urlstrip/releases/1.3-build21/manifest.json) · [SHA-256 checksums](/urlstrip/releases/1.3-build21/SHA256SUMS) · [Stable downloads](/download.html)
