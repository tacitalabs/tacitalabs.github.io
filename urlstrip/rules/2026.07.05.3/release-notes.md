# URLStrip rules 2026.07.05.3

- Expand Command Guard coverage for high-signal dangerous command patterns across PowerShell, Windows LOLBins, macOS, and Unix shells.
- Adds detections for PowerShell base64 execution, BITS download/execute flows, mshta/regsvr32/rundll32 script loading, service creation, download-chmod-execute chains, reverse shells, SSH authorized_keys writes, remote AppleScript, and macOS profile installs.
- No app binary update is required for URLStrip 1.1 Build 18 users.
