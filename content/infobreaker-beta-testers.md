---
title: "Infobreaker Beta Tester Guide - Tacita Labs"
description: "Private Infobreaker beta tester page with downloads, current build status, testing priorities, debug logging, issue reporting, and a tab-by-tab app guide."
url: "/infobreaker-beta-testers.html"
noindex: true
toc: true
styles:
  - "/infobreaker/beta-testers.css"
---

<section class="beta-hero">

# Infobreaker beta tester guide

Infobreaker is a local-first data broker removal app. It helps you enter your information once, scan supported broker sites, review possible matches, submit opt-outs where possible, and track whether removals stay removed.

The important privacy rule: your profile, scan history, screenshots, and raw run logs stay on your device unless you choose to send a redacted support bundle.

</section>

## Current Status

<div class="beta-status-grid">
<section class="beta-panel">
<p class="beta-kicker">Current tester download</p>
<p class="beta-version">Public beta feed: app 1.0.0-beta.15</p>

<ul class="beta-download-list">
<li>
<strong>macOS public download:</strong> universal DMG for Intel and Apple Silicon<br>
<a href="https://github.com/tacitalabs/infobreaker/releases/download/infobreaker-1.0.0-beta.15/Infobreaker-1.0.0-beta.15-universal.dmg">Download Infobreaker 1.0.0-beta.15 for macOS</a>
<span class="beta-hash">SHA-256: 5f87a2d8dfb0c91ace1caeb860772f0d8750edc506d73893235b75d739a1d444</span>
</li>
<li>
<strong>Windows public download:</strong> x64 portable ZIP<br>
<a href="https://github.com/tacitalabs/infobreaker/releases/download/infobreaker-1.0.0-beta.15/Infobreaker-1.0.0-beta.15-x64-portable.zip">Download Infobreaker 1.0.0-beta.15 for Windows</a>
<span class="beta-hash">SHA-256: 9f3404af32b1a6d1dfca911fbf42c6365d6b099d3bddadda5ccd4fe77ddb4a4e</span>
</li>
</ul>

<ul class="beta-status-list">
<li><strong>Automation bundle:</strong> beta.2 broker catalog.</li>
<li><strong>QA status:</strong> beta.15 passed macOS universal packaging checks and Windows validation on June 23-24, 2026.</li>
</ul>

<p>After a new build is promoted, this section should be the only part repeat testers need to re-read.</p>
</section>

<section class="beta-panel">
<p class="beta-kicker">What changed lately</p>
<ul class="beta-status-list">
<li>The macOS tester DMG is now universal for Intel and Apple Silicon Macs.</li>
<li>macOS and Windows are now both on beta.15.</li>
<li>Windows packaged scans use the bundled Windows Node runtime instead of depending on a tester's system Node.</li>
<li>Windows portable scan preflight no longer blocks when Windows cannot inspect external automation processes.</li>
<li>Profile storage wording now says operating system secure storage instead of system keychain.</li>
<li>Scan issue counts distinguish broker issues from per-check failures.</li>
<li>Debug run logs and redacted support bundles are available from Settings.</li>
<li>Guided removal handoff behavior is clearer after accepted opt-out previews.</li>
</ul>
</section>
</div>

<div class="beta-callout beta-warning">
<strong>Beta warning:</strong> Infobreaker is not finished. It can miss listings, flag weak matches, hit broker-side blocks, or require human action for opt-out forms. Do not assume a broker listing is gone until the monitoring workflow confirms it.
</div>

## Short Tester Guide

The highest-value feedback is not just "did it crash?" It is whether the app makes a hard privacy workflow understandable enough that a normal person can finish it.

<div class="beta-card-grid">
<section class="beta-panel">
<p class="beta-kicker">UI and workflow clarity</p>
<ul>
<li>Is it obvious what to do next?</li>
<li>Do the tabs feel like a natural workflow: Today, Profiles, Scan, Review, Remove, Monitoring?</li>
<li>Does the app explain results without sounding technical or evasive?</li>
<li>Are warnings, blockers, and next steps clear when something cannot be automated?</li>
</ul>
</section>

<section class="beta-panel">
<p class="beta-kicker">Scanners</p>
<ul>
<li>Did Infobreaker find listings you expected it to find?</li>
<li>Did it miss a real listing you found manually?</li>
<li>Did it flag someone else as you?</li>
<li>Did a broker produce errors, blocks, CAPTCHAs, or confusing results?</li>
</ul>
</section>

<section class="beta-panel">
<p class="beta-kicker">Opt-out workflow</p>
<ul>
<li>Was it clear which listings were ready to remove?</li>
<li>Did preview and live removal steps make sense?</li>
<li>Did broker forms open and submit correctly?</li>
<li>Were required human steps, like CAPTCHA or email confirmation, clearly explained?</li>
</ul>
</section>

<section class="beta-panel">
<p class="beta-kicker">Post-opt-out monitoring</p>
<ul>
<li>Do you understand how to verify removals?</li>
<li>Can you tell what is waiting, due, blocked, removed, or reappeared?</li>
<li>Does recurrence tracking make sense?</li>
<li>Would you trust the timeline enough to come back later?</li>
</ul>
</section>
</div>

## Suggested Test Pass

1. Install Infobreaker and create one profile.
2. Add at least one current or previous city/state where broker records may exist.
3. Run a scan.
4. Review possible matches carefully. Mark wrong people as not a match.
5. Try at least one opt-out preview before live submission.
6. If an opt-out succeeds, follow the monitoring tab until the app tells you what to check next.
7. Turn on support run logs before trying a flow that previously failed.
8. Send feedback for confusing UI, false positives, false negatives, opt-out failures, and monitoring confusion.

## Debug Logging

Infobreaker can save scan and removal run logs locally to help troubleshoot beta failures. These logs are for support, not telemetry. They stay on your device unless you choose to send them.

![Settings screen showing support run logs controls](/assets/infobreaker-beta/settings-debug-logging.png?class=large)

### How to turn logging on

1. Open **Settings**.
2. In **Scan Preferences**, enable **Save run logs**.
3. Click **Save**.
4. Re-run the scan or opt-out flow that failed.
5. Use **Report Latest** to create a redacted report, or **Open Folder** to inspect the raw local logs.

### What gets cleaned before reporting

When you create a support report, Infobreaker creates a separate redacted copy for review. The report is designed to remove or mask profile details such as names, email addresses, phone numbers, street addresses, ZIP codes, and other obvious personal values before you send it.

You should still review the report before sending. Beta software is exactly where paranoia earns its keep.

## Reporting Issues

Send beta reports to [infobreaker@tacitalabs.com](mailto:infobreaker@tacitalabs.com).

For scanner, opt-out, or monitoring issues, include:

<div class="beta-issue-template">

```text
Subject: Infobreaker beta issue - [short summary]

Platform: macOS or Windows
Infobreaker version:
OS version:
Broker or screen:
What you were trying to do:
What happened:
What you expected:
Did you enable support run logs? yes/no
Attachments: screenshot, redacted support report, or screen recording
```

</div>

High-value screenshots show the full app window and the current tab. For privacy, crop or blur anything you do not want to share.

## App Overview

Infobreaker is organized as a workflow, not as separate utilities. Start at Today, keep your profile current, scan brokers, review matches, remove confirmed listings, then monitor removals over time.

## Today

<section class="beta-tab">
<div>

Today is the command center. It shows what needs your attention, what is ready to do next, and what changed recently.

Use Today when you are not sure where to go. After a scan, it should point you toward Review. After confirmed matches, it should point you toward Remove. After submitted removals, it should point you toward Monitoring.

Things to test:

- Are the action cards clear?
- Does Today explain the current state without making you hunt through tabs?
- After each workflow step, does Today update in a way that feels obvious?

</div>

![Today first-run screen](/assets/infobreaker-beta/today-first-run.png?class=large)
</section>

## Profiles

<section class="beta-tab">
<div>

Profiles are where Infobreaker stores the person and locations you want to scan for. Profile details are encrypted with operating system secure storage and stay on your device.

Use Profiles to add your name, aliases, current city/state, and previous locations that may still appear in broker records.

Things to test:

- Is it clear what information is needed and why?
- Are aliases and previous locations understandable?
- Does profile setup feel safe enough for a privacy app?

</div>

![Profiles screen](/assets/infobreaker-beta/profiles-guide.png?class=large)
</section>

## Scan

<section class="beta-tab">
<div>

Scan checks supported data broker sites for possible records. The app uses your profile locations and selected broker set to decide what to search.

Use Scan to start a first pass, retry brokers with issues, or run a narrower follow-up.

Things to test:

- Did the scan start with clear expectations?
- Did it explain skipped, cached, blocked, failed, or uncertain checks?
- Did it find real listings?
- Did it miss listings you found manually?

</div>

![Scan screen](/assets/infobreaker-beta/scan-guide.png?class=large)
</section>

## Review

<section class="beta-tab">
<div>

Review is where possible matches become decisions. Infobreaker may find people with similar names or locations, so tester judgment matters.

Use Review to confirm real matches, reject false positives, inspect evidence, and send confirmed listings to removal.

Things to test:

- Is there enough evidence to make a decision?
- Are false positives easy to reject?
- Is the difference between possible match, confirmed match, bad evidence, and not a match clear?
- Does the next step after confirmation make sense?

</div>

![Review screen](/assets/infobreaker-beta/review-guide.png?class=large)
</section>

## Remove

<section class="beta-tab">
<div>

Remove guides opt-outs for confirmed listings. Some brokers can be handled mostly inside the app. Others require a browser, CAPTCHA, email confirmation, or another human step.

Use Remove to preview what the app will submit, start live removal, handle required broker prompts, and move submitted records into monitoring.

Things to test:

- Is preview versus live submission clear?
- Do broker handoffs open correctly?
- If automation stops, does the app explain why?
- Is it obvious when a removal has been submitted versus merely prepared?

</div>

![Remove screen](/assets/infobreaker-beta/remove-guide.png?class=large)
</section>

## Monitoring

<section class="beta-tab">
<div>

Monitoring tracks what happens after opt-out submission. Broker removals are not instant, and listings can reappear. This tab should make that waiting period understandable.

Use Monitoring to see removals that are waiting, due for checks, verified as removed, still listed, or reappeared.

Things to test:

- Do removal statuses make sense?
- Is it clear when to run due checks?
- Can you understand proof, evidence, retry, and recurrence states?
- Would you know what to do if a listing comes back?

</div>

![Monitoring screen](/assets/infobreaker-beta/monitoring-guide.png?class=large)
</section>

## Settings

<section class="beta-tab">
<div>

Settings shows where local data lives, scan preferences, debug logging controls, support reporting, and update channels.

Use Settings to enable run logs, create a report, open the debug folder, export a local summary, and check for app or automation updates.

Things to test:

- Is it clear that data stays local?
- Is debug logging understandable without sounding scary?
- Does Report Latest create something you can review before sending?
- Are app and automation update states clear?

</div>

![Settings screen](/assets/infobreaker-beta/settings-debug-logging.png?class=large)
</section>

## Known Gaps

The Windows build is currently distributed as a portable ZIP, not an installer. The NSIS installer path is parked until it behaves reliably on real Windows systems.

Current beta testers should use the downloads at the top of this page unless Jim sends a newer build directly.
