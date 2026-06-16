// Edge function: busca jogos da Copa do Mundo 2026 na API football-data.org
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });

  const apiKey = Deno.env.get("FOOTBALL_DATA_API_KEY");
  if (!apiKey) {
    return json({ error: "FOOTBALL_DATA_API_KEY não configurada", fallback: true, matches: [] });
  }

  // Retry the upstream call — football-data.org occasionally drops HTTP/2 connections.
  const url = "https://api.football-data.org/v4/competitions/WC/matches";
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 10_000);
      const res = await fetch(url, {
        headers: { "X-Auth-Token": apiKey, Accept: "application/json" },
        signal: ctrl.signal,
      });
      clearTimeout(t);

      if (!res.ok) {
        const text = await res.text();
        console.error("football-data.org erro:", res.status, text);
        // Return 200 with error payload so the client doesn't crash.
        return json({
          error: `API retornou ${res.status}`,
          detail: text,
          fallback: true,
          matches: [],
        });
      }

      const data = await res.json();
      const matches = (data.matches || []).map((m: any) => ({
        id: m.id,
        utcDate: m.utcDate,
        status: m.status,
        stage: m.stage,
        group: m.group,
        matchday: m.matchday,
        homeTeam: { name: m.homeTeam?.shortName || m.homeTeam?.name || "A definir", tla: m.homeTeam?.tla },
        awayTeam: { name: m.awayTeam?.shortName || m.awayTeam?.name || "A definir", tla: m.awayTeam?.tla },
        score: {
          home: m.score?.fullTime?.home ?? null,
          away: m.score?.fullTime?.away ?? null,
        },
        venue: m.venue || null,
      }));

      return json({ matches, fetchedAt: new Date().toISOString() });
    } catch (e) {
      lastErr = e;
      console.error(`Tentativa ${attempt + 1} falhou:`, e);
      // Small backoff before retry
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }

  console.error("Erro final após retries:", lastErr);
  // Always 200 with fallback so the UI degrades gracefully instead of going blank.
  return json({
    error: "SERVICE_UNAVAILABLE",
    detail: String(lastErr),
    fallback: true,
    matches: [],
  });
  } catch (e) {
    console.error("Erro inesperado no handler:", e);
    return json({ error: String(e), fallback: true, matches: [] });
  }
});
