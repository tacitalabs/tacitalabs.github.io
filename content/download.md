---
title: "Download Infobreaker and URLStrip - Tacita Labs"
description: "Download Tacita Labs apps: Infobreaker (public beta) for macOS and Windows, and URLStrip for iOS/iPadOS, macOS, and Windows. Direct links with published SHA-256 hashes."
url: "/download.html"
---

# Download the tools.

Both Tacita Labs apps are downloaded directly — no account, no signup.
Desktop releases are published with direct links and published SHA-256
hashes so you can verify the integrity of what you've downloaded.

## Infobreaker - public beta

Infobreaker is a [local-first data broker removal tool](/infobreaker.html),
available in public beta for macOS (Intel and Apple Silicon) and Windows
(x64). Install Google Chrome before your first scan — broker automation uses
a real, visible browser with its own separate profile. It is beta software:
expect broker-side changes, human-assist steps, and removals that take weeks
to verify. Free to use for non-commercial use.

{{< infobreaker-downloads >}}

Install notes and a full app walkthrough are in the
[Infobreaker beta guide](/infobreaker-beta-testers.html). Questions and
reports: [infobreaker@tacitalabs.com](mailto:infobreaker@tacitalabs.com).

---

## URLStrip - free to download and use.

The current website downloads are URLStrip 1.3.1 Build 27 for macOS and
Build 26 for Windows.

Build 26 adds explicit Off, Nitter-compatible, and experimental
TwitterViewer choices for supported public X/Twitter links, signed Privacy
Services catalog v3, visible update awareness, and cleaner rules
`2026.09.28.2`.


The macOS Build 27 hotfix restores the packaged app icon and refines the
update settings layout. The shared desktop updater remains at Build 26, so
existing macOS clients will not receive an in-app Build 27 offer. Build 27 is
available from this website and GitHub only.

URLStrip for iOS and iPadOS is available on the App Store. TestFlight
remains available for people who want the newest beta builds. Desktop releases
are published with direct links and SHA-256 hashes so people can verify the
integrity of what they've downloaded.

{{% card %}}
### iOS / iPadOS - App Store

Get the public URLStrip release from the App Store. TestFlight stays
open for beta testers who want the newest builds before they reach the
public release.

[Download URLStrip on the App Store](https://apps.apple.com/us/app/urlstrip/id6763483845)

[Join the URLStrip TestFlight beta](https://testflight.apple.com/join/REgaBTbe)

{{% /card %}}
{{% card %}}

### macOS - Universal (Apple Silicon + Intel)

Native macOS desktop build for Apple Silicon and Intel Macs. Includes URL
cleaning, local Command Guard warnings for risky terminal commands copied to
the clipboard, and an optional command-line tool.

[Download URLStrip 1.3.1 (Build 27) for macOS](/urlstrip/releases/1.3.1-build27/URLStrip-1.3.1-build27-macOS-universal.dmg)

SHA-256: `b7e46d858e9eaa0f9d0cb2831ac19e2d069f30129aae9efb7a5d17da51896387`

Verify: `shasum -a 256 URLStrip-1.3.1-build27-macOS-universal.dmg`

Developer ID signed, Apple notarized, and stapled. Includes an optional macOS
command-line tool. Install it from **Advanced Settings** in the app, then run
`urlstrip --help`. [Read the 1.3.1 release notes](/urlstrip/releases/1.3.1.html).

{{% /card %}}
{{% card %}}

### Windows - x64

Windows desktop release with the same local-cleaning model.

[Download URLStrip 1.3.1 (Build 26) for Windows](/urlstrip/releases/1.3.1-build26/URLStrip-1.3.1-build26-Windows-x64-setup.exe)

SHA-256: `fbe652d3861082f948e7511769a0043fb2e1e20abc125883221cf7bd9a396fc0`

Verify: `certutil -hashfile URLStrip-1.3.1-build26-Windows-x64-setup.exe sha256`

Command Guard watches copied shell, PowerShell, and command-line snippets for
risky patterns such as remote download-and-execute chains, encoded payloads,
and persistence commands. Warnings stay local and the optional neutralize
setting is off by default.

#### Windows publisher verification

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

Checksums: [macOS Build 27 SHA256SUMS](/urlstrip/releases/1.3.1-build27/SHA256SUMS) ·
[Windows Build 26 SHA256SUMS](/urlstrip/releases/1.3.1-build26/SHA256SUMS)
