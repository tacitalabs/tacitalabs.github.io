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

SHA-256: `d8bf6dd5390911f564ab096ce9d45fe6ac35de736cc741a37a32484ad8218cba`

Verify: `shasum -a 256 URLStrip-1.0.2-macOS-universal.dmg`

{{% /card %}}
{{% card %}}

## Windows — x64

Windows desktop release with the same local-cleaning model.

[Download URLStrip 1.0.2 (Build 16) for Windows](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/releases/1.0.2/URLStrip_1.0.2_x64-setup.exe)

SHA-256: `6ff4f9fe389f549f0d969ce1a5f10acae06572eac2b210c87cd95e9216af7b38`

Verify: `certutil -hashfile URLStrip_1.0.2_x64-setup.exe sha256`
{{% /card %}}

---

Want more detail on what the new Monetization Impact and Confidence
labels mean? Read [how URLStrip classifies
tracking](/tracking-methodology.html).

Beta testing URLStrip? See the [tester guide](/beta-testing.html) for
what to try and what to report.

Full checksum file: [checksums/1.0.2.sha256](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/checksums/1.0.2.sha256)
