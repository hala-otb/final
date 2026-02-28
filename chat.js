export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  const { system, user } = req.body;
  const key = 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;
  if (!key) return res.status(500).json({ error: { message: 'ANTHROPIC_KEY غير مضبوط في Vercel' } });
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1200, system, messages: [{ role: 'user', content: user }] })
    });
    const d = await r.json();
    res.status(200).json(d);
  } catch (e) { res.status(500).json({ error: { message: e.message } }); }
}
