---
title: "Infobreaker Beta Tester Guide - Tacita Labs"
description: "Private Infobreaker beta tester page with downloads, current build status, testing priorities, debug logging, issue reporting, and a tab-by-tab app guide."
url: "/infobreaker-beta-testers.html"
noindex: true
toc: true
---

# Infobreaker beta tester guide

Infobreaker is a local-first data broker removal app. It helps you enter your information once, scan supported broker sites, review possible matches, submit opt-outs where possible, and track whether removals stay removed.

The important privacy rule: your profile, scan history, screenshots, and raw run logs stay on your device unless you choose to send a redacted support bundle.

## Current Status

**Public beta feed:** macOS 1.0.0-beta.22, Windows 1.0.0-beta.22

{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}macOS{{< /eyebrow >}}

Universal DMG for Intel and Apple Silicon.

[Download Infobreaker 1.0.0-beta.22 for macOS](https://github.com/tacitalabs/infobreaker/releases/download/infobreaker-1.0.0-beta.22/Infobreaker-1.0.0-beta.22-universal.dmg)

SHA-256: `43e8ca59605e944fdaf7fc4a6b51c4e6dbdd705dd766f99524a0e992cf63f9cb`
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Windows{{< /eyebrow >}}

x64 portable ZIP with signed app payload.

[Download Infobreaker 1.0.0-beta.22 for Windows](https://github.com/tacitalabs/infobreaker/releases/download/infobreaker-1.0.0-beta.22/Infobreaker-1.0.0-beta.22-x64-portable.zip)

SHA-256: `b8571a87c61811e806e6507b12319f95fe451e730ddf4322ab0fcb3445f1cda5`
{{% /split-card %}}

{{< split-end >}}

- **Automation bundle:** beta.21 broker automation on the stable and beta channels during private beta.
- **QA status:** beta.22 is the current synced app line for macOS and Windows. macOS passed universal packaging, signing, notarization, Gatekeeper, artifact, and packaged smoke checks. Windows beta.22 uses the signed portable ZIP fallback while the installer path awaits another Windows-native smoke pass.
- **Privacy posture:** local-first by default. Reports are optional and should be reviewed before sending.

After a new build is promoted, this section should be the only part repeat testers need to re-read.

### What changed lately

- Report Problem now creates a diagnostic report from Settings, review cards, and missing-screenshot views.
- Screenshot-loading failures are logged locally with platform, architecture, and evidence search paths to help diagnose Intel Mac and path issues.
- Review screenshots load from current and legacy evidence locations, and review decision buttons can be clicked again to deselect.
- Profiles now show only user-created profiles. Historical scan and opt-out records no longer create derived person cards.
- macOS and Windows are now both on app beta.22 so testers are no longer split across app versions.
- Review decisions for SocialCatfish now persist correctly after clicking Confirm match.
- Windows beta.20 removes TruePeopleSearch.net from normal scan coverage so TruePeopleSearch testing stays on truepeoplesearch.com.
- Windows beta.19 fixed TruePeopleSearch challenge handling so explicit broker challenge pages are not recorded as empty results.
- The app update feed now includes beta.22 artifacts for macOS universal, macOS Intel, and Windows x64.
- The automation feed is beta.21 on both stable and beta during private beta, so existing beta.15+ installs can pick up broker catalog updates through Settings.
- TruePeopleSearch.net is removed from normal beta scan coverage. TruePeopleSearch coverage should use truepeoplesearch.com.
- The macOS tester DMG is now universal for Intel and Apple Silicon Macs.
- Windows packaged scans use the bundled Windows Node runtime instead of depending on a tester's system Node.
- Windows portable scan preflight no longer blocks when Windows cannot inspect external automation processes.
- Profile storage wording now says operating system secure storage instead of system keychain.
- Scan issue counts distinguish broker issues from per-check failures.
- Debug run logs and redacted support bundles are available from Settings.
- Guided removal handoff behavior is clearer after accepted opt-out previews.

> **Beta warning:** Infobreaker is not finished. It can miss listings, flag weak matches, hit broker-side blocks, or require human action for opt-out forms. Do not assume a broker listing is gone until the monitoring workflow confirms it.

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

- Download the x64 installer.
- Run the installer and follow the Windows prompts.
- Windows may still show a SmartScreen reputation warning for a very new beta, but the installer and installed app are signed.
- If you previously tested the portable ZIP, quit that copy before installing.
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

## Short Tester Guide

The highest-value feedback is not just "did it crash?" It is whether the app makes a hard privacy workflow understandable enough that a normal person can finish it.

{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}UI and workflow clarity{{< /eyebrow >}}

- Is it obvious what to do next?
- Do the tabs feel like a natural workflow: Today, Profiles, Scan, Review, Remove, Monitoring?
- Does the app explain results without sounding technical or evasive?
- Are warnings, blockers, and next steps clear when something cannot be automated?
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
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}Post-opt-out monitoring{{< /eyebrow >}}

- Do you understand how to verify removals?
- Can you tell what is waiting, due, blocked, removed, or reappeared?
- Does recurrence tracking make sense?
- Would you trust the timeline enough to come back later?
{{% /split-card %}}

{{< split-end >}}

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

```
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

High-value screenshots show the full app window and the current tab. For privacy, crop or blur anything you do not want to share.

Do not send raw debug folders unless Jim or Tacita Labs asks for them. Use **Report Latest** first because it creates the redacted support copy.

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

Profiles are where Infobreaker stores the person and locations you want to scan for. Profile details are encrypted with operating system secure storage and stay on your device.

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

Use Remove to preview what the app will submit, start live removal, handle required broker prompts, and move submitted records into monitoring.

Things to test:

- Is preview versus live submission clear?
- Do broker handoffs open correctly?
- If automation stops, does the app explain why?
- Is it obvious when a removal has been submitted versus merely prepared?

![Remove screen](/assets/infobreaker-beta/remove-guide.png?class=large)

## Monitoring

Monitoring tracks what happens after opt-out submission. Broker removals are not instant, and listings can reappear. This tab should make that waiting period understandable.

Use Monitoring to see removals that are waiting, due for checks, verified as removed, still listed, or reappeared.

Things to test:

- Do removal statuses make sense?
- Is it clear when to run due checks?
- Can you understand proof, evidence, retry, and recurrence states?
- Would you know what to do if a listing comes back?

![Monitoring screen](/assets/infobreaker-beta/monitoring-guide.png?class=large)

## Settings

Settings shows where local data lives, scan preferences, debug logging controls, support reporting, and update channels.

Use Settings to enable run logs, create a report, open the debug folder, export a local summary, and check for app or automation updates.

Things to test:

- Is it clear that data stays local?
- Is debug logging understandable without sounding scary?
- Does Report Latest create something you can review before sending?
- Are app and automation update states clear?

![Settings screen](/assets/infobreaker-beta/settings-debug-logging.png?class=large)

## Known Gaps

Infobreaker is still a beta, and these are the known rough edges testers should expect:

- The Windows installer has passed install, launch, signature, and uninstall smoke checks. Upgrade testing from older beta installs is still limited.
- Some brokers block automation, show CAPTCHAs, delay removals, or require email confirmation.
- The app can find weak or wrong matches. Review decisions matter.
- macOS and Windows are both on beta.22. Windows beta.22 uses the signed portable ZIP fallback while the installer path awaits another Windows-native smoke pass.
- Removal verification is not instant. Monitoring may need later rechecks before a listing can be called removed.

Current beta testers should use the downloads at the top of this page unless Jim sends a newer build directly.
