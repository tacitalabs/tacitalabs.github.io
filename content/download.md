---
title: "Download URLStrip - Tacita Labs"
description: "Download URLStrip for iOS/iPadOS, macOS, and Windows. The iOS and iPadOS app is available on the App Store, TestFlight remains available for beta builds, and desktop releases include direct links and published SHA-256 hashes."
url: "/download.html"
---

# Free to download and use.

URLStrip for iOS and iPadOS is available on the App Store. TestFlight
remains available for people who want the newest beta builds. Current
desktop releases are published through the [public URLStrip
release repository](https://github.com/tacitalabs/urlstrip/releases) with direct
GitHub Release asset links and published SHA-256 hashes so people can verify the
integrity of what they've downloaded.

{{% card %}}
## iOS / iPadOS - App Store

Get the public URLStrip release from the App Store. TestFlight stays
open for beta testers who want the newest builds before they reach the
public release.

[Download URLStrip on the App Store](https://apps.apple.com/us/app/urlstrip/id6763483845)

[Join the URLStrip TestFlight beta](https://testflight.apple.com/join/REgaBTbe)

{{% /card %}}
{{% card %}}

## macOS — Universal (Apple Silicon + Intel)

Native macOS desktop build for Apple Silicon and Intel Macs.

[Download URLStrip 1.1 (Build 17) for macOS](https://github.com/tacitalabs/urlstrip/releases/download/urlstrip-1.1-signed-20260625/URLStrip-1.1-macOS-universal.dmg)

SHA-256: `a831344f1078a02f04c9b3ccaf0e23a98c4c72fd45913575028ca3b46eb3f84a`

Verify: `shasum -a 256 URLStrip-1.1-macOS-universal.dmg`

Includes an optional macOS command-line tool. Install it from **Advanced
Settings** in the app, then run `urlstrip --help`.

{{% /card %}}
{{% card %}}

## Windows — x64

Windows desktop release with the same local-cleaning model.

[Download URLStrip 1.1 (Build 17) for Windows](https://github.com/tacitalabs/urlstrip/releases/download/urlstrip-1.1-signed-20260625/URLStrip_1.1.0_x64-setup.exe)

SHA-256: `73079e7137e4f7d71475d03bd2c44778598c6e0b4b3510f1bf21df095f67ca78`

Verify: `certutil -hashfile URLStrip_1.1.0_x64-setup.exe sha256`

### Windows publisher verification

URLStrip for Windows is signed with Azure Trusted Signing, so the installer includes a verifiable publisher signature and timestamp. Windows Defender SmartScreen can still show reputation warnings for very new or low-volume releases.

What we publish for every Windows release:

- A signed Windows installer
- A stable GitHub-hosted release artifact
- A public SHA-256 checksum
- A matching version and build number
- A local-first app that cleans URLs on your device

Before installing, you can verify the downloaded installer signature in file properties and compare the installer hash to the SHA-256 value on this page.
{{% /card %}}

---

Want more detail on what the new Monetization Impact and Confidence
labels mean? Read [how URLStrip classifies
tracking](/tracking-methodology.html).

Want to try URLStrip before installing? Use the [browser-based URL cleaner](/clean-url.html). Your pasted URL is processed locally and is not sent to Tacita Labs.

Beta testing URLStrip? See the [tester guide](/beta-testing.html) for
what to try and what to report.

Full checksum file: [checksums/1.1.sha256](https://github.com/tacitalabs/urlstrip/releases/download/urlstrip-1.1-signed-20260625/1.1.sha256)
