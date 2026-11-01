# URLStrip Beta rules 2026.10.08.1

- Remove `xtok` only on parsed `instagram.com` hosts, including the reported Reel share URL, while preserving `img_index`, unknown parameters, duplicate non-tracker values, raw encoding, ordering, and fragments.
- Reject Instagram lookalikes and unrelated hosts so `xtok` remains untouched outside the existing Instagram-scoped supplementary provider.
- Preserve the complete pre-existing Beta `2026.09.28.2` rule set and leave Stable `2026.09.21.1` unchanged.
- Treat `xtok` semantics as undocumented but removability as high confidence: the reported and stripped URLs resolve to the same canonical Instagram Reel, and arbitrary `xtok` values do not change the destination.
