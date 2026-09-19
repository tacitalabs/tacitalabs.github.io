# URLStrip Nitter release contract

Date: 2026-09-19
Authorization: Jim explicitly wrote “I authorize release” in the private release conversation after reviewing the completed candidate report.

## Outcome

Release the exact reviewed Nitter candidate across its required delivery surfaces:

1. Publish and live-verify the immutable signed Privacy Services catalog endpoint.
2. Integrate and push the exact reviewed source plus release-only identity/evidence commits to the canonical iOS and desktop repositories without rewriting unrelated history.
3. Upload URLStrip iOS 1.3.1 Build 42 to TestFlight and prove App Store Connect acceptance/processing status.
4. Build, sign, notarize, and publish URLStrip desktop 1.3.1 Build 23 for macOS and Windows only after native/signing gates pass; update normal website downloads, versioned manifests/checksums/release notes, and the desktop updater feed truthfully.
5. Preserve evidence and report remaining physical-device, tester-selectability, or platform gates accurately.

This authorization does not include public App Store submission, App Review submission, App Store phased release, external TestFlight group/public-link changes, broad marketing announcements, production signing-key rotation/export, deleting older releases, or unrelated cleanup.

## Repositories and reviewed baselines

Run root: `/Volumes/TacitaFast/OpenClaw-Fast/urlstrip-nitter-release-20260919`

- iOS reviewed feature baseline: `85da17e3a07e49038fe529821abdbc039b3cd261`
- desktop reviewed feature baseline: `6d9d5c175fd4154cf146039aaaf039bfbd5e6951`
- website reviewed endpoint baseline: `ebcb1a503f3403e12ca909cc1c3153668ea3417e`

The release contract commit in each repository becomes the release execution baseline. Source behavior changes after the reviewed commits are forbidden unless required to repair a release-gate defect. Any repair requires focused RED/GREEN evidence, cumulative reruns, fresh review of the exact changed source/test tree, and a logical commit before release continues.

## Canonical desktop history adjudication

The first release attempt proved canonical desktop `main` at `04218eed3c85cbc3667d78a5b5c60d45e7eeaea5` diverges from the reviewed candidate at common ancestor `5a2043cd344d8d324d451d7c238940e3277fc54d`. This is not an unrelated-work conflict: main commit `55c8750` is patch-identical to candidate commit `4ce20fc`; main commit `04218ee` changes only four September 14 rule-promotion evidence files.

A provenance-preserving two-parent merge is now authorized on the isolated desktop release branch. Preserve the reviewed candidate source tree, take the four rule-promotion evidence files from canonical main, record both parents without force-push, rerun the complete desktop verification matrix, and obtain fresh exact-tree review before updating canonical main. If any other path changes, conflict cannot be resolved mechanically, or the reviewed behavior/tree changes outside those four evidence files plus release identity/evidence, stop under history blocker 2.

## Release identities

- iOS: marketing version `1.3.1`, build `42`, all app and extension targets aligned.
- macOS: marketing version `1.3.1`, build `23`, all app/CLI/extension identities aligned where applicable.
- Windows: product version `1.3.1`, build `23`, app/CLI/installer aligned.
- Catalog endpoint: schema/version `2` exact payload/signature/public-key hashes from the reviewed candidate. Publish immutable versioned assets first and the current pointer last.

If App Store Connect proves Build 42 is already used or the 1.3.1 train is closed, follow the TestFlight skill’s bounded next-build/next-patch recovery, record the evidence, and rebuild from a fresh committed identity. Do not relabel an existing archive.

## Required sequence and gates

### A. Provenance and capability

- Read current repository release runbooks and the TestFlight release skill.
- Verify candidate commits, trees, clean state, review receipts, required test logs, production trust hashes, canonical repository ancestry, Git identities, Apple/Xcode signing identities/team/account readiness, 1Password-backed build-secret helper, notarization profile, Windows signing configuration, Windows QA availability, Hugo toolchain, and current live download/update metadata.
- Confirm the canonical source repositories can fast-forward or receive a provenance-preserving release branch. Never force-push or overwrite unrelated history.

### B. Catalog endpoint publication

- Add only the canonical website remote after provenance checks.
- Run endpoint tests and Hugo build from the release source.
- Commit any release-only website metadata needed for the endpoint.
- Push the reviewed website release to canonical `main` only if it is a clean fast-forward from the fetched remote baseline.
- Wait for and verify the actual deployment workflow. Fetch live current/versioned payload/signature bytes and prove hashes, byte counts, MIME/HTTPS behavior, and detached-signature verification against the bundled public keyset.
- If publication or live verification fails, stop before uploading binaries that depend on the endpoint unless the binaries retain a complete bundled fallback and the failure is corrected within the allowed repair count.

### C. iOS TestFlight

- Add the canonical iOS remote only after ancestry proof. Fetch and push a provenance-preserving release branch; update canonical main only by clean fast-forward if policy and history allow.
- Set 1.3.1 Build 42 in source-of-truth project configuration for every app/extension target, regenerate, verify, and commit before archive.
- Record the exact reviewed feature and release-identity commits as ancestors of the archive source.
- Run cumulative Swift/core/catalog/Node tests and a signing-disabled simulator test/build with package updates disabled.
- Create a signed Release archive for generic iOS with Xcode-managed provisioning. Verify app path, strict codesign, bundle/team/version/build, and every embedded extension build.
- Upload through Xcode’s authenticated App Store Connect session using an explicit export-options plist that preserves the committed build number.
- Require zero exit plus `Upload succeeded`, uploaded app name, and `EXPORT SUCCEEDED`. Report “uploaded and processing” until processing/selectability is independently proven.
- Do not submit to App Review or change tester groups/public links.

### D. macOS and Windows desktop release

- Add/fetch the canonical desktop remote only after ancestry proof. Push a provenance-preserving release branch; update canonical main only by clean fast-forward if policy/history allow.
- Set macOS and Windows release identity to 1.3.1 Build 23 everywhere, regenerate, verify, and commit.
- Re-run cumulative Swift/core/catalog/Node tests, offline Rust library/CLI tests, Windows settings tests, and unsigned macOS Release build.
- Produce universal macOS app/CLI/Safari artifacts, sign with the existing Developer ID identities, strict-verify nested code, notarize, staple, and Gatekeeper-verify both app and final DMG.
- Produce the Windows x64 installer from the exact release source, sign app/CLI/installer with the existing Azure Trusted Signing workflow, and verify hashes/signatures.
- Use the dedicated Windows QA lane for native installer/application smoke, Authenticode verification, version/build identity, settings visibility, catalog update check/install against the live endpoint, explicit `nitter.click` selection, automatic-mode opt-in behavior, X/Twitter status/profile rewrite, disabled/ineligible fail-closed behavior, and uninstall/upgrade sanity. Do not claim native acceptance from macOS cross-tests.
- Publish versioned macOS/Windows artifacts, manifests, checksums, release notes, normal download links, and a truthful unified desktop updater identity only after both platform artifacts pass. Deploy and live-verify exact hashes, sizes, HTTPS downloads, page labels, manifests, and update JSON.

### E. Final source/evidence

- Record upload/publication workflow URLs or IDs, live hashes, signing/notarization receipts, native Windows results, TestFlight receipt lines, source commits/trees, and known remaining gates.
- Commit release evidence in the release repositories and push provenance-preserving evidence commits when appropriate.
- Leave release repositories clean. Preserve prior public artifacts and original canonical working checkouts unless the release process intentionally fast-forwards them after cleanliness proof.

## Forbidden actions

- No force-push, history rewrite, unrelated cleanup, secret printing/export, signing-key rotation, public App Store/App Review submission, external tester changes, public TestFlight link changes, broad announcement, or deletion of old artifacts.
- No silent downgrade or update-feed lie. Do not publish one platform while claiming another platform/version is current unless metadata is platform-specific and truthful.
- No release claim from a queued/running upload, unsigned artifact, unverified live page, or non-native Windows simulation.
- Do not bypass failed signing, notarization, signature, catalog, provenance, physical-device, or native-platform checks.

## Evidence and status

Store release evidence under ignored `artifacts/nitter-release-20260919/` directories in each release repository and under an external archive root selected by the run. Keep exact commands/logs, hashes, workflow IDs, source manifests, receipts, and limitations. No secrets in logs.

Maintain:

- `/Users/prime/.openclaw/workspace/artifacts/promised/urlstrip-nitter-release-20260919/status.json`
- `/Users/prime/.openclaw/workspace/artifacts/promised/urlstrip-nitter-release-20260919/final.md`

## Stop conditions

Stop only when:

1. A required signing/account/provisioning credential is unavailable or authentication fails.
2. Canonical history cannot be integrated without force-push or overwriting unrelated work.
3. A reviewed-candidate repair exceeds two bounded source repair cycles or fails fresh review.
4. Apple/Windows/native/deployment infrastructure remains unavailable after one bounded retry and exact evidence is recorded.
5. A release gate reveals a user-visible or trust-boundary product decision not resolved by this contract.
6. Three release/resume attempts or ten wall-clock hours are exhausted.

Ordinary build/test failures, recoverable deployment errors, duplicate build numbers with the skill-defined recovery, or progress summaries are not terminal blockers.

## Completion markers

`RELEASE_COMPLETE: <ios-release-commit> <desktop-release-commit> <site-release-commit> <TestFlight-build> <macOS-artifact-hash> <Windows-artifact-hash>`

or

`GENUINE_BLOCKER: <listed stop condition> <evidence path>`

A completion marker requires successful visible delivery back to the originating Discord channel. A progress-only exit is never completion.
