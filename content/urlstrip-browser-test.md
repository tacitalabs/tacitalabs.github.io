---
title: "URLStrip Browser Extension Test Links - Tacita Labs"
description: "Unlinked URLStrip browser extension test page with tracking-parameter links and privacy redirect targets."
url: "/urlstrip-browser-test.html"
noindex: true
toc: true
---

{{< eyebrow >}}URLStrip Test Page{{< /eyebrow >}}

# Browser extension test links

This unlinked page is intentionally full of messy links for testing the URLStrip Safari/browser extension. It is not part of the public navigation.

Use it to verify:

- common tracking parameters are removed after navigation
- functional parameters are preserved
- X/Twitter links are rewritten when Privacy Redirects are enabled
- Reddit links are rewritten when Reddit Privacy Redirects are enabled

## Basic campaign and click IDs

- [Example article with UTM tags](https://example.com/article?utm_source=newsletter&utm_medium=email&utm_campaign=urlstrip-test&utm_content=hero-button&utm_term=privacy&page=1)
- [EFF privacy page with Facebook and Google click IDs](https://www.eff.org/issues/privacy?fbclid=IwAR-test-value&gclid=CjwKCA-test-value&msclkid=ms-test-123&source=homepage)
- [Mozilla page with TikTok and Twitter click IDs](https://www.mozilla.org/en-US/firefox/new/?ttclid=tt-test-123&twclid=tw-test-456&utm_source=social&utm_campaign=browser-test)
- [Example shop link with mixed parameters](https://example.com/shop/product?sku=abc123&utm_source=ad&utm_medium=cpc&gclid=test-google-click&color=black&size=large)
- [Example documentation link with analytics junk](https://example.com/docs/getting-started?utm_id=campaign-42&utm_source_platform=ios&utm_creative_format=card&utm_marketing_tactic=retargeting&section=install)

## Email and marketing platforms

- [Mailchimp-style campaign link](https://example.com/newsletter/story?mc_cid=abc123def&mc_eid=999888777&utm_source=mailchimp&utm_medium=email&id=42)
- [HubSpot-style email link](https://example.com/demo?hsCtaTracking=cta-123%7Ccampaign-456&_hsenc=p2ANqtz-test&_hsmi=123456789&demo=true)
- [Salesforce-style marketing link](https://example.com/webinar?utm_source=salesforce&utm_medium=email&sfmc_id=contact-123&j=98765&sfmc_sub=111222&session=morning)
- [Eloqua-style landing page link](https://example.com/whitepaper?elqTrackId=abc123&elqTrack=true&elqaid=42&elqat=2&download=privacy-guide)
- [Blueshift-style link](https://example.com/promo?bsft_clkid=click-123&bsft_uid=user-456&bsft_mid=message-789&offer=local-first)

## Affiliate and commerce-style links

- [Amazon product-style URL with preserved fields](https://www.amazon.com/dp/B08TEST123?tag=affiliate-20&ascsubtag=test-subtag&th=1&psc=1&ref_=as_li_ss_tl)
- [Example affiliate landing page](https://example.com/deal?irclickid=impact-test-123&irgwc=1&utm_source=impact&utm_campaign=affiliate&coupon=SAVE10)
- [ShareASale-style link](https://example.com/product?sscid=51k9_test_value&utm_source=shareasale&variant=blue)
- [Awin-style link](https://example.com/store/item?awc=12345_9876543210_test&utm_medium=affiliate&item=boots)
- [CJ-style link](https://example.com/buy?cjevent=deadbeefcafetest&utm_campaign=partner&product=jeans)

## Social and newsletter links

- [Substack post with subscriber/referral parameters](https://example.substack.com/p/urlstrip-test?publication_id=123456&isFreemail=true&r=6q25e&triedRedirect=true&post_id=987654)
- [YouTube video with share tracking](https://www.youtube.com/watch?v=dQw4w9WgXcQ&si=testShareToken&utm_source=share)
- [Instagram-style URL](https://www.instagram.com/p/Ctestvalue/?igshid=testigshare&utm_source=ig_web_copy_link)
- [LinkedIn article with tracking](https://www.linkedin.com/pulse/example-privacy-post/?trackingId=testTrackingId&utm_source=share&utm_medium=member_desktop)
- [Facebook post URL with share junk](https://www.facebook.com/example/posts/123456789?__cft__[0]=test&__tn__=%2CO%2CP-R&fbclid=facebook-click-test)

## Redirect wrapper candidates

- [Google redirect wrapper](https://www.google.com/url?sa=t&url=https%3A%2F%2Fexample.com%2Fclean-destination%3Futm_source%3Dgoogle%26fbclid%3Dwrapped-click&usg=AOvVaw-test)
- [DuckDuckGo redirect-style URL](https://duckduckgo.com/l/?uddg=https%3A%2F%2Fexample.com%2Fduck-target%3Futm_source%3Dduck%26gclid%3Dwrapped-google&rut=test-rut)
- [Twitter redirect wrapper](https://t.co/testRedirect?url=https%3A%2F%2Fexample.com%2Ftwitter-target%3Futm_source%3Dx%26twclid%3Dwrapped-twclid)

## X/Twitter privacy redirect targets

These should open through the configured X/Twitter privacy frontend when that rule is enabled.

- [x.com root profile-style URL](https://x.com/TacitaLabs?utm_source=urlstrip-test&twclid=twclid-test-001)
- [x.com status-style URL](https://x.com/TacitaLabs/status/1780000000000000000?utm_source=share&utm_medium=web&twclid=twclid-test-002)
- [twitter.com profile-style URL](https://twitter.com/TacitaLabs?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor&utm_campaign=test)
- [mobile.twitter.com status-style URL](https://mobile.twitter.com/TacitaLabs/status/1780000000000000001?s=20&t=testShareToken&utm_source=share)
- [x.com search URL](https://x.com/search?q=privacy%20tools&src=typed_query&f=live&utm_source=test)

## Reddit privacy redirect targets

These should open through the configured Reddit privacy frontend when that rule is enabled.

- [reddit.com r/privacy](https://www.reddit.com/r/privacy/?utm_source=share&utm_medium=web3x&rdt=12345)
- [old.reddit.com r/privacy](https://old.reddit.com/r/privacy/comments/1abcde/test_thread/?utm_source=share&utm_medium=ios_app&utm_name=ioscss)
- [reddit.com comments URL](https://www.reddit.com/r/technology/comments/1abcdef/example_test_thread/?share_id=test-share-id&utm_content=1&utm_medium=android_app&utm_name=androidcss&utm_source=share)
- [m.reddit.com URL](https://m.reddit.com/r/privacy/comments/1abcdf/mobile_test/?utm_source=share&utm_medium=mweb3x)
- [np.reddit.com URL](https://np.reddit.com/r/privacy/comments/1abcdg/no_participation_test/?utm_source=share&utm_campaign=test)

## URLs that should mostly stay intact

These are useful for catching over-aggressive cleaning.

- [Example page with functional query parameters](https://example.com/search?q=privacy+tools&page=2&sort=recent)
- [Map-style query that should keep destination state](https://example.com/maps?lat=12.3456&lon=65.4321&zoom=12&layer=traffic)
- [Documentation anchor and version parameter](https://example.com/docs/install?version=1.0.2#browser-extension)
- [Search result with a safe-looking ref value](https://example.com/library?ref=chapter-2&book=privacy-by-design)
- [Local-first product filter](https://example.com/products?category=privacy&platform=ios&free=true)

## Copy-paste samples

```text
https://example.com/article?utm_source=newsletter&utm_medium=email&utm_campaign=urlstrip-test&fbclid=fb-test&page=1
https://x.com/TacitaLabs/status/1780000000000000000?utm_source=share&twclid=twclid-test
https://www.reddit.com/r/privacy/?utm_source=share&utm_medium=web3x&rdt=12345
https://www.google.com/url?sa=t&url=https%3A%2F%2Fexample.com%2Fwrapped%3Futm_source%3Dgoogle%26gclid%3Dabc&usg=test
```
