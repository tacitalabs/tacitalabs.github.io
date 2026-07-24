/* URLStrip web tool UI. Never send pasted URL content over the network. */
(() => {
  'use strict';

  const tool = document.querySelector('[data-urlstrip-tool]');
  if (!tool || !window.URLStripWeb) return;

  const input = tool.querySelector('[data-urlstrip-tool] #urlstrip-input') || tool.querySelector('#urlstrip-input');
  const output = tool.querySelector('#urlstrip-output');
  const cleanButton = tool.querySelector('[data-urlstrip-clean]');
  const clearButton = tool.querySelector('[data-urlstrip-clear]');
  const copyButton = tool.querySelector('[data-urlstrip-copy]');
  const status = tool.querySelector('[data-urlstrip-status]');
  const resultPanel = tool.querySelector('[data-urlstrip-result]');
  const resultLabel = tool.querySelector('[data-result-label]');
  const resultUrlWrap = tool.querySelector('[data-result-url-wrap]');
  const resultDetails = tool.querySelector('[data-result-details]');
  const xRewriteToggle = tool.querySelector('[data-privacy-rewrite-x]');
  const redditRewriteToggle = tool.querySelector('[data-privacy-rewrite-reddit]');

  let engine = null;
  let lastCleanedUrl = '';
  let debounceTimer = null;

  function setStatus(text) {
    status.textContent = text;
  }

  function setButtonsEnabled(enabled) {
    cleanButton.disabled = !enabled;
  }

  function resetResult() {
    resultPanel.hidden = true;
    resultPanel.className = 'tool-result';
    resultLabel.textContent = '';
    resultDetails.replaceChildren();
    resultUrlWrap.hidden = true;
    output.value = '';
    lastCleanedUrl = '';
  }

  function appendText(parent, tag, text, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text;
    parent.appendChild(el);
    return el;
  }

  function appendPills(parent, values) {
    if (!values || values.length === 0) return;
    const unique = Array.from(new Set(values));
    const list = document.createElement('ul');
    list.className = 'result-pill-list';
    for (const value of unique) {
      appendText(list, 'li', value);
    }
    parent.appendChild(list);
  }

  function showInvalid(result) {
    resultPanel.hidden = false;
    resultPanel.className = 'tool-result is-invalid';
    resultUrlWrap.hidden = true;
    resultLabel.textContent = result.reason === 'too_long'
      ? 'URL is too long for the web tool'
      : 'Enter a valid http:// or https:// URL';
    resultDetails.replaceChildren();
    appendText(resultDetails, 'p', 'URLStrip only cleans ordinary web URLs. Nothing was sent anywhere.');
  }

  function showUnchanged(result) {
    resultPanel.hidden = false;
    resultPanel.className = 'tool-result is-unchanged';
    resultUrlWrap.hidden = false;
    resultLabel.textContent = 'No known tracking found';
    output.value = result.originalUrl;
    lastCleanedUrl = result.originalUrl;
    resultDetails.replaceChildren();
    appendText(resultDetails, 'p', 'URLStrip did not find known tracking parameters, supported redirect wrappers, or enabled privacy rewrites in this link.');
  }

  function showCleaned(result) {
    resultPanel.hidden = false;
    resultPanel.className = 'tool-result is-cleaned';
    resultUrlWrap.hidden = false;
    resultLabel.textContent = result.privacyRedirect
      ? 'Privacy rewrite applied'
      : (result.redirectUnwrapped ? 'Redirect unwrapped' : 'Tracking removed');
    output.value = result.cleanedUrl;
    lastCleanedUrl = result.cleanedUrl;
    resultDetails.replaceChildren();

    const pieces = [];
    if (result.removedQueryParameters.length > 0) {
      pieces.push(`${result.removedQueryParameters.length} query parameter${result.removedQueryParameters.length === 1 ? '' : 's'} removed`);
    }
    if (result.redirectUnwrapped) pieces.push('redirect wrapper removed');
    if (result.privacyRedirect) {
      pieces.push(`privacy rewrite: ${result.privacyRedirect.originalHost} to ${result.privacyRedirect.frontendHost}`);
    }
    if (pieces.length === 0) pieces.push('URL cleaned');
    appendText(resultDetails, 'p', pieces.join('; ') + '.');

    if (result.removedQueryParameters.length > 0) {
      appendText(resultDetails, 'p', 'Removed parameters:');
      appendPills(resultDetails, result.removedQueryParameters);
    }

  }

  function privacyRedirectSettings() {
    return {
      xRedirectEnabled: Boolean(xRewriteToggle && xRewriteToggle.checked),
      redditRedirectEnabled: Boolean(redditRewriteToggle && redditRewriteToggle.checked),
    };
  }

  function showError(message) {
    resultPanel.hidden = false;
    resultPanel.className = 'tool-result is-error';
    resultUrlWrap.hidden = true;
    resultLabel.textContent = 'URLStrip could not run';
    resultDetails.replaceChildren();
    appendText(resultDetails, 'p', message);
  }

  function runClean() {
    if (!engine) {
      showError('The rule bundle has not finished loading yet. Try again in a moment.');
      return;
    }

    const value = input.value;
    if (!value.trim()) {
      resetResult();
      return;
    }

    try {
      const result = window.URLStripWeb.cleanUrl(engine, value, { privacyRedirectSettings: privacyRedirectSettings() });
      if (result.status === 'invalid') showInvalid(result);
      else if (result.status === 'unchanged') showUnchanged(result);
      else showCleaned(result);
    } catch (error) {
      showError(error && error.message ? error.message : 'Unexpected cleaning error.');
    }
  }

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runClean, 350);
  });

  cleanButton.addEventListener('click', runClean);

  if (xRewriteToggle) xRewriteToggle.addEventListener('change', runClean);
  if (redditRewriteToggle) redditRewriteToggle.addEventListener('change', runClean);

  clearButton.addEventListener('click', () => {
    input.value = '';
    resetResult();
    input.focus();
  });

  copyButton.addEventListener('click', async () => {
    if (!lastCleanedUrl) return;
    try {
      await navigator.clipboard.writeText(lastCleanedUrl);
      copyButton.textContent = 'Copied';
      setTimeout(() => { copyButton.textContent = 'Copy Clean URL'; }, 1400);
    } catch (_) {
      output.focus();
      output.select();
      copyButton.textContent = 'Select and copy';
      setTimeout(() => { copyButton.textContent = 'Copy Clean URL'; }, 1800);
    }
  });

  setButtonsEnabled(false);
  resetResult();

  window.URLStripWeb.loadEngine()
    .then((loadedEngine) => {
      engine = loadedEngine;
      setButtonsEnabled(true);
      setStatus(`Rules loaded: ${engine.providers.length} providers, bundle ${engine.manifest.currentVersion}.`);
      if (input.value.trim()) runClean();
    })
    .catch((error) => {
      setButtonsEnabled(false);
      setStatus('Rules failed to load.');
      showError(error && error.message ? error.message : 'Could not load URLStrip rules.');
    });
})();
