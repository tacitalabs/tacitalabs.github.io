# URLStrip Beta rules 2026.10.08.2

- Remove `exln` only on parsed `instagram.com` hosts, including the reported Post share URL, while preserving `img_index`, unknown parameters, raw encoding, ordering, and fragments.
- Reject Instagram lookalikes, deceptive credential authorities, and unrelated hosts so `exln` remains untouched outside the existing Instagram-scoped supplementary provider.
- Preserve the complete Beta `2026.10.08.1` rule set, including Instagram `xtok`, and leave Stable `2026.09.21.1` unchanged.
- Treat `exln` semantics as undocumented share attribution but removability as high confidence: the reported, stripped, and arbitrary-token URLs resolve to the same canonical Instagram post.
