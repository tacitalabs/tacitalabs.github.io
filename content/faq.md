---
title: "URLStrip FAQ - Tacita Labs"
description: "Frequently asked questions about URLStrip, including how to report a missed tracking parameter."
url: "/faq.html"
toc: true
---

# URLStrip questions, answered plainly.

URLStrip cleans known tracking parameters locally. These answers cover
the parts people usually ask about: privacy, link safety, and how to
report missed tracking junk.

{{% card %}}

## Does URLStrip send my links anywhere?

No. URLStrip cleans links on your device instead of sending them
through a Tacita Labs link-cleaning service.

{{% /card %}}
{{% card %}}

## Do I need an account?

No. URLStrip does not require an account to clean links.

{{% /card %}}
{{% card %}}

## Will URLStrip break links?

URLStrip is designed to remove known tracking junk while preserving
parameters that affect content, routing, login state, checkout state,
or other page behavior. Some parameters are intentionally kept because
removing them would be worse.

{{% /card %}}
{{% card %}}

## How do I report a missed parameter? {#report-missed-parameter}

If URLStrip leaves tracking junk behind, email
[submissions@tacitalabs.com](mailto:submissions@tacitalabs.com).

Include whatever you can from this list:

- The original URL.
- The cleaned URL URLStrip produced, if it produced one.
- The parameter you think should have been removed.
- Your platform: iOS, iPadOS, macOS, or Windows.
- Where it happened: app, share sheet, Safari extension, QR flow, menu
  bar app, or Windows app.
- What you expected URLStrip to do.
- What URLStrip actually did.

On iOS and iPadOS, URLStrip links here instead of generating an in-app
email report, mailto report, or shareable report body. That keeps the
app's privacy footprint cleaner while still giving users a manual way
to send useful examples.

{{% /card %}}
{{% card %}}

## Why does iOS ask before pasting?

That prompt is an iOS privacy control, not a URLStrip setting. Apple
requires apps to ask before reading copied content. URLStrip cannot
disable that system prompt.

{{% /card %}}
{{% card %}}

## Where do the rules come from?

URLStrip is grounded in the upstream ClearURLs ruleset and extended
with additional maintained coverage where that improves practical
results.

{{% /card %}}
