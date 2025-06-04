// /api/gemini.js
export default async function handler(req, res) {
    /* --- настроить под свой GitHub Pages-домен --- */
    const ORIGIN = 'https://digitalmedialabkfu.github.io/AAWA/';  // ← замените
  
    const setCORS = () => {
      res.setHeader('Access-Control-Allow-Origin', ORIGIN);
      res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    };
  
    /* pre-flight */
    if (req.method === 'OPTIONS') {
      setCORS();
      return res.status(204).end();
    }
    if (req.method !== 'POST') return res.status(405).end();
  
    /* ------- проксирование к Gemini REST v1beta ------- */
    const key   = process.env.GEMINI_KEY;          // секрет хранится в Vercel
    const model = 'gemini-2.5-flash-preview-05-20';                    // или 'gemini-1.5-flash'
    const url   =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  
    try {
      const upstream = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(req.body)
      });
  
      setCORS();                                   // CORS для ответа
      res.status(upstream.status).send(await upstream.text());
    } catch (e) {
      console.error('proxy failure', e);
      setCORS();
      res.status(500).json({ error: 'proxy failure' });
    }
  }
  