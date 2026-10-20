import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/notion/v1";
const DB_ID = "192bbb77-40bc-80fa-889c-d10c6d0bfc3d";

const DAYS = [
  { key: "segunda", label: "Segunda", offset: 0 },
  { key: "terca", label: "Terça", offset: 1 },
  { key: "quarta", label: "Quarta", offset: 2 },
  { key: "quinta", label: "Quinta", offset: 3 },
  { key: "sexta", label: "Sexta", offset: 4 },
  { key: "sabado", label: "Sábado", offset: 5 },
  { key: "domingo", label: "Domingo", offset: 6 },
];
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const HIGHLIGHT = /(role|shopping|games|rpg|cinema|parque|museu|show|festa|passeio|evento)/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const NOTION_API_KEY = Deno.env.get("NOTION_API_KEY");
    if (!LOVABLE_API_KEY || !NOTION_API_KEY) throw new Error("Credenciais ausentes");
    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": NOTION_API_KEY,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    };

    const q = await fetch(`${GATEWAY}/databases/${DB_ID}/query`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filter: { property: "ROLÊ", title: { starts_with: "Prévia" } },
        sorts: [{ property: "Data do encontro e Horário", direction: "descending" }],
        page_size: 1,
      }),
    });
    if (!q.ok) return json({ error: "Falha Notion", status: q.status, details: await q.text() }, 502);
    const page = (await q.json()).results?.[0];
    if (!page) return json({ dias: [] });
    const start: string | undefined = page.properties?.["Data do encontro e Horário"]?.date?.start;

    const lines: string[] = [];
    let cursor: string | undefined;
    do {
      const r = await fetch(`${GATEWAY}/blocks/${page.id}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`, { headers });
      if (!r.ok) return json({ error: "Falha blocos", status: r.status, details: await r.text() }, 502);
      const d = await r.json();
      for (const b of d.results) {
        const rt = b[b.type]?.rich_text;
        if (Array.isArray(rt)) {
          const t = rt.map((x: { plain_text: string }) => x.plain_text).join("");
          t.split("\n").forEach((l: string) => l.trim() && lines.push(l.trim()));
        }
      }
      cursor = d.has_more ? d.next_cursor : undefined;
    } while (cursor);

    // Monday of the week of the meeting
    const base = start ? new Date(start.slice(0, 10) + "T12:00:00Z") : new Date();
    const dow = (base.getUTCDay() + 6) % 7;
    base.setUTCDate(base.getUTCDate() - dow);

    const dias: { dia: string; data: string; iso: string; roles: { nome: string; local: string; hora: string }[] }[] = [];
    let current: (typeof dias)[number] | null = null;
    for (const raw of lines) {
      const n = norm(raw);
      const day = DAYS.find((d) => new RegExp(`^${d.key}\\b`).test(n.replace(/[^a-z]+/g, " ").trim()));
      if (day && raw.length < 30) {
        const dt = new Date(base);
        dt.setUTCDate(base.getUTCDate() + day.offset);
        const iso = dt.toISOString().slice(0, 10);
        current = { dia: day.label, data: `${iso.slice(8, 10)}/${iso.slice(5, 7)}`, iso, roles: [] };
        dias.push(current);
        continue;
      }
      if (!current || !HIGHLIGHT.test(n)) continue;
      const parts = raw.replace(/^\d+\s*-?\s*/, "").split(/\s+-\s+/).map((p) => p.trim()).filter(Boolean);
      const hora = (raw.match(/\b(\d{1,2})\s*[h:]\s*(\d{2})?\s*(h|horas)?\b/i) || [""])[0];
      const clean = (x: string) => x.replace(/\(.*?\)/g, "").replace(/\b\d{1,2}\s*[h:]\s*\d{0,2}\s*(h|horas)?\b/gi, "").replace(/\s+/g, " ").trim();
      const nome = clean(parts[0] ?? "") || raw;
      const local =
        parts.slice(1).find((p) => HIGHLIGHT.test(norm(p)))?.replace(/^rol[eê]\s*/i, "Rolê ") ?? "Rolê do grupo";
      current.roles.push({ nome, local: (/^rol[eê]$/i.test(clean(local)) || !clean(local)) ? "Rolê do grupo" : clean(local).replace(/^Rol[eê] (?!do)/, "Rolê na "), hora: hora.toLowerCase().replace(/\s/g, "").replace(/:00$/, "h").replace(/h00$/, "h") });
    }

    return json({ semana: page.properties?.["ROLÊ"]?.title?.[0]?.plain_text ?? "", dias: dias.filter((d) => d.roles.length) });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
