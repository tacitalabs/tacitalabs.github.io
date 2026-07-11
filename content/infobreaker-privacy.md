---
title: "Infobreaker Privacy Notes - Tacita Labs"
description: "Private-beta privacy notes for Infobreaker, a local-first data broker removal tool shared by direct link."
url: "/infobreaker-privacy.html"
toc: true
noindex: true
---

# Infobreaker privacy notes

Infobreaker is in private beta and is shared by direct link. This page covers Infobreaker only. The public Tacita Labs [Privacy Policy](/privacy.html) currently covers URLStrip.

Infobreaker is built around a local-first trust model: there is no Infobreaker account, no cloud dashboard, and no Tacita Labs backend that receives your profile, scan history, broker evidence, or removal history.

## What stays on your device

{{% card %}}
- Your profile details, aliases, saved locations, scan history, review decisions, broker evidence, opt-out records, verification rows, and app settings are stored locally.
- Profile data is stored in an encrypted local profile store. Scan history, monitoring rows, evidence screenshots, and raw local debug logs are local files and should still be protected by your computer's disk encryption.
- Infobreaker does not upload your profile, broker results, screenshots, receipts, or local database to Tacita Labs.
{{% /card %}}

## When information leaves your device

{{% card %}}
- When you run a broker scan, your computer contacts the broker sites selected for that scan.
- When you submit or preview a broker removal request, your computer sends the fields required by that broker's own opt-out flow. This is the same category of information you would send if you completed that broker's form manually.
- Some broker flows require a visible browser, CAPTCHA, email confirmation, phone code, or final click. Infobreaker shows those steps rather than hiding or silently automating them.
{{% /card %}}

## Update checks

Infobreaker checks `tacitalabs.com` for app and broker-automation updates. These checks send version and update metadata so the app can tell whether a newer signed build or broker automation bundle is available. They do not send your profile or broker results.

## Support reports

Support reports are optional. If you choose to create one, Infobreaker makes a redacted copy for you to review before sending. The report is designed to remove or mask obvious profile details such as names, email addresses, phone numbers, street addresses, ZIP codes, and other personal values.

You should still review anything before sending it. Raw debug folders may contain personal information and should not be sent unless Tacita Labs asks for them for a specific issue.

Beta reports and privacy questions: [infobreaker@tacitalabs.com](mailto:infobreaker@tacitalabs.com)
