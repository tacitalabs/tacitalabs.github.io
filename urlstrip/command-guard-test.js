(function () {
  function setStatus(message) {
    const status = document.querySelector('[data-command-test-status]');
    if (status) status.textContent = message;
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy-command]');
    if (!button) return;
    const command = button.getAttribute('data-copy-command') || '';
    try {
      await copyText(command);
      setStatus('Copied test command.');
    } catch (error) {
      setStatus('Copy failed. Select the command text manually.');
    }
  });
})();
