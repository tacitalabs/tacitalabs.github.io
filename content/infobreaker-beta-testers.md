---
title: "Infobreaker Beta Tester Guide - Tacita Labs"
description: "Private Infobreaker beta tester page with downloads, current build status, testing priorities, debug logging, issue reporting, and a tab-by-tab app guide."
url: "/infobreaker-beta-testers.html"
noindex: true
toc: true
---

# Infobreaker beta tester guide

Infobreaker is a local-first data broker removal app. It helps you enter your information once, scan supported broker sites, review possible matches, submit opt-outs where possible, and track whether removals stay removed.

The important rule for this beta: **if Infobreaker cannot prove something, it should not claim it.**

That means the app may feel more cautious than cloud removal services. A submitted request is not counted as a removal. A failed broker check is not treated as "no listing found." A broker refusal is recorded as the broker's decision, not hidden as a generic app error.

Your profile, scan history, screenshots, and raw run logs are stored locally on your computer. Your information leaves your device only when you choose to send it to a broker as part of a removal request, or when you choose to send Tacita Labs a redacted support bundle.

## Current Status

**Current review baseline:** 1.0.0-beta.47

**Self-serve public downloads:** macOS 1.0.0-beta.37, Windows 1.0.0-beta.47

Use the direct build Jim sent you if it is newer than the public links below. macOS remains on beta.37 until a newer signed DMG is promoted.

{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}macOS{{< /eyebrow >}}

Universal DMG for Intel and Apple Silicon.

[Download Infobreaker 1.0.0-beta.37 for macOS](https://github.com/tacitalabs/infobreaker/releases/download/infobreaker-1.0.0-beta.37/Infobreaker-1.0.0-beta.37-universal.dmg)

SHA-256: `23217e1c6df09e40b8df8849ce1f705ab50e292b3fb0f64ec7bb975f72da7535`
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Windows{{< /eyebrow >}}

x64 portable ZIP with signed app payload.

[Download Infobreaker 1.0.0-beta.47 for Windows](https://github.com/tacitalabs/infobreaker/releases/download/infobreaker-1.0.0-beta.47/Infobreaker-1.0.0-beta.47-x64-portable.zip)

SHA-256: `a30b1d0db3f9e04c5fda188e26c2367e19e41bd7afbb638e73adcef53ba5066a`
{{% /split-card %}}

{{< split-end >}}

- **Automation bundle:** beta.22 broker automation on the stable and beta channels during private beta. It requires app beta.47 or newer.
- **QA status:** beta.47 is the current internal review baseline. The latest Windows portable QA build passed release health, signing policy, artifact audit, and ZIP integrity checks. Windows self-serve downloads now point to beta.47; macOS remains on beta.37 until a newer signed DMG is promoted.
- **Privacy posture:** local-first by default. Reports are optional and should be reviewed before sending. Raw debug folders can contain personal information; use the redacted support report first.

After a new build is promoted, this section should be the only part repeat testers need to re-read.

### What changed lately

Recent beta hardening focused on one theme: do not let the app overclaim.

- The status model is now stricter about proof. Verified removals are counted only after a broker re-check confirms the listing is gone.
- Monitoring now distinguishes broker-window waiting from overdue rows. A listing that is still visible before the broker's response window closes is monitored instead of blindly retried. A listing still visible after the window closes is treated as overdue and should use receipt-backed follow-up.
- Verification evidence is more precise. Broker re-checks now keep the exact matched result when a parser can identify one, and some brokers now save row-level evidence instead of only full-page screenshots.
- SmartBackgroundChecks verification now treats person-specific profile URLs as record boundaries, so a different live record does not poison a removal that already succeeded.
- Assisted/manual removal handoffs are durable across restarts and can capture evidence when the tester records the outcome.
- Settings now includes local data information, automation identity, database compatibility, Chrome readiness, and Copy Support Info.
- Windows builds now enforce a single running app instance to avoid two beta folders fighting over the same local database and browser session.
- Waiting-email rows now surface an email-never-arrived path after the request has aged.
- Public-source safety checks now have a redacted mode so failure logs do not print the sensitive text they were meant to catch.
- Earlier beta work added the first-run tutorial, assisted-browser privacy notice, app and broker automation update checks, redacted support reports, debug run logs, clearer broker error summaries, packaged Windows runtime support, and universal macOS builds.

> **Beta warning:** Infobreaker is not finished. It can miss listings, flag weak matches, hit broker-side blocks, or require human action for opt-out forms. Do not assume a broker listing is gone until the monitoring workflow confirms it.

## What to expect in week one

Most early beta confusion comes from timing. Infobreaker is not trying to make the dashboard green on day one. It is trying to build a paper trail that can be checked.

1. Day 1: create a profile, scan brokers, and review possible matches.
2. Days 1-3: submit removal requests where possible and complete any email confirmations, CAPTCHAs, or assisted browser steps.
3. Around day 7: the first proof checks begin. Some brokers will still be inside their response window.
4. Weeks 2-6: verified removals should start accumulating as brokers process requests and monitoring re-checks them.

Zero verified removals in the first week does not mean the app is doing nothing. It means Infobreaker is not counting submissions as removals.

## How to read the statuses

{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}Proof first{{< /eyebrow >}}

**Verified removed** means the app re-checked the broker and captured evidence that the listing is gone.

**Removal requested** means a request was submitted or confirmed, but the broker still needs time.

**Still exposed** means the listing was seen again. If the broker window is still open, this is monitoring, not a reason to hammer the broker with duplicate requests.
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Broker reality{{< /eyebrow >}}

**Needs you** means a human step is required: CAPTCHA, email confirmation, assisted submit, or review.

**Broker declined** means the broker received the request and refused it. That is not the same as an app crash.

**Overdue** means the broker window appears to have passed and the listing is still visible. The next step should be a receipt-backed follow-up, not blind resubmission.
{{% /split-card %}}

{{< split-end >}}

Every count in the app should reconcile to rows you can open. If a number does not click through to understandable evidence, report it.

## Install Notes

{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}macOS{{< /eyebrow >}}

- Download the universal DMG. It supports Intel and Apple Silicon Macs.
- Open the DMG and drag Infobreaker to Applications.
- If macOS warns that the app was downloaded from the internet, choose Open. The DMG is signed, notarized, and stapled.
- If you already tested an older beta, quit Infobreaker before replacing it.
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Windows{{< /eyebrow >}}

- Download the x64 portable ZIP.
- Right-click the ZIP and choose **Extract All** before launching. Do not run `Infobreaker.exe` from inside the ZIP preview.
- Run `Infobreaker.exe` from the extracted `win-unpacked` folder.
- Windows may still show a SmartScreen reputation warning for a very new beta. The app payload is signed, but new signed apps may need reputation before Windows stops warning.
- Quit any older Infobreaker copy before replacing the extracted folder.
{{% /split-card %}}

{{< split-end >}}

## Browser Automation

Infobreaker sometimes opens a normal desktop browser while scanning brokers or submitting opt-out requests. This is deliberate. Many broker sites treat invisible automation, datacenter-style browsers, or heavily instrumented test browsers as suspicious. A regular local browser behaves more like a normal person using the site from their own computer, which gives the app a better chance of reaching the same pages you would see manually.

{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}What browser opens{{< /eyebrow >}}

- On macOS, Infobreaker looks for Google Chrome first, then Chrome Canary or Chromium.
- On Windows, it looks for Google Chrome or Chromium first, with Microsoft Edge as a fallback.
- The browser may be visible. If a broker shows a CAPTCHA, security check, email confirmation, or other human step, complete it in that window and the app will continue when the broker accepts it.
- Visible browser windows are not a failure. They are how the app lets you watch what is being sent and step in when brokers deliberately require a person.
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}How the profile is handled{{< /eyebrow >}}

- Infobreaker launches the browser with its own automation profile, separate from your normal personal browsing profile.
- That keeps broker visits, cookies, sessions, and history from being mixed into your everyday browser profile.
- The automation profile lives in Infobreaker's local app data and stays on your device.
- If the browser is already open in your normal profile, Infobreaker should still use its own separate automation profile for broker work.
{{% /split-card %}}

{{< split-end >}}

> The tradeoff is intentional: using a real browser makes broker automation more reliable, but the app still keeps the profile local and separate so testing Infobreaker does not turn your everyday browser history into a pile of broker-site visits.

## Email and broker replies

Brokers usually require an email address before they process a removal request. Expect confirmation emails, receipt emails, and sometimes refusals. Some of them look like marketing or spam.

- Use a personal email address you control. Some brokers appear to treat business domains, relay addresses, or workflow-looking addresses as third-party requests.
- Check spam if a confirmation email does not arrive.
- If the app shows a waiting-email row for more than a day, use the email-never-arrived path instead of rerunning the same removal immediately.
- If a broker sends a refusal or says the request was classified as a third-party or authorized-agent request, save that email. That response is evidence.

## Short Tester Guide

The highest-value feedback is not just "did it crash?" It is whether the app makes a hard privacy workflow understandable enough that a normal person can finish it.

{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}UI and workflow clarity{{< /eyebrow >}}

- Is it obvious what to do next?
- Do the tabs feel like a natural workflow: Today, Profiles, Scan, Review, Remove, Monitoring?
- Does the app explain results without sounding technical or evasive?
- Are warnings, blockers, and next steps clear when something cannot be automated?
- Does the app make it clear when it knows something versus when it is still waiting?
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Scanners{{< /eyebrow >}}

- Did Infobreaker find listings you expected it to find?
- Did it miss a real listing you found manually?
- Did it flag someone else as you?
- Did a broker produce errors, blocks, CAPTCHAs, or confusing results?
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Opt-out workflow{{< /eyebrow >}}

- Was it clear which listings were ready to remove?
- Did preview and live removal steps make sense?
- Did broker forms open and submit correctly?
- Were required human steps, like CAPTCHA or email confirmation, clearly explained?
- If the app prepared a form but asked you to submit it, was it clear that nothing had been sent yet?
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Post-opt-out monitoring{{< /eyebrow >}}

- Do you understand how to verify removals?
- Can you tell what is waiting, due, blocked, removed, or reappeared?
- Does recurrence tracking make sense?
- Would you trust the timeline enough to come back later?
- Do verified-removal counts, in-flight rows, and overdue rows match evidence you can open?
{{% /split-card %}}

{{< split-end >}}

## Suggested Test Pass

1. Install Infobreaker and create one profile.
2. Add at least one current or previous city/state where broker records may exist.
3. Run a scan.
4. Review possible matches carefully. Mark wrong people as not a match.
5. Try at least one opt-out preview before live submission.
6. Complete any required email confirmation, CAPTCHA, or assisted browser step.
7. If an opt-out succeeds, follow the Monitoring tab until the app tells you what to check next.
8. Open evidence behind at least one status and confirm the claim matches the screenshot or receipt.
9. Check Settings and use **Copy Support Info** so you know what a report includes.
10. Turn on support run logs before trying a flow that previously failed.
11. Send feedback for confusing UI, false positives, false negatives, opt-out failures, evidence problems, and monitoring confusion.

## What to report

Do report:

- a number that does not reconcile to visible rows
- work that disappears after you took an action
- a claim that does not have evidence behind it
- a wrong-person match
- a real listing the scanner missed
- a broker refusal, especially a third-party or authorized-agent classification
- a support report that appears to contain unredacted personal details

You do not need to report every CAPTCHA, slow broker, or state-law refusal unless the app handles it confusingly. Those are expected broker conditions. The bug is when Infobreaker explains them poorly or claims more than it can prove.

## Debug Logging

Infobreaker can save scan and removal run logs locally to help troubleshoot beta failures. These logs are for support, not telemetry. They stay on your device unless you choose to send them.

![Settings screen showing support run logs controls](/assets/infobreaker-beta/settings-debug-logging.png?class=large)

### How to turn logging on

1. Open **Settings**.
2. In **Scan Preferences**, enable **Save run logs**.
3. Click **Save**.
4. Re-run the scan or opt-out flow that failed.
5. Use **Copy Support Info** when you only need to share app, platform, Chrome, database, and automation-version details.
6. Use **Report Problem** to create a redacted report, or **Open Folder** to inspect the raw local logs.

### What gets cleaned before reporting

When you create a support report, Infobreaker creates a separate redacted copy for review. The report is designed to remove or mask profile details such as names, email addresses, phone numbers, street addresses, ZIP codes, and other obvious personal values before you send it.

You should still review the report before sending. Beta software is exactly where paranoia earns its keep.

## Reporting Issues

Send beta reports to [infobreaker@tacitalabs.com](mailto:infobreaker@tacitalabs.com).

For scanner, opt-out, or monitoring issues, include:

```
Subject: Infobreaker beta issue - [short summary]

Platform: macOS or Windows
Infobreaker version:
OS version:
Chrome detected? yes/no/not sure
Automation version, if shown:
Broker or screen:
What you were trying to do:
What happened:
What you expected:
Did you use Copy Support Info or enable support run logs? yes/no
Attachments: screenshot, redacted support report, or screen recording
```

High-value screenshots show the full app window and the current tab. For privacy, crop or blur anything you do not want to share.

Do not send raw debug folders unless Jim or Tacita Labs asks for them. Use **Report Problem** first because it creates the redacted support copy.

## App Overview

Infobreaker is organized as a workflow, not as separate utilities. Start at Today, keep your profile current, scan brokers, review matches, remove confirmed listings, then monitor removals over time.

## Today

Today is the command center. It shows what needs your attention, what is ready to do next, and what changed recently.

Use Today when you are not sure where to go. After a scan, it should point you toward Review. After confirmed matches, it should point you toward Remove. After submitted removals, it should point you toward Monitoring.

Things to test:

- Are the action cards clear?
- Does Today explain the current state without making you hunt through tabs?
- After each workflow step, does Today update in a way that feels obvious?

![Today first-run screen](/assets/infobreaker-beta/today-first-run.png?class=large)

## Profiles

Profiles are where Infobreaker stores the person and locations you want to scan for. Profile details stay on your device. Settings shows the local data path and current storage/encryption state.

Use Profiles to add your name, aliases, current city/state, and previous locations that may still appear in broker records.

Things to test:

- Is it clear what information is needed and why?
- Are aliases and previous locations understandable?
- Does profile setup feel safe enough for a privacy app?

![Profiles screen](/assets/infobreaker-beta/profiles-guide.png?class=large)

## Scan

Scan checks supported data broker sites for possible records. The app uses your profile locations and selected broker set to decide what to search.

Use Scan to start a first pass, retry brokers with issues, or run a narrower follow-up.

Things to test:

- Did the scan start with clear expectations?
- Did it explain skipped, cached, blocked, failed, or uncertain checks?
- Did it find real listings?
- Did it miss listings you found manually?

![Scan screen](/assets/infobreaker-beta/scan-guide.png?class=large)

## Review

Review is where possible matches become decisions. Infobreaker may find people with similar names or locations, so tester judgment matters.

Use Review to confirm real matches, reject false positives, inspect evidence, and send confirmed listings to removal.

Things to test:

- Is there enough evidence to make a decision?
- Are false positives easy to reject?
- Is the difference between possible match, confirmed match, bad evidence, and not a match clear?
- Does the next step after confirmation make sense?

![Review screen](/assets/infobreaker-beta/review-guide.png?class=large)

## Remove

Remove guides opt-outs for confirmed listings. Some brokers can be handled mostly inside the app. Others require a browser, CAPTCHA, email confirmation, or another human step.

Use Remove to preview what the app will submit, start live removal, handle required broker prompts, and move submitted records into Monitoring. If Infobreaker prepares a form and pauses for you to review or submit it, treat that as prepared, not submitted, until the app records the result.

Things to test:

- Is preview versus live submission clear?
- Do broker handoffs open correctly?
- If automation stops, does the app explain why?
- Is it obvious when a removal has been submitted versus merely prepared?

![Remove screen](/assets/infobreaker-beta/remove-guide.png?class=large)

## Monitoring

Monitoring tracks what happens after opt-out submission. Broker removals are not instant, and listings can reappear. This tab should make that waiting period understandable.

Use Monitoring to see removals that are waiting, due for checks, verified as removed, still listed inside a broker window, overdue, declined, or reappeared.

Things to test:

- Do removal statuses make sense?
- Is it clear when to run due checks?
- Can you understand proof, evidence, monitoring, overdue, retry, and recurrence states?
- Would you know what to do if a listing comes back?

![Monitoring screen](/assets/infobreaker-beta/monitoring-guide.png?class=large)

## Settings

Settings shows where local data lives, scan preferences, debug logging controls, support reporting, Chrome readiness, app/database compatibility, and update channels.

Use Settings to enable run logs, copy support info, create a report, open the local data folder, export a local summary, and check for app or automation updates.

Things to test:

- Is it clear that data stays local?
- Is debug logging understandable without sounding scary?
- Does Copy Support Info include useful version details without exposing profile data?
- Does Report Problem create something you can review before sending?
- Are app and automation update states clear?

![Settings screen](/assets/infobreaker-beta/settings-debug-logging.png?class=large)

## Known Gaps

Infobreaker is still a beta, and these are the known rough edges testers should expect:

- macOS self-serve downloads currently lag the latest Windows review baseline. Use the newest direct build Jim provides if you have one.
- Windows tester builds may still ship as signed portable ZIPs while the installer upgrade path is being tested. Extract the ZIP before running the app.
- Some brokers block automation, show CAPTCHAs, delay removals, or require email confirmation.
- The app can find weak or wrong matches. Review decisions matter.
- Removal verification is not instant. Monitoring may need later rechecks before a listing can be called removed.
- Search surfaces can be messy. Paywall teasers, censored rows, and multiple records for the same person may require extra evidence before a listing is treated as escalation-ready.

Current beta testers should use the downloads at the top of this page unless Jim sends a newer build directly.
