# URLStrip Beta rules 2026.10.29.1

- Remove the optional `a` query key only on exact HTTPS `x.com` ordinary numeric-status links, excluding `/i/status`, trailing slashes and status suffixes.
- Preserve other query state, duplicate order, raw percent escapes, literal plus signs, bare tokens and fragments; clean the original URL before an optional privacy redirect.
- Retain the published `2026.10.26.2` status/video `s` behavior. Public regression examples are synthetic.
- The sampled post text was unchanged without `a`; its attribution purpose and direct TwitterViewer removability remain unestablished. No rule is added for TwitterViewer or alternate hosts.
- Publish to Beta only. Stable remains `2026.10.26.2`; no app or engine release.
