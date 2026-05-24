/*
  URLStrip browser cleaner.

  Runs entirely client-side. It loads the public URLStrip rule bundle and
  applies ClearURLs-compatible rules in the browser. Do not add network calls
  that include a pasted URL or cleaned URL.
*/
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.URLStripWeb = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const MAX_REDIRECT_DEPTH = 5;
  const MAX_INPUT_LENGTH = 16 * 1024;
  const DEFAULT_X_FRONTEND_BASE_URL = 'https://xcancel.com';
  const DEFAULT_REDDIT_FRONTEND_BASE_URL = 'https://redlib.catsarch.com';
  const X_HOSTS = new Set(['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com', 'mobile.twitter.com']);
  const REDDIT_HOSTS = new Set(['reddit.com', 'www.reddit.com', 'old.reddit.com', 'new.reddit.com', 'm.reddit.com', 'np.reddit.com']);

  const CATEGORIES = {
    analytics: 'Analytics',
    socialMedia: 'Social Media',
    advertising: 'Advertising',
    referralMarketing: 'Referral Marketing',
    redirectUnwrapping: 'Redirect Unwrapping',
    ecommerce: 'E-commerce',
    emailMarketing: 'Email Marketing',
  };

  const FALLBACK_PARAMS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic',
    'fbclid', 'gclid', 'gclsrc', 'msclkid', 'ttclid', 'twclid',
    'mc_cid', 'mc_eid', '_hsenc', '_hsmi',
    'yclid', 'igshid', 'si', 'feature', 'pp',
  ];

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function safeDecode(value) {
    try {
      return decodeURIComponent(value);
    } catch (_) {
      return value;
    }
  }

  function compile(pattern, flags = 'i') {
    try {
      return new RegExp(pattern, flags);
    } catch (_) {
      return null;
    }
  }

  function categorizeProvider(name, provider) {
    const lower = String(name || '').toLowerCase();

    if ((provider.redirections || []).length > 0) return CATEGORIES.redirectUnwrapping;
    if (/(amazon|aliexpress|ebay|shopify|etsy|walmart)/.test(lower)) return CATEGORIES.ecommerce;
    if (/(facebook|twitter|instagram|tiktok|linkedin|reddit|youtube|snapchat|pinterest)/.test(lower)) return CATEGORIES.socialMedia;
    if (/(google ad|doubleclick|bing|adform|adservice|criteo)/.test(lower)) return CATEGORIES.advertising;
    if (/(google|analytics|adobe|yandex|matomo|piwik|segment|hotjar|mixpanel)/.test(lower)) return CATEGORIES.analytics;
    if (/(mailchimp|hubspot|sendgrid|constantcontact|campaign)/.test(lower)) return CATEGORIES.emailMarketing;
    if ((provider.referralMarketing || []).length > 0) return CATEGORIES.referralMarketing;

    return CATEGORIES.analytics;
  }

  function categorizeFallbackParam(param) {
    if (param.startsWith('utm_')) return CATEGORIES.analytics;
    if (['fbclid', 'twclid', 'igshid', 'ttclid'].includes(param)) return CATEGORIES.socialMedia;
    if (['gclid', 'gclsrc', 'msclkid'].includes(param)) return CATEGORIES.advertising;
    if (['mc_cid', 'mc_eid', '_hsenc', '_hsmi'].includes(param)) return CATEGORIES.emailMarketing;
    return CATEGORIES.analytics;
  }

  function normalizeProvider(provider) {
    return {
      urlPattern: provider.urlPattern || '',
      completeProvider: Boolean(provider.completeProvider),
      rules: Array.isArray(provider.rules) ? provider.rules : [],
      rawRules: Array.isArray(provider.rawRules) ? provider.rawRules : [],
      referralMarketing: Array.isArray(provider.referralMarketing) ? provider.referralMarketing : [],
      exceptions: Array.isArray(provider.exceptions) ? provider.exceptions : [],
      redirections: Array.isArray(provider.redirections) ? provider.redirections : [],
      forceRedirection: Boolean(provider.forceRedirection),
    };
  }

  function compileProvider(name, rawProvider) {
    const provider = normalizeProvider(rawProvider || {});
    const urlRegex = compile(provider.urlPattern, 'i');
    if (!urlRegex) return null;

    const category = categorizeProvider(name, provider);
    const compiled = {
      name,
      provider,
      category,
      urlRegex,
      exceptionRegexes: provider.exceptions.map((p) => compile(p, 'i')).filter(Boolean),
      paramRegexes: provider.rules.map((p) => ({ regex: compile(`^${p}$`, 'i'), pattern: p })).filter((r) => r.regex),
      referralParamRegexes: provider.referralMarketing.map((p) => ({ regex: compile(`^${p}$`, 'i'), pattern: p })).filter((r) => r.regex),
      rawRuleRegexes: provider.rawRules.map((p) => ({ regex: compile(p, 'gi'), pattern: p })).filter((r) => r.regex),
      redirectionRegexes: provider.redirections.map((p) => ({ regex: compile(p, 'i'), pattern: p })).filter((r) => r.regex),
    };
    return compiled;
  }

  function createEngine(clearURLsData, supplementaryData) {
    const providers = [];
    const skippedProviders = [];

    function append(file) {
      if (!file || !file.providers) return;
      for (const [name, provider] of Object.entries(file.providers)) {
        const compiled = compileProvider(name, provider);
        if (compiled) providers.push(compiled);
        else skippedProviders.push(name);
      }
    }

    append(clearURLsData);
    append(supplementaryData);

    const fallbackRules = [];
    fallbackRules.push({ regex: /^utm_.*$/i, ruleID: `${CATEGORIES.analytics}:utm_*`, category: CATEGORIES.analytics });
    for (const param of FALLBACK_PARAMS) {
      if (param.startsWith('utm_')) continue;
      const category = categorizeFallbackParam(param);
      fallbackRules.push({ regex: new RegExp(`^${escapeRegExp(param)}$`, 'i'), ruleID: `${category}:${param}`, category });
    }

    return { providers, fallbackRules, skippedProviders };
  }

  function isException(urlString, provider) {
    return provider.exceptionRegexes.some((regex) => regex.test(urlString));
  }

  function matchingProviders(engine, urlString) {
    return engine.providers.filter((provider) => provider.urlRegex.test(urlString));
  }

  function extractRedirection(urlString, provider) {
    for (const { regex, pattern } of provider.redirectionRegexes) {
      regex.lastIndex = 0;
      const match = regex.exec(urlString);
      if (match && match[1]) {
        return { destination: safeDecode(match[1]), pattern };
      }
    }
    return null;
  }

  function applyRawRules(urlString, provider) {
    let result = urlString;
    const applied = [];
    for (const { regex, pattern } of provider.rawRuleRegexes) {
      regex.lastIndex = 0;
      const before = result;
      result = result.replace(regex, '');
      if (result !== before) applied.push(pattern);
    }
    return { result, applied };
  }

  function shouldStripParam(name, provider) {
    for (const { regex, pattern } of provider.paramRegexes) {
      regex.lastIndex = 0;
      if (regex.test(name)) return { ruleID: `${provider.category}:${pattern}`, category: provider.category };
    }
    for (const { regex, pattern } of provider.referralParamRegexes) {
      regex.lastIndex = 0;
      if (regex.test(name)) return { ruleID: `${CATEGORIES.referralMarketing}:${pattern}`, category: CATEGORIES.referralMarketing };
    }
    return null;
  }

  function shouldStripFallback(engine, name) {
    for (const rule of engine.fallbackRules) {
      rule.regex.lastIndex = 0;
      if (rule.regex.test(name)) return { ruleID: rule.ruleID, category: rule.category };
    }
    return null;
  }

  function isRedditHost(host) {
    const lower = String(host || '').toLowerCase();
    return lower === 'reddit.com' || lower.endsWith('.reddit.com');
  }

  function redditJSChallengeParamsToStrip(url, queryEntries) {
    if (!isRedditHost(url.hostname)) return new Set();
    const names = new Set(queryEntries.map(([name]) => name));
    const hasChallengeFlag = queryEntries.some(([name, value]) => name === 'js_challenge' && value === '1');
    const hasSolutionAndToken = names.has('solution') && names.has('token');
    const hasChallengeRedirectState = names.has('jsc_orig_r');
    if (!hasChallengeFlag && !hasSolutionAndToken && !hasChallengeRedirectState) return new Set();
    return new Set(['solution', 'js_challenge', 'token', 'jsc_orig_r']);
  }

  function isGoogleSearchUrl(url) {
    const host = url.hostname.toLowerCase();
    return (host === 'google.com' || host.endsWith('.google.com'))
      && url.pathname === '/search'
      && url.searchParams.has('q');
  }

  function googleSearchParamsToStrip(url) {
    return isGoogleSearchUrl(url) ? new Set(['client']) : new Set();
  }

  function hasGoogleLocalResultFragment(url) {
    if (!isGoogleSearchUrl(url) || !url.hash) return false;
    const fragment = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;
    return ['lkt=', 'lpg=', 'trex=', 'rc_ludocids:', 'trex_id:'].some((marker) => fragment.includes(marker));
  }

  function parseInput(input) {
    const trimmed = String(input || '').trim();
    if (!trimmed) return { error: 'empty', trimmed };
    if (trimmed.length > MAX_INPUT_LENGTH) return { error: 'too_long', trimmed };
    let url;
    try {
      url = new URL(trimmed);
    } catch (_) {
      return { error: 'invalid', trimmed };
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return { error: 'unsupported_scheme', trimmed };
    return { url, trimmed };
  }

  function normalizedFrontendBaseUrl(value, fallback) {
    const trimmed = String(value || '').trim();
    let candidate = trimmed;
    if (!candidate && fallback) candidate = fallback;
    if (!candidate) return null;
    if (!candidate.includes('://')) candidate = `https://${candidate}`;

    let frontend;
    try {
      frontend = new URL(candidate);
    } catch (_) {
      return fallback && fallback !== value ? normalizedFrontendBaseUrl(fallback, null) : null;
    }

    if (!['http:', 'https:'].includes(frontend.protocol) || frontend.username || frontend.password || frontend.search || frontend.hash) {
      return fallback && fallback !== value ? normalizedFrontendBaseUrl(fallback, null) : null;
    }

    frontend.pathname = '';
    frontend.search = '';
    frontend.hash = '';
    const normalized = frontend.toString();
    return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
  }

  function applyPrivacyRedirect(urlString, settings = {}) {
    let url;
    try {
      url = new URL(urlString);
    } catch (_) {
      return null;
    }

    const host = url.hostname.toLowerCase();
    let service = null;
    let frontendBaseUrl = null;

    if (settings.xRedirectEnabled && X_HOSTS.has(host)) {
      service = 'xTwitter';
      frontendBaseUrl = normalizedFrontendBaseUrl(settings.xFrontendBaseURL, DEFAULT_X_FRONTEND_BASE_URL);
    } else if (settings.redditRedirectEnabled && REDDIT_HOSTS.has(host)) {
      service = 'reddit';
      frontendBaseUrl = normalizedFrontendBaseUrl(settings.redditFrontendBaseURL, DEFAULT_REDDIT_FRONTEND_BASE_URL);
    }

    if (!service || !frontendBaseUrl) return null;

    const frontend = new URL(frontendBaseUrl);
    if (frontend.hostname.toLowerCase() === host) return null;

    url.protocol = frontend.protocol;
    url.hostname = frontend.hostname;
    url.port = frontend.port;
    url.username = '';
    url.password = '';

    const redirectedUrl = url.toString();
    if (redirectedUrl === urlString) return null;

    return {
      redirectedUrl,
      info: {
        service,
        originalHost: host,
        frontendHost: frontend.hostname.toLowerCase(),
      },
    };
  }

  function performClean(engine, trimmed, depth, options = {}) {
    let currentURL = trimmed;
    const matchedRuleIDs = [];
    const matchedCategories = new Set();
    const matching = matchingProviders(engine, currentURL);
    let redirectUnwrapped = false;

    for (const provider of matching) {
      if (isException(currentURL, provider)) continue;
      const redirect = extractRedirection(currentURL, provider);
      if (redirect) {
        redirectUnwrapped = true;
        matchedCategories.add(CATEGORIES.redirectUnwrapping);
        matchedRuleIDs.push(`${CATEGORIES.redirectUnwrapping}:${redirect.pattern}`);

        if (depth < MAX_REDIRECT_DEPTH) {
          const inner = performClean(engine, redirect.destination, depth + 1, options);
          if (inner && inner.status === 'cleaned') {
            return {
              ...inner,
              originalUrl: trimmed,
              paramsRemoved: inner.paramsRemoved + 1,
              matchedRuleIds: matchedRuleIDs.concat(inner.matchedRuleIds),
              matchedCategories: Array.from(new Set([...matchedCategories, ...inner.matchedCategories])),
              redirectUnwrapped: true,
            };
          }
        }

        return {
          status: 'cleaned',
          originalUrl: trimmed,
          cleanedUrl: redirect.destination,
          paramsRemoved: 1,
          removedQueryParameters: [],
          matchedRuleIds: matchedRuleIDs,
          matchedCategories: Array.from(matchedCategories),
          redirectUnwrapped,
        };
      }
    }

    for (const provider of matching) {
      if (isException(currentURL, provider)) continue;
      const { result, applied } = applyRawRules(currentURL, provider);
      if (result !== currentURL) {
        currentURL = result;
        matchedCategories.add(provider.category);
        for (const pattern of applied) matchedRuleIDs.push(`${provider.category}:${pattern}`);
      }
    }

    let url;
    try {
      url = new URL(currentURL);
    } catch (_) {
      return null;
    }

    const entries = Array.from(url.searchParams.entries());
    const redditChallengeParams = redditJSChallengeParamsToStrip(url, entries);
    const googleSearchParams = googleSearchParamsToStrip(url);
    const filtered = [];
    const removedQueryParameters = [];

    for (const [name, value] of entries) {
      let strip = null;

      if (redditChallengeParams.has(name)) {
        strip = { ruleID: `${CATEGORIES.socialMedia}:reddit_js_challenge:${name}`, category: CATEGORIES.socialMedia };
      }

      if (!strip && googleSearchParams.has(name)) {
        strip = { ruleID: `${CATEGORIES.analytics}:google_search:${name}`, category: CATEGORIES.analytics };
      }

      if (!strip) {
        for (const provider of matching) {
          if (isException(currentURL, provider)) continue;
          strip = shouldStripParam(name, provider);
          if (strip) break;
        }
      }

      if (!strip) strip = shouldStripFallback(engine, name);

      if (strip) {
        matchedRuleIDs.push(strip.ruleID);
        matchedCategories.add(strip.category);
        removedQueryParameters.push(name);
      } else {
        filtered.push([name, value]);
      }
    }

    if (entries.length > 0) {
      const nextParams = new URLSearchParams();
      for (const [name, value] of filtered) nextParams.append(name, value);
      url.search = filtered.length > 0 ? nextParams.toString() : '';
    }

    const googleLocalFragmentRemoved = hasGoogleLocalResultFragment(url);
    if (googleLocalFragmentRemoved) {
      url.hash = '';
      matchedRuleIDs.push(`${CATEGORIES.analytics}:google_search:local_fragment`);
      matchedCategories.add(CATEGORIES.analytics);
    }

    const cleanedString = url.toString();
    const privacyRedirect = applyPrivacyRedirect(cleanedString, options.privacyRedirectSettings || {});
    const finalString = privacyRedirect ? privacyRedirect.redirectedUrl : cleanedString;
    const rawRulesApplied = currentURL !== trimmed && removedQueryParameters.length === 0 ? 1 : 0;
    const fragmentRulesApplied = googleLocalFragmentRemoved ? 1 : 0;
    if (finalString === trimmed) return null;

    return {
      status: 'cleaned',
      originalUrl: trimmed,
      cleanedUrl: finalString,
      paramsRemoved: removedQueryParameters.length + rawRulesApplied + fragmentRulesApplied,
      removedQueryParameters,
      matchedRuleIds: matchedRuleIDs,
      matchedCategories: Array.from(matchedCategories),
      redirectUnwrapped,
      privacyRedirect: privacyRedirect ? privacyRedirect.info : null,
    };
  }

  function cleanUrl(engine, input, options = {}) {
    if (!engine || !Array.isArray(engine.providers)) throw new Error('URLStrip rules engine is not loaded');
    const parsed = parseInput(input);
    if (parsed.error) return { status: 'invalid', input: parsed.trimmed, reason: parsed.error };

    const result = performClean(engine, parsed.trimmed, 0, options);
    if (!result) return { status: 'unchanged', originalUrl: parsed.trimmed };
    return result;
  }

  async function loadEngine(options = {}) {
    const manifestUrl = options.manifestUrl || '/urlstrip/rules/manifest.json';
    const fetchImpl = options.fetch || (typeof fetch !== 'undefined' ? fetch.bind(globalThis) : null);
    if (!fetchImpl) throw new Error('fetch is not available');

    const manifest = await fetchImpl(manifestUrl).then((r) => {
      if (!r.ok) throw new Error(`Could not load URLStrip rules manifest: ${r.status}`);
      return r.json();
    });

    const base = new URL(manifestUrl, typeof location !== 'undefined' ? location.href : 'https://www.tacitalabs.com/');
    const version = manifest.currentVersion;
    const clearFile = (manifest.files || []).find((file) => file.kind === 'clearurls');
    const supplementaryFile = (manifest.files || []).find((file) => file.kind === 'urlstrip-supplementary');

    function fileUrl(file) {
      if (!file) return null;
      // Prefer same-origin relative rule files so local previews and Pages deploys
      // both load the rules from the site being viewed. The manifest keeps
      // absolute production URLs for app update clients, but the web tool should
      // not reach across origins during preview.
      if (file.path && version) return new URL(`${version}/${file.path}`, base).toString();
      if (file.url) return file.url;
      return null;
    }

    const clearUrl = fileUrl(clearFile) || new URL(`${version}/data.min.json`, base).toString();
    const supplementaryUrl = fileUrl(supplementaryFile) || new URL(`${version}/urlstrip-supplementary.json`, base).toString();

    const [clearURLsData, supplementaryData] = await Promise.all([
      fetchImpl(clearUrl).then((r) => {
        if (!r.ok) throw new Error(`Could not load ClearURLs rules: ${r.status}`);
        return r.json();
      }),
      fetchImpl(supplementaryUrl).then((r) => {
        if (!r.ok) throw new Error(`Could not load URLStrip supplementary rules: ${r.status}`);
        return r.json();
      }),
    ]);

    const engine = createEngine(clearURLsData, supplementaryData);
    engine.manifest = manifest;
    engine.ruleUrls = { clearUrl, supplementaryUrl };
    return engine;
  }

  return {
    CATEGORIES,
    FALLBACK_PARAMS,
    MAX_INPUT_LENGTH,
    createEngine,
    loadEngine,
    cleanUrl,
    _private: { parseInput, categorizeProvider, redditJSChallengeParamsToStrip, applyPrivacyRedirect },
  };
});
