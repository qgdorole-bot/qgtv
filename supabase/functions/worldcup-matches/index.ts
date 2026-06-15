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
    const apiKey = Deno.env.get("FOOTBALL_DATA_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "FOOTBALL_DATA_API_KEY não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // WC = FIFA World Cup (atual edição)
    const res = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
      headers: { "X-Auth-Token": apiKey },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("football-data.org erro:", res.status, text);
      return new Response(
        JSON.stringify({ error: `API retornou ${res.status}`, detail: text }),
        { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    const matches = (data.matches || []).map((m: any) => ({
      id: m.id,
      utcDate: m.utcDate,
      status: m.status, // SCHEDULED, TIMED, IN_PLAY, PAUSED, FINISHED
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

    return new Response(
      JSON.stringify({ matches, fetchedAt: new Date().toISOString() }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
        },
      }
    );
  } catch (e) {
    console.error("Erro inesperado:", e);
    return new Response(
      JSON.stringify({ error: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
