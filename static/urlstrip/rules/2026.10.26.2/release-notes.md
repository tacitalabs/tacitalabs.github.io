# URLStrip Beta rules 2026.10.26.2

- Remove the `s` share-attribution query key from exact `x.com` status links and the existing `/video/1` status variant.
- Preserve functional and unknown query parameters, their source order and untouched raw encoding, bare tokens, literal plus signs, and fragments.
- Reject alternate and lookalike hosts, credential tricks, non-HTTPS links, trailing-slash forms, other status suffixes, oversized status identifiers, and similarly named parameters.
- Supersede Beta `2026.10.11.1`; leave Stable `2026.10.11.1` unchanged.
