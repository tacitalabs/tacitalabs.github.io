---
title: "URLStrip Beta Testing Guide - Tacita Labs"
description: "How to beta test URLStrip on iOS, iPadOS, macOS, and Windows. Includes install links, what to test, beta caveats, and how to report issues."
url: "/beta-testing.html"
---

# Help test URLStrip.

URLStrip removes known tracking parameters from links before you open,
save, copy, or share them. This guide explains what to test, what to
report, and what to expect during the beta.

URLStrip cleans links locally. Where a platform offers
missed-tracker reporting, reports only send information to Tacita Labs
if you choose to send them. On iOS and iPadOS, URLStrip links to the
FAQ instead of generating an in-app email report, mailto report, or
shareable report body.

[Download URLStrip](/download.html) · [How to report
issues](#what-to-report) · [Missed-parameter FAQ](/faq.html#report-missed-parameter)

## Install the beta

- **iOS / iPadOS:** [Join the public TestFlight
  beta](https://testflight.apple.com/join/REgaBTbe).
- **macOS:** [Download the current macOS build](/download.html).
- **Windows:** [Download the current Windows build](/download.html).

## What URLStrip does

URLStrip removes known tracking parameters from URLs while preserving
parameters that appear necessary for the link to work. Not every
parameter is tracking. Some are needed for content, login state,
search, app behavior, or page routing.

The most useful beta feedback is whether URLStrip feels clear,
trustworthy, and safe to use with real links.

## Good test links

Try URLStrip with real links from:

- newsletters
- social media
- shopping sites
- search results
- YouTube
- affiliate-heavy pages
- QR codes, where supported
- links friends send you

## What to test on every platform

- URLStrip removes obvious tracking parameters.
- The cleaned link still opens the intended page.
- The app explains what changed clearly.
- Copy, share, and restore actions do what they say.
- The workflow feels safe enough to trust with real links.
- Missed-parameter reporting guidance is easy to find.

## iOS / iPadOS flows

- **Main app:** paste a URL, tap Clean, review what changed, then copy
  or share the cleaned link.
- **Share Extension:** share a link from Safari or another app into
  URLStrip and confirm the cleaned result looks right.
- **Safari Extension:** enable URLStrip in Settings > Safari >
  Extensions, then test it from Safari's extension controls.
- **QR flow:** scan a QR code or import a QR-code image from Photos and
  confirm URLStrip shows and cleans the destination.
- **Missed parameters:** confirm the app links to the website FAQ for
  reporting guidance.
- **Widget / system integration:** add the widget if available and
  confirm the behavior makes sense.

## macOS flows

- Install and launch URLStrip.
- Confirm the menu bar app appears.
- Copy a tracked URL to the clipboard and confirm URLStrip reacts as
  expected.
- Confirm the cleaned result is clear and trustworthy.
- Confirm recovery or restore behavior works when available.
- Try a URL that should not change and confirm that does not feel like
  a failure.
- Test disabling cleaning for a site if that option is available.
- Use missed-tracker reporting if URLStrip leaves tracking parameters
  behind.

## Windows flows

- Install or unpack and launch URLStrip.
- Confirm the app or tray behavior is sane on first launch.
- Copy a tracked URL to the clipboard and confirm URLStrip reacts as
  expected.
- Confirm the cleaned result is clear and trustworthy.
- Confirm restore or recovery behavior works when available.
- Try a URL that should not change and confirm that does not feel like
  a failure.
- Test disabling cleaning for a site if that option is available.
- Use missed-tracker reporting if URLStrip leaves tracking parameters
  behind.

## What to report {#what-to-report}

High-value feedback includes:

- URLStrip missed an obvious tracking parameter.
- A cleaned link broke.
- The wrong URL was copied or shared.
- Clipboard behavior was surprising or unsafe.
- Different URLStrip surfaces produced different results for the same
  URL.
- A screen or explanation felt confusing.
- You hesitated because the app did not make clear what it changed.
- QR scanning or QR image import failed.
- Missed-parameter reporting guidance was hard to find or confusing.

## What to include in a report

- Original URL.
- Cleaned URL shown by URLStrip, if any.
- Platform: iOS, iPadOS, macOS, or Windows.
- Device or computer model, if known.
- OS version.
- Where it happened: main app, share extension, Safari extension, QR
  flow, widget, macOS menu bar app, Windows app/tray, or clipboard
  monitor.
- What you expected.
- What actually happened.
- Screenshot or screen recording if the issue is visual.

## Beta caveats

- URLStrip removes known tracking parameters. It will not catch
  everything yet.
- On iOS and iPadOS, Apple may ask you to allow paste/clipboard access.
  That is an iOS privacy control, not a URLStrip setting. URLStrip
  cannot disable it, so expect to approve paste access when iOS asks.
- Some parameters are intentionally preserved because removing them
  would break links.
- Some links may expose edge cases.
- Platform behavior and feature coverage vary.
- Safari Extension behavior may vary by iOS or iPadOS version.
- macOS and Windows security prompts may vary depending on
  build/signing state.
- iOS and iPadOS link to the website FAQ instead of generating an
  in-app missed-parameter email report, mailto report, or shareable
  report body.
- macOS and Windows missed-tracker reporting depends on the reporting
  surface and local email/share configuration.
- Disabled domains and other beta behavior may be local to each device.
- TestFlight may collect crash logs, screenshots, beta feedback,
  diagnostics, and device details under Apple's terms for iOS/iPadOS
  testers.
