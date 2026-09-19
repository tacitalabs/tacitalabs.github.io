# URLStrip Nitter completion contract

Date: 2026-09-19
Status: implementation contract

## Observable outcome

Produce a reviewed, locally committed candidate that finishes the previously partial Privacy Services work. URLStrip must let a user explicitly opt into redirecting supported public X/Twitter URLs through a verified active Nitter instance, obtain signed catalog updates through a rule-update-like flow, preserve safe fallback behavior when an instance is unavailable or becomes ineligible, and expose equivalent behavior across the iOS app/share/Safari surfaces and the maintained desktop macOS/Windows surfaces.

This run produces candidates only. It does not publish the website endpoint, push branches, upload TestFlight/App Store artifacts, sign/notarize applications, release binaries, or announce externally.

## Repositories and baselines

The run root is `/Volumes/TacitaFast/OpenClaw-Fast/urlstrip-nitter-complete-20260919`.

- iOS repository: `ios`, baseline `16a69cb336e90058325a4ee02f771b62a4fdb06e`, branch `feat/nitter-catalog-routing-20260919`.
- Desktop repository: `desktop`, baseline `4d2e7f743c13232ec9e20d8e3df6d31f87c05f9c`, branch `feat/nitter-catalog-routing-20260919`.
- Website repository: `site`, baseline `8fe9998e8bb97ebac7e41414b53c1950468223bd`, branch `feat/nitter-catalog-endpoint-20260919`.
- All three repositories must remain without remotes.
- The original source checkouts must remain untouched.

The contract commit in each repository is the execution baseline. Implementation requires one or more logical commits after that contract commit.

## Acceptance criteria

### 1. Signed remote catalog update path

- Add a bounded Privacy Services updater modeled on the existing rules updater where appropriate.
- Use a fixed HTTPS Tacita Labs endpoint candidate under the website repository. Prepare immutable versioned payload/signature files plus a small current manifest that binds version, byte counts, SHA-256 hashes, and URLs.
- Trust only public keys bundled in the app. Never trust or install a remotely supplied keyset.
- Verify detached signatures, canonical encoding, schema, product/kind, service constraints, monotonic version/generated values, rollback protection, hashes, byte limits, HTTPS, exact allowed Tacita Labs host/path, and atomic install before activation.
- Missing, stale, mixed, malformed, oversized, hash-mismatched, untrusted, unknown-key, downgraded, or invalid data must fail closed and preserve the last verified installed catalog or bundled verified fallback.
- Mirror the existing rule-update user model: explicit check and explicit install, visible status/version/date, and no cleaning-path network call.
- Store installed catalog state where app/share/Safari processes can read it safely. Do not add periodic service probes or send cleaned URLs to Tacita Labs.

### 2. Explicit Nitter settings and routing

- Restore a clearly labeled, off-by-default Nitter redirect setting. Do not label the feature as XCancel when routing can use another Nitter operator.
- Show only cryptographically verified, schema-valid, active Nitter-family services that declare supported URL shapes. `nitter.click` from the current signed production catalog is expected to be eligible for profile and status paths. XCancel remains paused and ineligible.
- Let the user choose a specific eligible instance. A catalog update must never silently switch that explicit choice to another operator.
- Offer automatic instance selection/failover only behind a separate explicit opt-in. In automatic mode selection must be deterministic, limited to eligible verified Nitter services, and visible to the user.
- If an explicitly selected service becomes paused, retired, missing, invalid, or shape-incompatible, stop redirecting and preserve canonical cleaned X/Twitter output with a clear settings status. Do not silently choose another operator.
- Preserve local rewriting and exact supported path/query/fragment behavior. Cover public profile and `/status/ID` plus `/i/status/ID` paths. Private/login-only behavior is not promised.
- Prevent redirect loops and never rewrite credentials, non-HTTPS destinations, lookalike hosts, unsupported paths, or non-X/Twitter source hosts.
- Keep ordinary tracker cleaning available when redirecting is disabled or ineligible.

### 3. Surface parity

- iOS app, share surface, and Safari extension use the same verified installed catalog and user selection semantics through the app group.
- macOS app/CLI/core and Safari extension use equivalent semantics and persisted settings. Windows GUI/core receives equivalent settings/routing behavior where the repository supports it.
- Do not maintain divergent hard-coded operator lists across surfaces. Generate adapters/resources when necessary and prove parity.
- Keep the informational Privacy Services archive, but distinguish informational records from redirect-eligible choices.
- UI controls require useful VoiceOver/accessibility labels, hints, disabled explanations, and status text.

### 4. Website candidate and operating procedure

- Prepare, but do not publish, the static endpoint candidate from the exact reviewed signed production catalog already in the source trees.
- Add concise operator documentation for creating a future catalog version, signing it with the existing protected workflow, validating it, staging immutable files, updating the current manifest last, rolling back by publishing a newer corrective version rather than lowering version numbers, and verifying live bytes after an approved publication.
- Do not access, export, print, rotate, or regenerate the production private signing key in this run.

## TDD and hostile cases

Write failing tests before implementation for each behavior class. Include at least:

- explicit selected active instance succeeds;
- explicit selected paused/retired/missing instance fails closed without substitution;
- automatic mode can deterministically move to another eligible instance only when explicitly enabled;
- unsupported shape and lookalike/source/destination hosts fail closed;
- signature, unknown key, canonicalization, hash, byte-count, rollback, mixed-version, malformed manifest, HTTPS/host/path, and interrupted atomic-install failures;
- app-group/defaults migration from legacy XCancel preferences is conservative and does not unexpectedly enable Nitter;
- app/share/Safari and desktop/Windows adapter parity;
- structurally different adversarial variants for parser and trust-boundary fixes.

Do not add tests that merely mirror implementation details without independent evidence.

## Required verification

The implementer must discover and record exact commands in `artifacts/nitter-completion-20260919/verification.json`. At minimum run:

- focused updater/catalog/routing/UI-model tests in iOS and desktop;
- cumulative Swift/core/catalog suites in both repositories;
- iOS and macOS Safari Node suites;
- Rust Windows library and CLI tests offline;
- iOS simulator tests/build with signing disabled and package updates disabled;
- unsigned macOS Release build with signing disabled;
- website/Hugo tests that cover the static endpoint and manifest;
- exact iOS/desktop catalog and generated-adapter parity checks;
- `git diff --check`, clean tracked status, branch/baseline/remotes checks in all repositories.

Tests that genuinely require a physical device, native Windows GUI, application signing/notarization, TestFlight, or live publication remain authoritative release gates and must be reported as pending, not simulated or claimed.

## Evidence

Create task evidence under each repository's ignored `artifacts/nitter-completion-20260919/` directory. Preserve focused/cumulative logs, source and test tree hashes, exact commands, and a concise result manifest. Bind review to source/test tree hashes so evidence-only commits do not invalidate code review.

Maintain run-level atomic status at:

- `/Users/prime/.openclaw/workspace/artifacts/promised/urlstrip-nitter-complete-20260919/status.json`
- `/Users/prime/.openclaw/workspace/artifacts/promised/urlstrip-nitter-complete-20260919/final.md`

No secrets may appear in source, tests, logs, status, or evidence.

## Forbidden actions

- No remote configuration, push, merge into original checkouts, publication, release, TestFlight/App Store upload, app signing/notarization, public announcement, production-key access, broad host permission change, or destructive cleanup.
- Do not modify original source checkouts.
- Do not weaken signature, key-ID, rollback, canonicalization, host/path, or service eligibility checks to make tests pass.
- Do not silently enable Nitter for legacy users.
- Do not use live service reachability as a cleaning-path dependency or claim current service availability from offline tests.

## Stop conditions

Stop only for one of these conditions:

1. A required baseline is missing/corrupt or repository identity cannot be proven.
2. The implementation requires production private-key access, publication, signing, or another forbidden external action to proceed.
3. A required platform gate cannot run because the platform/toolchain is unavailable after documenting the exact missing dependency. Continue all other independent work first.
4. A real product decision not resolved by this contract would materially change stored user data, operator selection, or trust boundaries.
5. Four implementation/resume attempts or eight wall-clock hours are exhausted without a verified candidate.

Ordinary compile errors, test failures, merge conflicts inside the isolated clones, context compression, partial progress, dirty state, or remaining in-scope work are not blockers.

## Completion markers

Emit exactly one terminal marker in the final response and run-level final file:

`CANDIDATE_COMPLETE: <ios-commit> <desktop-commit> <site-commit> Nitter settings, signed catalog updates, and fail-closed routing verified`

or

`GENUINE_BLOCKER: <listed stop condition> <evidence path>`

A marker is only a signal. Independent inspection and fresh review are still required before accepting the candidate.
