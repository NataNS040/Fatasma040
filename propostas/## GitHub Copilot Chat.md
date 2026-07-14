## GitHub Copilot Chat

- Extension: 0.52.0 (prod)
- VS Code: 1.124.0 (1b50d58d73426c9171299ec4037d01365d995b78)
- OS: win32 10.0.26200 x64
- GitHub Account: NataNS040

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 4.228.31.149 (18 ms)
- DNS ipv6 Lookup: Error (18 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): timed out after 10 seconds
- Node.js https: timed out after 10 seconds
- Node.js fetch: timed out after 10 seconds

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.22 (16 ms)
- DNS ipv6 Lookup: Error (18 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (3 ms)
- Electron fetch (configured): HTTP 200 (127 ms)
- Node.js https: HTTP 200 (394 ms)
- Node.js fetch: HTTP 200 (432 ms)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: 4.228.31.153 (33 ms)
- DNS ipv6 Lookup: Error (109 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (5 ms)
- Electron fetch (configured): HTTP 200 (342 ms)
- Node.js https: HTTP 200 (250 ms)
- Node.js fetch: HTTP 200 (230 ms)

Connecting to https://mobile.events.data.microsoft.com: HTTP 404 (510 ms)
Connecting to https://dc.services.visualstudio.com: HTTP 404 (613 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (420 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: HTTP 200 (399 ms)
Connecting to https://default.exp-tas.com: HTTP 400 (307 ms)

Number of system certificates: 83

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).