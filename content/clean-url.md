---
title: "Clean a URL Online - Tacita Labs"
description: "Paste a URL and remove known tracking parameters locally in your browser. The URL you paste is not uploaded, logged, or sent to Tacita Labs."
url: "/clean-url.html"
toc: true
styles:
  - "/urlstrip/tool.css"
scripts:
  - "/urlstrip/cleaner.js"
  - "/urlstrip/tool.js"
---

{{< eyebrow >}}URLStrip Web Tool{{< /eyebrow >}}

# Clean a URL Online

Paste a link below and URLStrip will remove known tracking parameters locally in your browser. Your URL is processed on this device. It is not uploaded, logged, or sent to Tacita Labs.

<div class="tool-shell" data-urlstrip-tool>
<section class="tool-panel" aria-labelledby="urlstrip-tool-heading">
<div class="tool-heading-row">
<div>
<h2 id="urlstrip-tool-heading">URL to clean</h2>
<p class="tool-muted">Works with <code>http://</code> and <code>https://</code> links.</p>
</div>
<span class="tool-local-badge">Local only</span>
</div>
<label class="sr-only" for="urlstrip-input">URL to clean</label>
<textarea id="urlstrip-input" class="urlstrip-input" rows="5" maxlength="16384" placeholder="https://example.com/article?utm_source=newsletter&fbclid=..."></textarea>
<div class="tool-actions">
<button type="button" class="tool-button primary" data-urlstrip-clean>Clean URL</button>
<button type="button" class="tool-button secondary" data-urlstrip-clear>Clear</button>
<span class="tool-status" data-urlstrip-status>Loading URLStrip rules...</span>
</div>
</section>
<section class="tool-result" data-urlstrip-result hidden aria-live="polite">
<div class="result-label" data-result-label></div>
<div class="result-url-wrap" data-result-url-wrap hidden>
<label for="urlstrip-output">Cleaned URL</label>
<textarea id="urlstrip-output" class="urlstrip-output" rows="4" readonly></textarea>
<button type="button" class="tool-button primary" data-urlstrip-copy>Copy Clean URL</button>
</div>
<div class="result-details" data-result-details></div>
</section>
<section class="tool-privacy-note">
<h2>Privacy promise</h2>
<p>This page loads URLStrip's public rule files and applies them with JavaScript in your browser. Cleaning happens on your device. The URL you paste into this tool is not sent to Tacita Labs.</p>
</section>
</div>

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
