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

[Download URLStrip 1.1 (Build 17) for macOS](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/releases/1.1/URLStrip-1.1-macOS-universal.dmg)

SHA-256: `609e75c15e64d56ec2581001f82b17e8a1915c4123285aed31648448ac5dd2fd`

Verify: `shasum -a 256 URLStrip-1.1-macOS-universal.dmg`

{{% /card %}}
{{% card %}}

## Windows — x64

Windows desktop release with the same local-cleaning model.

[Download URLStrip 1.1 (Build 17) for Windows](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/releases/1.1/URLStrip_1.1.0_x64-setup.exe)

SHA-256: `47bd1b4da2a2a6df4c47e2043c615ab0b78c95d5e49a33d7ab4b672796a5011f`

Verify: `certutil -hashfile URLStrip_1.1.0_x64-setup.exe sha256`

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

Full checksum file: [checksums/1.1.sha256](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/checksums/1.1.sha256)
