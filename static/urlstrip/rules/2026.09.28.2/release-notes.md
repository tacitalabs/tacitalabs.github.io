# URLStrip Rules 2026.09.28.2

- Remove `CMP` case-insensitively only on `theguardian.com` and `www.theguardian.com`, rejecting subdomains, lookalikes, unrelated hosts, and deceptive credential authorities.
- Remove `smid` case-insensitively only on `nytimes.com` and `www.nytimes.com` while preserving subscriber access codes, gift-link state, unknown parameters, duplicates, raw percent encoding, plus characters, ordering, and fragments byte-for-byte.
- Add exact case-insensitive coverage for `utm_source_platform`, `utm_creative_format`, `utm_marketing_tactic`, `gad_campaignid`, `srsltid`, `ttclid`, `li_fat_id`, `sccid`, `rdt_cid`, `ef_id`, `s_kwcid`, and `__hsfp` without broadening to lookalike names such as `ttclid_extra` or `my_srsltid`.
- Reconfirm Instagram and Threads cleanup for `stkn`, `igsi`, `igsh`, `igshid`, and `ig_rid` while retaining `img_index`.
- Preserve existing YouTube and YouTube Music cleanup for `si` and `is`, including `youtu.be`, while retaining functional video, playlist, radio, timestamp, unknown-query, encoding, and fragment state.
- Supersede unpublished candidate `2026.09.28.1`, which unintentionally narrowed `is` cleanup to YouTube Music.
- Keep Stable unchanged. URL transformation and cross-engine parity were verified deterministically; live Guardian, NYT, Meta, and YouTube destination or playback access was not tested.
