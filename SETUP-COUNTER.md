# Turn on scan counting (Cloudflare, free)

Button and menu names on Cloudflare change from time to time, so look for the closest match.

1. Sign up at dash.cloudflare.com (free plan).
2. Create the storage: go to **Storage & databases > KV** (or **Workers KV**), click **Create**, name it `qr-scans`.
3. Create the worker: **Workers & Pages > Create > Create Worker**. Name it `qr-counter`, click **Deploy**, then **Edit code**.
4. Delete everything in the editor, paste the whole contents of `worker.js`, and click **Deploy**.
5. Connect the storage: open your worker, go to **Settings > Bindings > Add > KV namespace**. Set the variable name to exactly `SCANS`, choose `qr-scans`, and save/deploy.
6. Copy your worker address (it looks like `https://qr-counter.yourname.workers.dev`). Opening it in a browser should say "QR scan counter is running."
7. In GitHub, open `config.js`, click the pencil icon, and paste the address between the quotes:
   `window.SCAN_COUNTER_URL = "https://qr-counter.yourname.workers.dev";`
   Commit the change.
8. Reload your dashboard. Each QR now shows its scan count.

Notes
- Counts only start from the moment you turn this on.
- Anyone who knows the worker address can read the counts or add fake scans. Keep the address to yourself.
- As far as I know the free Cloudflare plan allows about 1,000 KV writes per day, so about 1,000 counted scans per day. Past that, scans are still redirected but not counted.
