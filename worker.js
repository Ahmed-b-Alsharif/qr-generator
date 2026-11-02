// Cloudflare Worker: counts QR scans. Needs a KV namespace bound as SCANS.
//   GET /hit?c=<code>   adds 1 to that code's count
//   GET /counts         returns {"<code>": <count>, ...}
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Cache-Control": "no-store",
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (!env.SCANS) return new Response("KV namespace SCANS is not bound", { status: 500, headers: cors });

    const url = new URL(request.url);

    if (url.pathname === "/hit") {
      const code = url.searchParams.get("c") || "";
      if (!/^[0-9a-f]{8}$/.test(code)) return new Response("bad code", { status: 400, headers: cors });
      const current = await env.SCANS.getWithMetadata(code);
      const n = ((current.metadata && current.metadata.n) || 0) + 1;
      await env.SCANS.put(code, String(n), { metadata: { n } });
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === "/counts") {
      const out = {};
      let cursor;
      do {
        const page = await env.SCANS.list({ cursor });
        for (const k of page.keys) out[k.name] = (k.metadata && k.metadata.n) || 0;
        cursor = page.list_complete ? undefined : page.cursor;
      } while (cursor);
      return new Response(JSON.stringify(out), { headers: { ...cors, "Content-Type": "application/json" } });
    }

    return new Response("QR scan counter is running.", { headers: cors });
  },
};
