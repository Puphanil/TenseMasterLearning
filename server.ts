import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

// Helper to initialize Gemini
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Tutor chat endpoint
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { prompt, history, mode = 'general' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'กรุณาระบุข้อความคำถาม (Prompt)' });
      return;
    }

    const ai = getGenAI();
    if (!ai) {
      res.status(503).json({
        error: 'ยังไม่ได้ตั้งค่า GEMINI_API_KEY ในระบบ กรุณาตรวจสอบการตั้งค่า Secrets',
        isKeyMissing: true,
      });
      return;
    }

    const systemInstruction = `คุณคือ "ครูท็อป" (Kru Top) - AI English Tutor ผู้เชี่ยวชาญด้านการสอนไวยากรณ์ภาษาอังกฤษ (Tenses) สำหรับผู้เรียนชาวไทย
บุคลิก:
- อบอุ่น ใจดี ให้กำลังใจ เข้าใจง่าย ไม่วิชาการจ๋า อธิบายทีละขั้นตอน
- เน้นให้ผู้เรียน "เข้าใจบริบทและความรู้สึกของ Tense" ไม่ใช่แค่ท่องจำสูตร
- ใช้ภาษาไทยในการอธิบายเป็นหลัก
- เมื่อยกตัวอย่างประโยคภาษาอังกฤษ ให้ใส่:
  1. ประโยคภาษาอังกฤษ
  2. คำอ่านภาษาไทยโดยประมาณ (เช่น "She goes to school" -> ชี โกซ ทู สคูล)
  3. คำแปลภาษาไทยที่เป็นธรรมชาติ
  4. เหตุผลว่าทำไมสถานการณ์นี้จึงต้องใช้ Tense นี้
  5. จุดสังเกตหรือข้อควรระวัง
- หากผู้เรียนให้ตรวจประโยค ให้ชี้แนะส่วนที่ถูกต้องก่อน แล้วแก้ไขจุดผิดอย่างสุภาพ พร้อมอธิบายเหตุผล
- จัดรูปแบบข้อความด้วย Markdown ที่อ่านง่าย ใช้หัวข้อ (##, ###) และ Bullet points หรือ Bold ให้ชัดเจน`;

    let contents: any[] = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-8)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || 'ขออภัย ไม่สามารถสร้างคำตอบได้ในขณะนี้';
    res.json({ reply: text });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({
      error: error.message || 'เกิดข้อผิดพลาดในการประมวลผลคำตอบจาก AI',
    });
  }
});

// Dedicated grammar checker & tense analyzer endpoint
app.post('/api/ai/check-sentence', async (req, res) => {
  try {
    const { sentence, targetTense } = req.body;

    if (!sentence || typeof sentence !== 'string') {
      res.status(400).json({ error: 'กรุณาระบุประโยคที่ต้องการตรวจ' });
      return;
    }

    const ai = getGenAI();
    if (!ai) {
      res.status(503).json({
        error: 'ยังไม่ได้ตั้งค่า GEMINI_API_KEY',
        isKeyMissing: true,
      });
      return;
    }

    const promptText = `ช่วยวิเคราะห์และตรวจประโยคภาษาอังกฤษนี้ให้ผู้เรียนชาวไทย:
"${sentence}"
${targetTense ? `(ผู้เรียนต้องการเขียนในรูปแบบ Tense: ${targetTense})` : ''}

กรุณาวิเคราะห์และตอบเป็นภาษาไทย โดยให้ข้อมูลดังนี้:
1. ประโยคนี้ถูกต้องหรือไม่ตามหลักไวยากรณ์ (ถูกต้อง / ต้องแก้ไข)
2. เป็น Tense อะไร (หรือใกล้เคียง Tense อะไร)
3. หากมีจุดผิด มีอะไรบ้าง และประโยคที่ถูกต้องควรเป็นอย่างไร
4. คำอ่านภาษาไทยโดยประมาณของประโยคที่ถูกต้อง
5. คำแปลภาษาไทย
6. คำอธิบายเหตุผลเชิงลึกว่าทำไมต้องเขียนแบบนี้ และสถานการณ์จริงที่เจ้าของภาษาใช้ประโยคนี้`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: 'คุณคือครูสอนไวยากรณ์ภาษาอังกฤษสำหรับคนไทย อธิบายเข้าใจง่ายและกระชับ',
        temperature: 0.4,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Sentence check error:', error);
    res.status(500).json({
      error: error.message || 'เกิดข้อผิดพลาดในการตรวจประโยค',
    });
  }
});

// Vite middleware in dev or static files in production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`English Tense Master server is listening on port ${port}`);
  });
}

startServer();
