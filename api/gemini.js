/**  api/gemini.js  — Vercel Serverless Function
 *   • проксирует запросы к Google Gemini
 *   • разрешает CORS для ЛЮБОГО origin  (Access-Control-Allow-Origin: *)
 */

export default async function handler(req, res) {
    /* ---------- CORS: разрешаем всё ---------- */
    const setCORS = () => {
      res.setHeader('Access-Control-Allow-Origin', '*');            // ★
      res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    };
  
    /* pre-flight (OPTIONS) */
    if (req.method === 'OPTIONS') {
      setCORS();
      return res.status(204).end();
    }
  
    if (req.method !== 'POST') return res.status(405).end();
  
    /* ---------- прокси к Gemini REST v1beta ---------- */
    const key   = process.env.GEMINI_KEY;          // хранится в Vercel Env
    const model = 'gemini-2.5-flash-preview-05-20';                    // или 'gemini-1.5-flash'
    const url   =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  
    try {
      const upstream = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(req.body)           // передаём тело как есть
      });
  
      setCORS();                                    // CORS для ответа
      res.status(upstream.status).send(await upstream.text());
    } catch (err) {
      console.error('Proxy failure:', err);
      setCORS();
      res.status(500).json({ error: 'proxy failure' });
    }
  }
  