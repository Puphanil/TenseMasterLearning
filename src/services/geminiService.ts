export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface ApiHealthStatus {
  status: string;
  hasGeminiKey: boolean;
}

export const checkApiHealth = async (): Promise<ApiHealthStatus> => {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch {
    return { status: 'unknown', hasGeminiKey: false };
  }
};

export const askAITutor = async (
  prompt: string,
  history: ChatMessage[] = []
): Promise<{ reply: string; error?: string; isKeyMissing?: boolean }> => {
  try {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        history: history.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.isKeyMissing) {
        return {
          reply: `🤖 **ยังไม่ได้ตั้งค่า GEMINI_API_KEY ในระบบ**\n\nแต่ไม่ต้องกังวลครับ! คุณยังสามารถเรียนรู้เนื้อหาทั้ง 12 Tenses, ทำแบบฝึกหัด, และฝึก Flashcards คำศัพท์ได้ครบถ้วนตามปกติ\n\nหากต้องการใช้งาน Kru Top AI Tutor เพื่อตอบคำถามและตรวจการบ้านแบบสดๆ โปรดเพิ่มคีย์ **GEMINI_API_KEY** ในแถบ Secrets ของ Google AI Studio ครับ`,
          isKeyMissing: true,
        };
      }
      return {
        reply: data.error || 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI Tutor',
        error: data.error,
      };
    }

    return { reply: data.reply };
  } catch (err: any) {
    return {
      reply: 'ขออภัย ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ในขณะนี้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
      error: err.message,
    };
  }
};

export const checkSentenceWithAI = async (
  sentence: string,
  targetTense?: string
): Promise<{ analysis: string; isKeyMissing?: boolean; error?: string }> => {
  try {
    const res = await fetch('/api/ai/check-sentence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sentence, targetTense }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.isKeyMissing) {
        return {
          analysis: `⚠️ **ระบบตรวจประโยคด้วย AI ต้องการ GEMINI_API_KEY**\n\nสามารถเปิดใช้งานได้โดยเพิ่ม GEMINI_API_KEY ใน Secrets\n\n**คำแนะนำเบื้องต้น:** สำหรับโครงสร้างประโยคมาตรฐาน อย่าลืมเช็คการผันกริยาตามประธาน (s/es ใน Present Simple), กริยาช่วย (do/does, did, will, have/has) และกริยาช่อง 2/3 ให้ตรงตาม Tense ครับ!`,
          isKeyMissing: true,
        };
      }
      return {
        analysis: data.error || 'เกิดข้อผิดพลาดในการตรวจประโยค',
        error: data.error,
      };
    }

    return { analysis: data.analysis };
  } catch (err: any) {
    return {
      analysis: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับบริการตรวจประโยค',
      error: err.message,
    };
  }
};
