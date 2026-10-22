import { TenseId, DifficultyLevel } from './tense';

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-in-the-blank'
  | 'sentence-order'
  | 'thai-to-english'
  | 'situation-choice'
  | 'error-detection'
  | 'compare-choice';

export interface ExerciseQuestion {
  id: string;
  tenseId: TenseId;
  level: DifficultyLevel;
  type: ExerciseType;
  prompt: string;
  situationContext?: string; // บริบทสถานการณ์
  options?: string[]; // สำหรับ multiple-choice, situation-choice, compare-choice
  correctAnswer: string; // คำตอบที่ถูกต้อง
  acceptableAnswers?: string[]; // คำตอบสำรองที่ถูกต้องได้ เช่น ตัวพิมพ์เล็กหรือคำย่อ
  wordsToOrder?: string[]; // สำหรับ sentence-order
  translationThai: string; // แปลประโยคเป็นไทย
  phoneticThai?: string; // คำอ่านไทย
  explanationThai: string; // เหตุผลเฉลยละเอียด
  wrongOptionExplanations?: Record<string, string>; // ทำไมตัวเลือกอื่นจึงไม่เหมาะสม
  hint?: string;
}

export interface QuizAttemptResult {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface QuizSessionSummary {
  tenseId: TenseId | 'all' | 'comparison';
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  xpEarned: number;
  attempts: QuizAttemptResult[];
}
