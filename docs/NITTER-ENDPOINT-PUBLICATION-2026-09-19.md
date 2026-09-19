# Signed Privacy Services endpoint publication

Version 2 was published immutable-first on 2026-09-19. Immutable stage source `e446cf6edb558c29b699a1e5577ee4d02ef8ad74` deployed successfully in workflow 35457060845 and Pages workflow 35457072544. Both assets were fetched without redirects and exact bytes/signature verified before publishing current.json.

Pointer source `f42ef59146a7b431c55695b61ecf812dc8d1a0b7`, tree `811d54b6c362ef4f5a22e6f2528d64445fd6a054`, retains both reviewed endpoint and canonical rule-publication histories. The immutable-stage integration changed no tree bytes. Fresh independent delta review passed; all 21 canonical rule paths match canonical main exactly. Endpoint/web/Hugo/guide checks passed.

Final deploy workflow 35457123451 and Pages workflow 35457133805 completed successfully. HTTPS 200 with no redirects and exact local/live byte equality verified:

- current.json: 473 bytes, SHA-256 `4294ef3b2ba6c95b003f8ba49f079704c6cd6345f4b2a699c8ee27aaafec8bd2`, application/json.
- versions/2/privacy-services.json: 4825 bytes, SHA-256 `de4518cce0bad1015ffee99410839808ae9b6ffb3801c92c6d1bf8acae298471`, application/json.
- versions/2/privacy-services.sig: 161 bytes, SHA-256 `3f767b31b8f40eeaa85ff58e02a84531b1498548b5fd29b7ea8b7ee2bdacfc97`, application/pgp-signature as served for the .sig extension. The contents are the existing Ed25519 signature envelope, verified against the bundled production public keyset.

Public URL: https://www.tacitalabs.com/privacy-services/current.json

This is endpoint publication evidence, not desktop binary release, native Windows acceptance, third-party service reachability, or a physical-device claim. No desktop updater/download metadata changed.
