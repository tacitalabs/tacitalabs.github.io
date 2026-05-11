---
title: "Tacita Labs - URLStrip"
description: "URLStrip removes tracking junk from links before you open them, save them, or share them. It runs locally, stays out of the way, and is free to use on iOS/iPadOS, macOS, and Windows."
toc: true
---

{{< split-begin >}}
{{% split-card %}}

{{< eyebrow >}}URLSTRIP{{< /eyebrow >}}
{{< brandline >}}Silentium servat - silence protects.{{< /brandline >}}


# Remove tracking junk from links.

URLStrip strips known tracking parameters before you open a link, save it, or send it to someone else. It runs locally, supports iOS/iPadOS, macOS, and Windows, and is free to use.

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

URLStrip for iOS and iPadOS is available as a public TestFlight beta. Current desktop releases are published through the [public URLStrip release repository](https://github.com/tacitalabs/urlstrip) with direct download links and published SHA-256 hashes so people can verify the integrity of what they've downloaded.

{{% card %}}
**iOS / iPadOS — Public TestFlight beta**

URLStrip for iOS and iPadOS is currently distributed through Apple's TestFlight beta program. The beta may be full depending on available tester slots.

[Join the URLStrip TestFlight beta](https://testflight.apple.com/join/REgaBTbe)
{{% /card %}}

{{% card %}}
**macOS — Universal (Apple Silicon + Intel)**

[Download URLStrip 1.0.2 (Build 16) for macOS](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/releases/1.0.2/URLStrip-1.0.2-macOS-universal.dmg)

SHA-256: `9e40b17dff9bd04296b64efe8eee842322df939b87872172de234c9e01acf67f`

Verify: `shasum -a 256 URLStrip-1.0.2-macOS-universal.dmg`
{{% /card %}}

{{% card %}}
**Windows — x64**

[Download URLStrip 1.0.2 (Build 16) for Windows](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/releases/1.0.2/URLStrip_1.0.2_x64-setup.exe)

SHA-256: `6ff4f9fe389f549f0d969ce1a5f10acae06572eac2b210c87cd95e9216af7b38`

Verify: `certutil -hashfile URLStrip_1.0.2_x64-setup.exe sha256`
{{% /card %}}
---

Full checksum file: [checksums/1.0.2.sha256](https://raw.githubusercontent.com/tacitalabs/urlstrip/main/checksums/1.0.2.sha256)

{{< eyebrow >}}Screenshots{{< /eyebrow >}}

## A real look at the app. {#screenshots}

Real screenshots. No invented UI, no glossy mockups. Desktop stays lightweight and out of the way. iPhone makes cleanup, controls, and visibility easier.

{{< split-begin >}}
{{% split-card %}}
![URLStrip macOS welcome screen](/assets/macos-welcome.png)
*macOS onboarding and first-run explanation.*
{{% /split-card %}}
{{% split-card %}}
![URLStrip iPhone home screen](/assets/ios-clean-home.png?class=small)
*iPhone home view with quick cleanup and local visibility.*
{{% /split-card %}}
{{< split-end >}}

{{< carousel >}}
{{< carousel-slide src="/assets/ios-stats-overview.png"
alt="URLStrip iPhone statistics overview"
caption="Local-only statistics help users understand what URLStrip is removing."
max-height="650px" >}}

{{< carousel-slide src="/assets/ios-stats-breakdown.png"
alt="URLStrip iPhone statistics breakdown"
caption="Category breakdown shows where tracking junk is coming from."
max-height="650px" >}}

{{< carousel-slide src="/assets/ios-settings-main.png"
alt="URLStrip iPhone settings screen"
caption="Settings give users control over rule categories and URL safety behavior."
max-height="650px" >}}

{{< carousel-slide src="/assets/ios-quick-intro.png"
alt="URLStrip iPhone quick intro screen"
caption="Quick intro explains the privacy model in plain language."
max-height="650px" >}}

{{< carousel-slide src="/assets/ios-how-it-works.png"
alt="URLStrip iPhone how it works screen"
caption="The in-app explanation covers what URLStrip removes, what it keeps, and why."
max-height="650px" >}}
{{< /carousel >}}

{{< eyebrow >}}About{{< /eyebrow >}}

## Built by Jim O'Gorman. {#about}

{{% card %}}
Jim O'Gorman spent nearly two decades helping build [Offensive Security](https://en.wikipedia.org/wiki/Offensive_Security), working across leadership, training, product, operations, and community as the company grew through two exits.

Tacita Labs is focused on creating software that helps reduce unnecessary data exposure without creating another account, dashboard, or place your information has to go. The idea is simple: solve the problem without creating another one.
{{% /card %}}

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

**Where do the rules come from?**

URLStrip is grounded in the upstream ClearURLs ruleset and extended with additional maintained coverage where that improves practical results.

{{% /split-card %}}
{{% split-card %}}

**Why make another privacy tool?**

Because too many privacy products solve one problem by creating another. Tacita Labs is focused on reducing exposure without demanding more of your data in return.
{{% /split-card %}}
{{< split-end >}}

{{% card %}}
## Contact {#contact}

For product questions, feedback, or general inquiries, reach out at [hello@tacitalabs.com](mailto:hello@tacitalabs.com).
{{% /card %}}