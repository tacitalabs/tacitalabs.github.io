---
title: "Clean a URL Online - Tacita Labs"
description: "Paste a URL and remove known tracking parameters locally in your browser. The URL you paste is not uploaded, logged, or sent to Tacita Labs."
url: "/clean-url.html"
styles:
  - "/urlstrip/tool.css"
scripts:
  - "/urlstrip/cleaner.js"
  - "/urlstrip/tool.js"
---

{{< eyebrow >}}URLStrip Web Tool{{< /eyebrow >}}

# Clean a URL Online

Paste a link below and URLStrip will remove known tracking parameters locally in your browser. Your URL is processed on this device. It is not uploaded, logged, or sent to Tacita Labs.

{{% card %}}

## URL to clean {#urlstrip-tool-heading}

Works with `http://` and `https://` links.

{{< urlstrip-tool >}}
{{% /card %}}

## Privacy promise

This page loads URLStrip's public rule files and applies them with JavaScript in your browser. Cleaning happens on your device. The URL you paste into this tool is not sent to Tacita Labs.

## What this removes

The web tool uses the same public URLStrip rule bundle published for the desktop apps. It can remove common campaign tags, click identifiers, affiliate parameters, email marketing parameters, social tracking parameters, and supported redirect wrappers.

It intentionally keeps parameters that appear necessary for the page to work. Not every query parameter is tracking.

## When to install the app

The web tool is good for one-off cleanup. Install URLStrip if you want cleaning built into your normal workflow:

- macOS and Windows clipboard cleaning
- iPhone and iPad Share Sheet support
- Safari extension support on iOS/iPadOS
- rule updates
- local stats and clearer visibility into what was removed

{{< button href="/download.html" style="primary" >}}Download URLStrip{{< /button >}}
{{< button href="/tracking-methodology.html" style="secondary" >}}How URLStrip classifies tracking{{< /button >}}

## Attribution

URLStrip uses a reviewed ClearURLs-compatible rule bundle plus Tacita Labs supplementary rules. ClearURLs provides an important public rules foundation for identifying known URL tracking parameters.
