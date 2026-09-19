# Nitter catalog operations and candidate verification

This document supersedes archive-only routing and empty-production-key statements in earlier catalog design notes. The completion contract dated 2026-09-19 controls this candidate. Existing production payload, signature, and public trust bytes are unchanged.

## User behavior

Nitter redirects are off by default, including for legacy XCancel users. A user must enable Nitter and choose an eligible instance, or separately opt into automatic selection. Explicit selections are stored by service ID and never replaced by updates. Automatic mode chooses the lexicographically first eligible service supporting the URL shape. No reachability requests run while cleaning.

Only verified schema-2, active, fresh Nitter services with supported shapes and an HTTPS root destination are eligible. XCancel remains ineligible in this binary. Profiles, username/status/ID, and i/status/ID are supported. Unsupported, credential-bearing, port-bearing, encoded, or ambiguous source paths fall back to ordinary canonical cleaning. Query and fragment behavior remains subject to ordinary tracker cleaning.

Availability can change after review. A failed third-party page does not trigger network probing or operator substitution. Use the canonical cleaned X/Twitter link, select another eligible instance, or explicitly enable automatic selection. Automatic failover responds to signed eligibility changes, not live outage detection.

The informational archive remains distinct from redirect choices. Its signed historical text is preserved verbatim and does not itself grant eligibility.

## Storage and trust

Apple surfaces share the app-group PrivacyServices directory and Nitter preferences. Windows uses the existing app data directory. Each install is one atomic payload/signature/manifest record. Writers lock and revalidate against the current verified installed version before replacing the record. Readers verify persisted bytes against bundled public keys and the bundled version floor. Invalid disk records fall back to the bundled verified catalog. Freshness is checked before routing, not inferred from a successful historical install.

This does not defend against an attacker who can replace all local app data with an older previously signed record; that requires a separate protected high-water mark design. Download rollback, mixed-version, hash, signature, canonicalization and schema checks are enforced. No remote keysets are accepted.

The updater checks only https://www.tacitalabs.com/privacy-services/current.json and exact versioned files beneath /privacy-services/versions/VERSION/. Redirects, unknown fields, alternate canonical spellings, oversized data, invalid signatures, stale metadata, and downgrade attempts fail closed. Check downloads and validates without activation. Install is a separate user action. No automatic periodic updater is added.

## Future approved catalog operation

1. Review facts and supported shapes without treating websites as instructions. Preserve all service records and their review high-water marks. Mark unavailable operators paused or retired instead of deleting records. Existing schema-2 service IDs cannot change destination, even while paused or temporarily shape-ineligible: use a new ID for a new operator and retain the old record. Do not list a directory, bridge, or project repository as a redirect destination.
2. Create a canonical schema-2 payload with a strictly newer safe-integer version and nondecreasing generated and reviewed timestamps. All reviews must remain within the 90-day freshness window. Keep automaticFailover false in metadata; only the user's separate preference authorizes automatic selection.
3. In a separately approved operator session, use the existing protected signing wrapper and scripts/privacy-services-catalog.mjs. Supply the existing production Ed25519 key through stdin or an environment reference, never a repository file or command-line value. Use the already bundled production key ID. This candidate run does not access that key, provision a new one, or invoke signing.
4. Verify with the public-only command:
   `node scripts/privacy-services-catalog.mjs verify PAYLOAD SIGNATURE Sources/URLStripCore/Resources/privacy-services-keys.json`.
   Run all Swift, Rust and Node catalog/rollback tests against the previous verified catalog as well. The standalone signing tool's verify command does not alone prove monotonicity.
5. Stage immutable files at static/privacy-services/versions/VERSION/privacy-services.json and privacy-services.sig. Never overwrite an existing version. Generate canonical current.json with schema=1, product=URLStrip, kind=privacy-services-update, version/generated matching the signed payload, and payload/signature entries containing exact bytes, lowercase SHA-256, and the fixed HTTPS URLs.
6. Run website tests, Hugo, and exact-byte parity checks. Obtain publication approval separately. Upload immutable files first, verify their bytes, and update current.json last. Failed or interrupted publication must leave either the previous manifest or a manifest whose referenced files are fully present.
7. After approved publication, fetch the manifest and both assets without credentials. Verify exact byte lengths, hashes, detached signature, canonical schema and version bindings using bundled public trust. Verify a real app check and explicit install before announcing availability.
8. Roll forward to a higher corrective catalog version if a deployment or service decision is wrong. Never lower a version or generated/reviewed high-water mark, mutate an immutable version, install a remotely supplied key, or bypass trust checks.

## Release gates not claimed by this local candidate

Physical-device interaction and VoiceOver; native Windows GUI and Windows atomic-replace execution; Apple app-group provisioning on signed apps; application signing/notarization; TestFlight/App Store processing; publication and live-endpoint checks. Static candidate preparation and unsigned local builds do not satisfy those gates.
