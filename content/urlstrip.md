---
title: "URLStrip - Remove Tracking Junk from Links - Tacita Labs"
description: "URLStrip removes tracking junk from links before you open them, save them, or share them. It runs locally, stays out of the way, and is free to use on iOS/iPadOS, macOS, and Windows."
url: "/urlstrip.html"
toc: true
---

{{< split-begin >}}
{{% split-card %}}

{{< eyebrow >}}URLSTRIP{{< /eyebrow >}}
{{< brandline >}}Silentium servat - silence protects.{{< /brandline >}}


# Remove tracking junk from links.

URLStrip strips known tracking parameters before you open a link, save it, or send it to someone else. On desktop, Command Guard can also warn when copied terminal commands look risky. It runs locally, supports iOS/iPadOS, macOS, and Windows, and is free to use.

{{< button href="/clean-url.html" style="primary" >}}Clean a URL Online{{< /button >}} {{< button href="#downloads" style="secondary" >}}Download URLStrip{{< /button >}}
{{< eyebrow >}}Runs locally - no account - free{{< /eyebrow >}}

{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}What URLStrip does{{< /eyebrow >}}

A normal link often arrives with extra tracking parameters attached to it. URLStrip removes the known junk and keeps the destination intact.

Before:

```
https://example.com/article?utm_source=newsletter&utm_medium=email&fbclid=IwAR123&gclid=abc123
```

After:

```
https://example.com/article
```

Same destination. Less junk attached to it.

{{% /split-card %}}
{{< split-end >}}

{{< eyebrow >}}Why it matters{{< /eyebrow >}}

## A lot of links carry extra baggage.

Copy a link from email, a search result, or social media, and there is a good chance it has extra tracking glued onto the end. Some of it measures campaigns, some of it identifies clicks. Some of it can even tie the link back to a person, browser, or session.

{{% card %}}
- **Campaign tags** — parameters like `utm_source` and `utm_campaign`
  that tell marketing systems where a click came from.
- **Click identifiers** — values like `fbclid` and `gclid` added by major
  platforms to follow clicks across systems.
- **Other tracking codes** — junk added by analytics, email, affiliate,
  and marketing systems.
{{% /card %}}

The result is a cleaner link with less junk and less tracking attached to it. Want the deeper version? Read [how URLStrip classifies tracking](/tracking-methodology.html).

{{< eyebrow >}}What it does{{< /eyebrow >}}

## Clean links without breaking them.

URLStrip checks a link for known tracking parameters and strips out what doesn't need to be there. It keeps the parts the destination actually needs, including normal paths and parameters that control content or state.

{{< split-begin >}}
{{% split-card %}}

**What URLStrip removes:**

- Common tracking parameters like `utm_*`
- Many click IDs and redirect wrappers
- Known junk added by advertising, analytics, and email systems

{{% /split-card %}}
{{% split-card %}}

**What URLStrip keeps:**

- Normal paths and destination URLs
- Functional parameters needed for content or state
- The parts of the link that still need to work

{{% /split-card %}}
{{< split-end >}}

{{% card %}}
**Command Guard for desktop**

URLStrip can warn when copied terminal commands match risky patterns such as
`curl | sh`, PowerShell `irm | iex`, encoded payloads, persistence commands,
or destructive shell actions. It is local, rules-based, and transparent about
what triggered the warning. An optional neutralize setting can make risky
commands inert before paste, but it is off by default.
{{% /card %}}

{{< eyebrow >}}How it works{{< /eyebrow >}}

## Simple on purpose. {#how}

URLStrip is built to stay out of the way. On desktop, it fits into normal copy-and-paste use instead of asking you to route links through some service. The cleanup happens locally and the result is a cleaner link you can keep using normally.

{{% card %}}
1. **Install it.** Install URLStrip for your platform and leave it there.
2. **Use links normally.** Copy, paste, or share a link the same way you
   already do.
3. **Clean locally.** URLStrip removes known tracking junk on the device
   itself.
4. **Keep moving.** Open it, save it, or send it without dragging the
   junk along.
{{% /card %}}

Some parameters are intentionally kept because they control content, preserve state, or are required for the destination to work.

Want to try it without installing anything? Use the [browser-based URL cleaner](/clean-url.html). Your pasted URL is processed locally and is not sent to Tacita Labs.

{{< eyebrow >}}Trust{{< /eyebrow >}}

## The privacy model is simple. {#trust}

{{% card %}}
- **Runs locally.** URLStrip cleans links on your device instead of
  routing them through someone else's cloud service.
- **No account required.** There is no login, subscription wall, or
  account setup just to clean a link.
- **Rules-based approach.** URLStrip is grounded in the ClearURLs ruleset
  and extended with maintained additions where they improve real-world
  results. [Read how URLStrip classifies
  tracking](/tracking-methodology.html).
- **Built with relevant experience.** Tacita Labs is building privacy
  tools with a practical, local-first bias shaped by years of security
  and privacy work.
{{% /card %}}

{{< eyebrow >}}Download{{< /eyebrow >}}

## Free to download and use. {#downloads}

URLStrip for iOS and iPadOS is available on the App Store. The TestFlight beta remains available for people who want the newest builds before they reach the public release. Current desktop releases are published through the [public URLStrip release repository](https://github.com/tacitalabs/urlstrip/releases) with direct GitHub Release asset links and published SHA-256 hashes so people can verify the integrity of what they've downloaded.

{{% card %}}
**iOS / iPadOS - App Store**

Get the public URLStrip release from the App Store. TestFlight stays open for beta testers who want the newest builds.

[Download URLStrip on the App Store](https://apps.apple.com/us/app/urlstrip/id6763483845)

[Join the URLStrip TestFlight beta](https://testflight.apple.com/join/REgaBTbe)
{{% /card %}}

{{% card %}}
**macOS - Universal (Apple Silicon + Intel)**

[Download URLStrip 1.1 (Build 18) for macOS](https://github.com/tacitalabs/urlstrip/releases/download/urlstrip-1.1-build18-command-guard/URLStrip-1.1-build18-macOS-universal.dmg)

SHA-256: `8173d94523bf769e61794200d4459b208d4532e96423a58de7f1b90427256b65`

Verify: `shasum -a 256 URLStrip-1.1-build18-macOS-universal.dmg`

Includes Command Guard and an optional macOS command-line tool. Install the
CLI from **Advanced Settings** in the app.
{{% /card %}}

{{% card %}}
**Windows - x64**

[Download URLStrip 1.1 (Build 18) for Windows](https://github.com/tacitalabs/urlstrip/releases/download/urlstrip-1.1-build18-command-guard/URLStrip-1.1-build18-Windows-x64-setup.exe)

SHA-256: `0ccf390162f3139dedfdee9f8942436cca4ed63858901e8294e6913bb1cfd221`

Verify: `certutil -hashfile URLStrip-1.1-build18-Windows-x64-setup.exe sha256`
{{% /card %}}
---

Full checksum file: [checksums/1.1.sha256](https://github.com/tacitalabs/urlstrip/releases/download/urlstrip-1.1-build18-command-guard/1.1.sha256)

{{< eyebrow >}}Screenshots{{< /eyebrow >}}

## A real look at the app. {#screenshots}

Real screenshots. No invented UI, no glossy mockups. Desktop stays lightweight and out of the way. iPhone makes cleanup, controls, and visibility easier.

{{< split-begin >}}
{{% split-card %}}
![URLStrip macOS welcome screen](/assets/macos-welcome.png)
*macOS onboarding and first-run explanation.*
{{% /split-card %}}
{{% split-card %}}
![URLStrip iPhone home screen](/assets/ios-appstore-home.png?class=small)
*iPhone home view from the App Store release.*
{{% /split-card %}}
{{< split-end >}}

{{< carousel >}}
{{< carousel-slide src="/assets/ios-appstore-cleaned-link.png"
alt="URLStrip iPhone cleaned link screen"
caption="URLStrip shows what it removed and keeps the cleaned destination easy to copy or share."
max-height="650px" >}}

{{< carousel-slide src="/assets/ios-appstore-home.png"
alt="URLStrip iPhone home screen"
caption="The main screen keeps cleanup, recent activity, and the last cleaned link in one place."
max-height="650px" >}}

{{< carousel-slide src="/assets/ios-appstore-statistics.png"
alt="URLStrip iPhone statistics screen"
caption="Local-only statistics help users understand what URLStrip is removing."
max-height="650px" >}}

{{< carousel-slide src="/assets/ios-appstore-settings.png"
alt="URLStrip iPhone settings screen"
caption="Settings give users control over URL safety checks, privacy redirects, and rule behavior."
max-height="650px" >}}
{{< /carousel >}}

{{< eyebrow >}}FAQ{{< /eyebrow >}}

## Short answers to obvious questions. {#faq}

{{< split-begin >}}
{{% split-card %}}
**Does URLStrip send my links anywhere?**

No. The point is to clean links locally instead of routing browsing data through another service.

{{% /split-card %}}
{{% split-card %}}

**Do I need an account?**

No. Download it, install it, and use it.

{{% /split-card %}}
{{< split-end >}}

{{< split-begin >}}
{{% split-card %}}

**Will it break links?**

It is designed to remove known tracking junk while preserving the parts a link needs to work. Some parameters are intentionally kept when they affect content or function.

{{% /split-card %}}
{{% split-card %}}

**Why does iOS ask before pasting?**

That prompt is an iOS privacy control, not a URLStrip setting. Apple requires apps to ask before reading the clipboard so you can decide when an app is allowed to access copied content. URLStrip cannot disable it, so expect to approve paste access when iOS asks.

{{% /split-card %}}
{{< split-end >}}

{{< split-begin >}}
{{% split-card %}}

**How do I report a missed parameter?**

On iOS and iPadOS, URLStrip links to the FAQ instead of generating an
in-app email report, mailto report, or shareable report body. On macOS
and Windows, use the built-in report flow where available. Either way,
the reporting details live in the
[missed-parameter FAQ](/faq.html#report-missed-parameter).

{{% /split-card %}}
{{% split-card %}}

**Where do the rules come from?**

URLStrip is grounded in the upstream ClearURLs ruleset and extended with additional maintained coverage where that improves practical results.

{{% /split-card %}}
{{< split-end >}}

{{< split-begin >}}
{{% split-card %}}

**Beta testing URLStrip?**

See the [URLStrip beta testing guide](/beta-testing.html) for what to
try and what to report.

{{% /split-card %}}
{{% split-card %}}

**Need the full FAQ?**

See the [URLStrip FAQ](/faq.html) for privacy, link safety, and
missed-parameter reporting details.

{{% /split-card %}}
{{< split-end >}}

{{% card %}}
## Contact {#contact}

For product questions, feedback, or general inquiries, reach out at [hello@tacitalabs.com](mailto:hello@tacitalabs.com) or follow [Tacita Labs on X](https://xcancel.com/TacitaLabs). Curious who builds URLStrip? See [About Tacita Labs](/about.html).
{{% /card %}}
