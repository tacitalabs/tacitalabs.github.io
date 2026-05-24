---
title: "Download URLStrip - Tacita Labs"
description: "Download URLStrip for iOS/iPadOS, macOS, and Windows. The iOS and iPadOS app is available as a public TestFlight beta, and desktop releases include direct links and published SHA-256 hashes."
url: "/download.html"
---

# Free to download and use.

URLStrip for iOS and iPadOS is available as a public TestFlight beta.
Current desktop releases are published through the [public URLStrip
release repository](https://github.com/tacitalabs/urlstrip) with direct
download links and published SHA-256 hashes so people can verify the
integrity of what they've downloaded.

{{% card %}}
## iOS / iPadOS — Public TestFlight beta

URLStrip for iOS and iPadOS is currently distributed through Apple's
TestFlight beta program. The beta may be full depending on available
tester slots.

[Join the URLStrip TestFlight beta](https://testflight.apple.com/join/REgaBTbe)

{{% /card %}}
{{% card %}}

## macOS — Universal (Apple Silicon + Intel)

Native macOS desktop build for Apple Silicon and Intel Macs.

[Download URLStrip 1.0.2 (Build 16) for macOS](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/releases/1.0.2/URLStrip-1.0.2-macOS-universal.dmg)

SHA-256: `f053798fd2e193cb5fda6945def2ba4610ff39058c2e6c1a21cdcc5ec09b1083`

Verify: `shasum -a 256 URLStrip-1.0.2-macOS-universal.dmg`

{{% /card %}}
{{% card %}}

## Windows — x64

Windows desktop release with the same local-cleaning model.

[Download URLStrip 1.0.2 (Build 16) for Windows](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/releases/1.0.2/URLStrip_1.0.2_x64-setup.exe)

SHA-256: `736ac14e37d8e6be74d64cda270ca2469e9ca85885b5a7c9480c9a7579aea702`

Verify: `certutil -hashfile URLStrip_1.0.2_x64-setup.exe sha256`

### Windows security note

URLStrip for Windows is currently distributed without a paid Windows code-signing certificate. Windows Defender SmartScreen may warn that the app is from an unknown publisher, especially on fresh releases with low download volume. That warning is about publisher reputation, not proof that URLStrip is malicious.

What we publish for every Windows release:

- A stable GitHub-hosted release artifact
- A public SHA-256 checksum
- A matching version and build number
- A local-first app that cleans URLs on your device

If Windows warns before install, verify the downloaded installer hash with the command above and compare it to the SHA-256 value on this page.
{{% /card %}}

---

Want more detail on what the new Monetization Impact and Confidence
labels mean? Read [how URLStrip classifies
tracking](/tracking-methodology.html).

Want to try URLStrip before installing? Use the [browser-based URL cleaner](/clean-url.html). Your pasted URL is processed locally and is not sent to Tacita Labs.

Beta testing URLStrip? See the [tester guide](/beta-testing.html) for
what to try and what to report.

Full checksum file: [checksums/1.0.2.sha256](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/checksums/1.0.2.sha256)
