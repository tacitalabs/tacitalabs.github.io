---
title: "Privacy Policy - Tacita Labs"
description: "Privacy policy for Tacita Labs, URLStrip, and this website. Tacita Labs tools work locally on your device; Infobreaker has its own detailed privacy notes."
url: "/privacy.html"
---

# Short version: Tacita Labs tools are local first.

Normal URL cleaning happens on your device. Some optional, user-controlled
features make limited network requests, as described below. We do not require
accounts, and we do not collect your browsing history or cleaned-link history.
This page covers URLStrip and this website.

*Last updated: September 8, 2026*

{{% card %}}
## Infobreaker

Infobreaker, the local-first data broker removal tool (public beta), has
its own detailed privacy notes covering what stays on your device, when
information goes to broker sites, and how optional redacted support
reports work. Read the
[Infobreaker Privacy Notes](/infobreaker-privacy.html).

{{% /card %}}
{{% card %}}
## URLStrip, the app

URLStrip is designed to clean links locally on your iPhone, iPad, Mac,
or Windows device. When you paste, share, scan, or open a URL in
URLStrip, the normal cleaning process happens on your device. The optional
network features below are separate from that normal cleaning.

For the public explanation of URLStrip's Monetization Impact and
Confidence labels, see [how URLStrip classifies
tracking](/tracking-methodology.html).

- No URLStrip account is required.
- We do not sell personal data.
- We do not use URLStrip to track you across apps or websites.
- We do not collect your browsing history.
- We do not collect a history of the links you clean.
- URLStrip has no ads.
- We do not use third-party advertising or tracking SDKs in URLStrip.

{{% /card %}}
{{% card %}}

## Optional link resolution and sharing context

URLStrip for iOS and iPadOS 1.3 Build 39 includes user-controlled features
that can make limited requests for public link or post information:

- If URLStrip recognizes a supported Instagram, Threads, or Reddit share
  wrapper, it may offer a separate action labeled as a network operation.
  URLStrip contacts the service identified by that link only after you choose
  the action or explicitly enable automatic share-link resolution in Settings.
  Automatic resolution is off by default. The request follows the redirect to
  recover the direct destination.
- When you share a public X/Twitter or Reddit post, URLStrip may load limited
  public post context so the share includes useful text or a title. For an
  X/Twitter post, URLStrip tries Twitter's oEmbed service first, followed by
  bounded fallbacks to FxTwitter and XCancel. If the content is private,
  challenged, missing, malformed, or otherwise unavailable, URLStrip falls
  back to sharing links only.

These limited lookups go directly from your device through ephemeral,
cookie-free network sessions. A service contacted for one of these requests
receives the requested public post or share link and necessarily sees
connection metadata such as your IP address and request time. Tacita Labs does
not receive or retain the link or post request.

{{% /card %}}
{{% card %}}

## Optional privacy redirects

URLStrip can optionally rewrite X/Twitter links to XCancel and Reddit links to
a Redlib-compatible privacy frontend. These redirects are opt-in. XCancel and
Redlib-compatible frontends are independent third-party services, not Tacita
Labs services. If you enable and open one of these rewritten links, the chosen
frontend receives the requested public link or post and necessarily sees
connection metadata such as your IP address and request time. Its own privacy
practices apply.

{{% /card %}}
{{% card %}}

## Optional rules updates

You can manually check a static rules manifest hosted by Tacita Labs. You can
also opt in to a daily check. If an eligible rules update is available, you
may optionally download it; URLStrip verifies the downloaded rules before
using them.

Manifest checks and rule downloads do not contain your cleaned links, URLStrip
settings, usage statistics, or a device identifier. The Tacita Labs update
host necessarily sees ordinary connection metadata such as your IP address
and request time.

{{% /card %}}
{{% card %}}

## Optional issue reports and support

URLStrip for iOS and iPadOS cleans URLs locally on your device. It
does not send missed-tracker reports from inside the app, generate
in-app email reports, or create shareable report bodies. If URLStrip
misses a parameter on iOS or iPadOS, the app may link you to Tacita
Labs support or FAQ pages, where you can choose to contact us
separately.

On macOS and Windows, URLStrip may offer a built-in issue-reporting
flow. You can also choose to email Tacita Labs directly.

An issue report may include:

- The original URL you were trying to clean.
- The cleaned URL URLStrip produced.
- The tracking parameters URLStrip detected or missed.
- Basic app/platform details needed to debug the issue.
- Anything else you choose to write in the email.

Issue reports and support emails are optional. Tacita Labs only
receives them if you choose to send them. We use those reports to fix
rules, improve URLStrip, and respond to you if a response is needed. We
do not use issue reports to build advertising profiles or sell data.

{{% /card %}}
{{% card %}}

## Camera and photo access

URLStrip may ask for camera access to scan QR codes. It may ask for
photo library access if you choose to scan a QR code from an image.
Those permissions are used for QR-code scanning, not for collecting
your photos.

{{% /card %}}
{{% card %}}

## Safari Extension and Share Extension

URLStrip's Safari Extension and Share Extension exist so you can clean
links from Safari and other apps. Their purpose is to clean URLs on
device and return the cleaned result to you. Tacita Labs does not
receive your Safari browsing history from these extensions.

The Share Extension uses the same Instagram, Threads, and Reddit
network-resolution policy, public-post context policy, and user-controlled
automatic-resolution setting described above.

{{% /card %}}
{{% card %}}

## TestFlight

If you use a beta version of URLStrip through Apple's TestFlight,
Apple may collect and share beta feedback, screenshots, crash logs,
device details, and app diagnostics as part of TestFlight. That
TestFlight data is handled under Apple's TestFlight terms and privacy
practices.

{{% /card %}}
{{% card %}}

## This website

The Tacita Labs website is intended to be simple and informational.
We do not use it to build profiles on visitors. If we add analytics or
other services that materially change that, this policy will change
too.

{{% /card %}}
{{% card %}}

## Email and contact

If you email Tacita Labs, we receive your email address and the
contents of your message. We keep email long enough to answer you,
maintain the thread, and improve the product when your message is
about a bug or missed tracker. We do not sell your information or use
your email for unrelated marketing.

For privacy questions, contact
[hello@tacitalabs.com](mailto:hello@tacitalabs.com). For missed
tracker reports, see the
[missed-parameter FAQ](/faq.html#report-missed-parameter) or email
[submissions@tacitalabs.com](mailto:submissions@tacitalabs.com).
{{% /card %}}
