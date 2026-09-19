# Nitter completion candidate

Scope: the checked-in 2026-09-19 completion contract. Local candidates only.

## Implemented

- Explicit off-by-default Nitter settings, stable instance IDs, separate deterministic automatic-mode opt-in, eligibility and fallback status.
- Shared verified catalog storage and user settings across Apple app/share/Safari surfaces; equivalent Rust/Windows settings, routing, update controls and CLI configuration.
- Fixed-host HTTPS updater with explicit check/install, bundled public trust, bounded assets, canonical manifests, hashes/byte counts, rollback/freshness checks and atomic installation.
- Immutable schema-2 service destinations: a signed update cannot silently reassign an explicitly chosen operator ID, including through a paused/shape-empty intermediate version.
- Native-authorized Safari link rewriting and navigation, with no cached Nitter trust, fresh handoff checks, frame/referrer/escape/loop guards, and bounded native-verification time.
- Exact signed production endpoint candidate, unpublished. Production payload, signature and keyset bytes preserved.
- Operator procedure in NITTER-CATALOG-OPERATIONS.md.

## Evidence

Ignored artifacts/nitter-completion-20260919/ contains exact commands and exit codes in verification.json, RED/GREEN logs, native xcresult/build evidence, source/test SHA-256 inventories, result.json, scope checks, and review receipts. The iOS evidence directory also holds the independent review and original-checkout audit.

Behavioral RED evidence covers eligibility, explicit selection, Rust eligibility, normalized hostile sources, staging symlink safety, signed operator-ID reassignment, source-host case parity, Safari top-level handoff, frame/return guards and delayed native verification. Updater API tests were written before those APIs existed and initially failed compilation; later parser, signature, storage and interruption assertions passed. Additional adversarial and parity coverage expanded the tests after the first implementation.

Verification includes Swift/core/catalog suites on both candidates, Safari/Node suites, offline Rust library and CLI tests, GUI settings-model tests, signing-disabled iOS simulator tests/build, unsigned macOS Release build, website/Hugo tests, exact source/fixture/generated-adapter parity, unchanged production trust bytes, no-remotes and original-checkout checks.

Earlier failed logs are retained, not erased. The final gate mapping in verification.json identifies their passing replacements.

## Not claimed

Physical-device/VoiceOver interaction, native Windows GUI or Windows-specific atomic-replace execution, signed Apple app-group provisioning, signing/notarization, TestFlight/App Store, publication, live endpoint/service availability. Those remain authoritative release gates. No private production key was accessed, and nothing was pushed, merged, published or released.

Review is source-bound automated independent review plus implementer adjudication and executable adversarial tests, not an external human security audit.
