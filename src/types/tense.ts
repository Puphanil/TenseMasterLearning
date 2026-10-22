export type TenseGroup = 'present' | 'past' | 'future';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type TenseId =
  | 'present-simple'
  | 'present-continuous'
  | 'present-perfect'
  | 'present-perfect-continuous'
  | 'past-simple'
  | 'past-continuous'
  | 'past-perfect'
  | 'past-perfect-continuous'
  | 'future-simple'
  | 'future-continuous'
  | 'future-perfect'
  | 'future-perfect-continuous';

export interface SentenceExample {
  id: string;
  type: 'affirmative' | 'negative' | 'question';
  english: string;
  phoneticThai: string;
  translationThai: string;
  reasoning: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  phoneticThai: string;
  translation: string;
  partOfSpeech: 'Verb' | 'Noun' | 'Adjective' | 'Adverb' | 'Phrase';
  exampleSentence: string;
  examplePhonetic: string;
  exampleTranslation: string;
  tenseId: TenseId;
}

export interface SignalWord {
  word: string;
  phoneticThai: string;
  translation: string;
  usageNote?: string;
}

export interface CommonMistake {
  incorrect: string;
  correct: string;
  explanation: string;
}

export interface TenseStructure {
  affirmative: string;
  negative: string;
  question: string;
  subjectRules: string;
  verbRules: string;
  exceptions: string;
  auxiliaryExplanation: string;
}

export interface TenseLesson {
  id: TenseId;
  nameEn: string;
  nameTh: string;
  group: TenseGroup;
  level: DifficultyLevel;
  tagline: string;
  timelineLabel: string;
  timelinePosition: {
    relativeTime: 'past' | 'present' | 'future' | 'spanning';
    isContinuous: boolean;
    isPerfect: boolean;
    descriptionTh: string;
  };
  
  // A. Tense นี้คืออะไร?
  whatIsIt: {
    overview: string;
    coreConcept: string;
    realLifeAnalogy: string;
  };

  // B. ใช้เวลาไหน?
  whenToUse: {
    timeframe: string;
    points: {
      title: string;
      description: string;
      exampleMini: string;
    }[];
  };

  // C. ทำไมถึงต้องใช้ Tense นี้?
  whyUseIt: {
    primaryReason: string;
    comparisonWithSimilar: {
      otherTenseName: string;
      otherTenseSentence: string;
      thisTenseSentence: string;
      meaningDifference: string;
    };
  };

  // D. โครงสร้างประโยค
  structure: TenseStructure;

  // E. ตัวอย่าง 3 รูปแบบ
  examples: {
    affirmative: SentenceExample[];
    negative: SentenceExample[];
    question: SentenceExample[];
  };

  // F. คำศัพท์สำคัญ
  vocabulary: VocabularyItem[];

  // G. Signal Words
  signalWords: SignalWord[];
  signalWordCaution: string;

  // H. ข้อผิดพลาดที่พบบ่อย
  commonMistakes: CommonMistake[];

  // I. สรุปบทเรียน
  summary: {
    keyTakeaway: string;
    quickFormula: string;
    mustRememberWords: string[];
    dangerTrap: string;
    realLifeTip?: string;
    realLifeExample?: string;
  };
}

export interface TenseComparisonItem {
  id: string;
  tenseAId: TenseId;
  tenseBId: TenseId;
  title: string;
  summaryDifference: string;
  pairScenarios: {
    context: string;
    tenseAExample: {
      sentence: string;
      phonetic: string;
      meaning: string;
      nuance: string;
    };
    tenseBExample: {
      sentence: string;
      phonetic: string;
      meaning: string;
      nuance: string;
    };
    whyTheDifferenceMatters: string;
  }[];
  quickComparisonPoints: {
    aspect: string;
    tenseA: string;
    tenseB: string;
  }[];
  practiceQuestion: {
    scenario: string;
    question: string;
    options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  };
}
