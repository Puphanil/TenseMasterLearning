import { TenseLesson } from '../../types/tense';

export const futureTenses: TenseLesson[] = [
  // 9. Future Simple
  {
    id: 'future-simple',
    nameEn: 'Future Simple Tense',
    nameTh: 'อนาคตกาลธรรมดา (การตัดสินใจฉับพลันและคำทำนาย)',
    group: 'future',
    level: 'beginner',
    tagline: 'ใช้กับการตัดสินใจทำเดี๋ยวนั้น การทำนาย การสัญญา หรือข้อเสนอความช่วยเหลือ',
    timelineLabel: 'จุดหมุดปักในอนาคตข้างหน้า (Future Point)',
    timelinePosition: {
      relativeTime: 'future',
      isContinuous: false,
      isPerfect: false,
      descriptionTh: 'สิ่งที่จะเกิดขึ้นข้างหน้า ไม่ว่าจะตัดสินใจตอนนั้นหรือคาดการณ์ล่วงหน้า',
    },
    whatIsIt: {
      overview: 'Future Simple ในกรอบ 12 Tenses ใช้ modal verb "will" นำหน้ากริยาช่อง 1 (Infinitive) เพื่อกล่าวถึงสิ่งที่จะเกิดขึ้นในอนาคต โดยเฉพาะการตัดสินใจทันที ณ ขณะพูด (Spontaneous Decision), การคาดคะเน/ทำนาย (Prediction), หรือการให้คำมั่นสัญญา (Promise)',
      coreConcept: 'หมายเหตุสำคัญ: ในภาษาอังกฤษไม่มีการผันกริยาอนาคตเฉพาะตัวเหมือนกาลอดีต แต่ใช้วิธีการผสมกริยาช่วย โดยกรอบ 12 Tenses กำหนดให้ Will + V.inf เป็นตัวแทน แต่ในความเป็นจริง เราสามารถพูดถึงอนาคตได้ด้วย "be going to" (มีแผนล่วงหน้า/มีหลักฐานตรงหน้า) และ Present Continuous (นัดหมายแน่นอนแล้ว)',
      realLifeAnalogy: 'เหมือนคุณได้ยินเสียงกริ่งหน้าบ้านดัง "กริ๊ง!" แล้วคุณพูดว่า "I will open the door!" (เดี๋ยวฉันไปเปิดประตูเอง!) เป็นการตัดสินใจ ณ เสี้ยววินาทีนั้น ไม่ได้วางแผนมาตั้งแต่เมื่อวาน',
    },
    whenToUse: {
      timeframe: 'เหตุการณ์ที่จะเกิดขึ้นในอนาคต การตัดสินใจฉับพลัน และการคาดเดา',
      points: [
        {
          title: '1. การตัดสินใจทันที ณ ขณะพูด (Spontaneous Decisions)',
          description: 'ไม่ได้วางแผนมาก่อน คิดจะทำเดี๋ยวนั้นเลย',
          exampleMini: 'It is hot in here. I will turn on the air conditioner. (ในนี้ร้อนจัง เดี๋ยวฉันเปิดแอร์ให้นะ)',
        },
        {
          title: '2. การทำนายหรือคาดคะเนตามความคิดเห็นส่วนตัว (Predictions based on opinion)',
          description: 'เดาจากความรู้สึก มักใช้กับ I think, I believe, probably',
          exampleMini: 'I think it will rain this evening. (ฉันคิดว่าเย็นนี้ฝนน่าจะตกนะ)',
        },
        {
          title: '3. การให้สัญญา หรือเสนอความช่วยเหลือ (Promises & Offers)',
          description: 'บอกความตั้งใจจริงหรือสัญญา',
          exampleMini: 'I will always support you, no matter what happens. (ฉันจะคอยสนับสนุนคุณเสมอ ไม่ว่าจะเกิดอะไรขึ้น)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'ใช้ will เมื่อต้องการสื่อความพร้อม ความเต็มใจ หรือการตัดสินใจที่เกิดขึ้นสดๆ ร้อนๆ',
      comparisonWithSimilar: {
        otherTenseName: 'Be going to',
        thisTenseSentence: 'I will buy this shirt. (เดี๋ยวฉันจะซื้อเสื้อตัวนี้แหละ = เพิ่งตัดสินใจตอนเห็นในร้าน)',
        otherTenseSentence: 'I am going to buy a new car next month. (ฉันตั้งใจจะซื้อรถใหม่เดือนหน้า = วางแผนเก็บเงินและดูรุ่นไว้แล้ว)',
        meaningDifference: 'Will มักเป็นการตัดสินใจเดี๋ยวนั้น ส่วน Be going to เป็น "แผนการที่คิดหรือเตรียมการไว้ก่อนหน้าแล้ว"',
      },
    },
    structure: {
      affirmative: 'Subject + will + V.inf (กริยาฐานไม่ผัน)',
      negative: 'Subject + will not (won\'t) + V.inf',
      question: 'Will + Subject + V.inf...?',
      subjectRules: 'ประธานทุกตัวใช้ will เหมือนกันทั้งหมด (ในภาษาอังกฤษแบบบริติชทางการโบราณ I และ We อาจใช้ shall ได้ แต่ปัจจุบันใช้ will ได้กับทุกประธาน)',
      verbRules: 'หลัง will กริยาต้องเป็น Infinitive (รูปพื้นฐาน ไม่เติม s, ed, ing ใดๆ ทั้งสิ้น)',
      exceptions: 'ในประโยคเงื่อนไข (If-clause แบบที่ 1) ส่วนที่เป็น If... ห้ามใส่ will เด็ดขาด เช่น "If it rains (ไม่ใช่ If it will rain), I will stay home."',
      auxiliaryExplanation: 'Will เป็น Modal Auxiliary Verb ทำหน้าที่บอกความตั้งใจหรือความน่าจะเป็นในอนาคต',
    },
    examples: {
      affirmative: [
        {
          id: 'fut-aff-1',
          type: 'affirmative',
          english: 'She will graduate from university next year.',
          phoneticThai: 'ชี วิล แกรดยูเอท ฟรอม ยูนิเวอร์ซิตี้ เน็กซ์ เยียร์',
          translationThai: 'เธอจะสำเร็จการศึกษาจากมหาวิทยาลัยในปีหน้า',
          reasoning: 'บอกข้อเท็จจริงที่จะเกิดขึ้นในอนาคตตามกำหนดการ',
        },
      ],
      negative: [
        {
          id: 'fut-neg-1',
          type: 'negative',
          english: 'I won\'t tell anyone your secret, I promise.',
          phoneticThai: 'ไอ วอนท์ เทล เอนีวัน ยัวร์ ซีเคร็ท ไอ พรอมิส',
          translationThai: 'ฉันจะไม่บอกความลับของคุณกับใครเด็ดขาด ฉันสัญญา',
          reasoning: 'won\'t คือรูปย่อของ will not ใช้ให้คำมั่นสัญญาอย่างหนักแน่น',
        },
      ],
      question: [
        {
          id: 'fut-q-1',
          type: 'question',
          english: 'Will you come to my birthday party on Saturday?',
          phoneticThai: 'วิล ยู คัม ทู มาย เบิร์ธเดย์ พาร์ตี ออน แซทเทอร์เดย์',
          translationThai: 'คุณจะมาร่วมงานวันเกิดของฉันในวันเสาร์นี้ไหม?',
          reasoning: 'ถามความเต็มใจหรือชักชวนให้เข้าร่วมงาน',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-fut-1',
        word: 'promise',
        phoneticThai: 'พรอมิส',
        translation: 'สัญญา, คำมั่นสัญญา',
        partOfSpeech: 'Verb',
        exampleSentence: 'I promise I will call you later.',
        examplePhonetic: 'ไอ พรอมิส ไอ วิล คอล ยู เลเทอร์',
        exampleTranslation: 'ฉันสัญญาว่าเดี๋ยวฉันจะโทรหาคุณทีหลังนะ',
        tenseId: 'future-simple',
      },
    ],
    signalWords: [
      { word: 'tomorrow', phoneticThai: 'ทูมอโรว', translation: 'วันพรุ่งนี้' },
      { word: 'next week / month / year', phoneticThai: 'เน็กซ์ วีค / มั้นธ์ / เยียร์', translation: 'สัปดาห์ / เดือน / ปีหน้า' },
      { word: 'soon', phoneticThai: 'ซูน', translation: 'เร็วๆ นี้' },
      { word: 'I think / I hope / probably', phoneticThai: 'ไอ ติงค์ / ไอ โฮพ / พรอบับบลี', translation: 'ฉันคิดว่า / ฉันหวังว่า / น่าจะ' },
    ],
    signalWordCaution: 'จำไว้ว่าวิธีพูดถึงอนาคตไม่ได้มีแค่ Will เท่านั้น ถ้ามีแผนเตรียมการไว้แล้ว เจ้าของภาษามักพูดว่า "I am going to..." หรือ "I am flying tomorrow" มากกว่า Will',
    commonMistakes: [
      {
        incorrect: 'She will goes to Chiang Mai.',
        correct: 'She will go to Chiang Mai.',
        explanation: 'หลัง will กริยาต้องเป็นรูป Infinitive (go) เสมอ ห้ามเติม -s หรือ -es',
      },
      {
        incorrect: 'If it will rain tomorrow, we will stay home.',
        correct: 'If it rains tomorrow, we will stay home.',
        explanation: 'ในอนุประโยคที่ขึ้นต้นด้วย If ห้ามใส่ will ให้ใช้ Present Simple (rains) แทน',
      },
    ],
    summary: {
      keyTakeaway: 'Future Simple (Will) = ตัดสินใจเดี๋ยวนั้น สัญญา คาดคะเนลอยๆ',
      quickFormula: 'Subject + will + V.inf | ปฏิเสธ: won\'t + V.inf',
      mustRememberWords: ['tomorrow', 'next week', 'soon', 'I think'],
      dangerTrap: 'อย่าเติม s/es หรือผันกริยาที่อยู่หลัง will เด็ดขาด!',
      realLifeExample: 'เวลาเสนอช่วยคนอื่น "That bag looks heavy, I will carry it for you!"',
    },
  },

  // 10. Future Continuous
  {
    id: 'future-continuous',
    nameEn: 'Future Continuous Tense',
    nameTh: 'อนาคตกาลกำลังกระทำ (กำลังดำเนินอยู่ ณ เวลาหนึ่งในอนาคต)',
    group: 'future',
    level: 'intermediate',
    tagline: 'ใช้บอกว่า ณ เวลานั้นในอนาคต จะกำลังทำสิ่งนั้นอยู่อย่างแน่นอน',
    timelineLabel: 'ช่วงเวลาที่กำลังดำเนินอยู่ ณ หมุดเวลาในอนาคต (Will Be Happening)',
    timelinePosition: {
      relativeTime: 'future',
      isContinuous: true,
      isPerfect: false,
      descriptionTh: 'คลื่นเหตุการณ์ที่กำลังเคลื่อนไหวดำเนินอยู่ ณ เวลาที่กำหนดในอนาคต',
    },
    whatIsIt: {
      overview: 'Future Continuous ใช้จินตนาการภาพไปยังอนาคต ณ เวลาที่ระบุ แล้วมองเห็นตัวเองกำลังทำกิจกรรมนั้นอยู่ระหว่างทาง หรือใช้ถามไถ่แผนการของผู้อื่นอย่างสุภาพเป็นพิเศษ',
      coreConcept: 'เหมือนการนัดหมายที่บอกล่วงหน้าว่า "เวลานั้นอย่าเพิ่งกวนนะ เพราะฉันจะกำลังติดพันกับสิ่งนี้อยู่"',
      realLifeAnalogy: 'เหมือนคุณบอกเพื่อนว่า "พรุ่งนี้ตอนบ่าย 2 โมงอย่าโทรมานะ เพราะตอนนั้นฉันจะกำลังสอบวิชาภาษาอังกฤษอยู่"',
    },
    whenToUse: {
      timeframe: 'เหตุการณ์ที่จะกำลังดำเนินอยู่ ณ จุดเวลาเจาะจงในอนาคต',
      points: [
        {
          title: '1. กำลังดำเนินอยู่ ณ เวลาที่แน่นอนในอนาคต (Action in progress at a specific future time)',
          description: 'บอกกิจกรรมที่กำลังทำอยู่ ณ เวลานั้น',
          exampleMini: 'This time tomorrow, I will be flying to Tokyo. (เวลานี้ของวันพรุ่งนี้ ฉันจะกำลังบินอยู่บนฟ้ามุ่งหน้าไปโตเกียว)',
        },
        {
          title: '2. การถามแผนการของผู้อื่นอย่างสุภาพนุ่มนวล (Polite inquiry about plans)',
          description: 'ถามเพื่อเช็คว่าจะสะดวกไหม โดยไม่ดูเป็นการก้าวก่าย',
          exampleMini: 'Will you be using the printer this afternoon? (บ่ายนี้คุณจะใช้เครื่องปริ้นท์หรือเปล่าครับ พอดีผมจะขอยืมใช้หน่อย)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'บอกว่ากิจกรรมนั้นจะ "กำลังดำเนินอยู่ (In progress)" ไม่ใช่เพิ่งเริ่มต้น ณ เวลานั้น',
      comparisonWithSimilar: {
        otherTenseName: 'Future Simple',
        thisTenseSentence: 'At 8 PM, I will be having dinner with my family. (ตอน 2 ทุ่ม ฉันจะกำลังนั่งทานข้าวกับครอบครัวอยู่ = ทานไปแล้วครึ่งทาง)',
        otherTenseSentence: 'At 8 PM, I will have dinner. (ตอน 2 ทุ่ม ฉันจะเริ่มทานข้าว = เพิ่งลงมือกินตอน 2 ทุ่ม)',
        meaningDifference: 'Future Continuous สื่อว่าการทานอาหารเริ่มไปก่อน 2 ทุ่ม และ 2 ทุ่มคือช่วงเวลาที่กำลังเคี้ยวอาหารอยู่',
      },
    },
    structure: {
      affirmative: 'Subject + will + be + V.ing',
      negative: 'Subject + will not (won\'t) + be + V.ing',
      question: 'Will + Subject + be + V.ing...?',
      subjectRules: 'ประธานทุกตัวใช้ will be เหมือนกันหมด',
      verbRules: 'กริยาหลักเติม -ing เสมอ โดยอยู่หลัง be',
      exceptions: 'Stative Verbs ไม่ใช้ในรูปนี้',
      auxiliaryExplanation: 'มี will + be เป็นกริยาช่วยร่วมกับ V.ing',
    },
    examples: {
      affirmative: [
        {
          id: 'futc-aff-1',
          type: 'affirmative',
          english: 'Don\'t call me between 3 and 5 PM because I will be attending an important meeting.',
          phoneticThai: 'โดนท์ คอล มี บิทวีน ทรี แอนด์ ไฟฟว์ พีเอ็ม บิคอส ไอ วิล บี แอทเทนดิง แอน อิมพอร์ตันท มีททิง',
          translationThai: 'อย่าโทรหาฉันระหว่างช่วงบ่าย 3 ถึง 5 โมงนะ เพราะตอนนั้นฉันจะกำลังเข้าประชุมสำคัญอยู่',
          reasoning: 'จะกำลังติดพันกับการประชุมตลอดช่วงเวลาดังกล่าวในอนาคต',
        },
      ],
      negative: [
        {
          id: 'futc-neg-1',
          type: 'negative',
          english: 'We won\'t be using the meeting room tomorrow morning.',
          phoneticThai: 'วี วอนท์ บี ยูสซิง เดอะ มีททิง รูม ทูมอโรว มอร์นิง',
          translationThai: 'พวกเราจะไม่ได้ใช้งานห้องประชุมในเช้าวันพรุ่งนี้ (คนอื่นสามารถจองได้)',
          reasoning: 'บอกตารางงานเพื่อเปิดทางให้ผู้อื่นใช้งาน',
        },
      ],
      question: [
        {
          id: 'futc-q-1',
          type: 'question',
          english: 'Will you be staying at the office late tonight?',
          phoneticThai: 'วิล ยู บี สเตย์ยิง แอท ดิ ออฟฟิศ เลท ทูไนท์',
          translationThai: 'คืนนี้คุณจะอยู่ดึกที่ออฟฟิศหรือเปล่าครับ?',
          reasoning: 'ถามแผนการของเพื่อนร่วมงานอย่างสุภาพ',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-futc-1',
        word: 'this time tomorrow',
        phoneticThai: 'ดิส ไทม์ ทูมอโรว',
        translation: 'เวลานี้ของวันพรุ่งนี้',
        partOfSpeech: 'Phrase',
        exampleSentence: 'This time tomorrow, we will be relaxing at the beach.',
        examplePhonetic: 'ดิส ไทม์ ทูมอโรว วี วิล บี รีแลกซิง แอท เดอะ บีช',
        exampleTranslation: 'เวลานี้ของวันพรุ่งนี้ พวกเราจะกำลังนอนพักผ่อนอยู่ที่ชายหาด',
        tenseId: 'future-continuous',
      },
    ],
    signalWords: [
      { word: 'this time tomorrow / next week', phoneticThai: 'ดิส ไทม์ ...', translation: 'เวลานี้ของวันพรุ่งนี้ / สัปดาห์หน้า' },
      { word: 'at [เวลา] tomorrow', phoneticThai: 'แอท ... ทูมอโรว', translation: 'ตอนเวลา... พรุ่งนี้' },
    ],
    signalWordCaution: 'เป็น Tense ที่ช่วยให้ภาษาอังกฤษของคุณดูสุภาพและเป็นมืออาชีพขึ้นมากเวลาประสานงานในที่ทำงาน',
    commonMistakes: [
      {
        incorrect: 'I will be attend the meeting.',
        correct: 'I will be attending the meeting.',
        explanation: 'หลัง will be ต้องเป็นกริยาเติม -ing (attending) ไม่ใช่กริยารูปปกติ',
      },
    ],
    summary: {
      keyTakeaway: 'Future Continuous = ณ เวลานั้นในอนาคต จะกำลังทำสิ่งนั้นอยู่อย่างแน่นอน',
      quickFormula: 'Subject + will + be + V.ing',
      mustRememberWords: ['this time tomorrow', 'at [time] tomorrow'],
      dangerTrap: 'อย่าลืมใส่ be ระหว่าง will กับ V.ing!',
      realLifeExample: 'เวลาแจ้งเพื่อนร่วมงาน "I will be working remotely tomorrow."',
    },
  },

  // 11. Future Perfect
  {
    id: 'future-perfect',
    nameEn: 'Future Perfect Tense',
    nameTh: 'อนาคตสมบูรณ์ (จะเสร็จสิ้นเรียบร้อยก่อนเวลานั้นในอนาคต)',
    group: 'future',
    level: 'intermediate',
    tagline: 'ใช้กับเหตุการณ์ที่จะทำเสร็จสิ้นสมบูรณ์ 100% ก่อนถึงกำหนดเวลาในอนาคต',
    timelineLabel: 'เดดไลน์ในอนาคต โดยงานจะเสร็จสิ้นสมบูรณ์ก่อนเดดไลน์นั้น (Completed Before Future Deadline)',
    timelinePosition: {
      relativeTime: 'future',
      isContinuous: false,
      isPerfect: true,
      descriptionTh: 'การกระทำที่การันตีว่าจะจบสิ้นลงอย่างสมบูรณ์ ก่อนจุดเวลาหนึ่งในอนาคต',
    },
    whatIsIt: {
      overview: 'Future Perfect คือ "Tense แห่งเดดไลน์ (Deadline Tense)" สื่อความหมายว่า เมื่อเวลาในอนาคตจุดนั้นมาถึง การกระทำนี้จะต้อง "เสร็จเรียบร้อยไปก่อนแล้วอย่างแน่นอน"',
      coreConcept: 'มองภาพนาฬิกาเดดไลน์ เช่น สิ้นปีนี้, พรุ่งนี้ 5 โมงเย็น แล้วเรามองย้อนกลับมาว่า ก่อนถึงเวลานั้น ฉันจะทำงานนี้เสร็จเรียบร้อยแล้ว',
      realLifeAnalogy: 'เหมือนคุณสัญญากับหัวหน้าว่า "พรุ่งนี้ตอนบ่าย 4 โมง รายงานฉบับนี้จะเสร็จเรียบร้อยส่งถึงโต๊ะคุณแน่นอนครับ"',
    },
    whenToUse: {
      timeframe: 'เหตุการณ์ที่จะเสร็จสิ้นลงก่อนจุดเวลาหนึ่งในอนาคต (มักมี by หรือ by the time กำกับ)',
      points: [
        {
          title: '1. เสร็จสิ้นก่อนกำหนดเวลาในอนาคต (Action completed before a future deadline)',
          description: 'การันตีความสำเร็จของงานก่อนเดดไลน์',
          exampleMini: 'By 5 PM, I will have finished writing the report. (ก่อน 5 โมงเย็น ฉันจะเขียนรายงานนี้เสร็จสมบูรณ์เรียบร้อยแล้ว)',
        },
        {
          title: '2. ระยะเวลาสะสมที่จะครบกำหนดในอนาคต (Duration measured at a future point)',
          description: 'บอกว่าเมื่อถึงเวลานั้น จะทำสิ่งนี้มาครบระยะเวลากี่ปีแล้ว',
          exampleMini: 'By next month, we will have been married for ten years. (พอถึงเดือนหน้า พวกเราก็จะแต่งงานกันครบ 10 ปีพอดี)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'ให้ความมั่นใจแก่ผู้ฟังว่า "ก่อนถึงเส้นตาย งานเสร็จเรียบร้อยแน่ๆ"',
      comparisonWithSimilar: {
        otherTenseName: 'Future Simple',
        thisTenseSentence: 'By next Friday, I will have submitted my project. (ก่อนวันศุกร์หน้า ฉันจะส่งโปรเจกต์เสร็จเรียบร้อยแล้ว = เน้นความสำเร็จลุล่วง)',
        otherTenseSentence: 'I will submit my project next Friday. (ฉันจะส่งโปรเจกต์ในวันศุกร์หน้า = ส่งวันศุกร์พอดี)',
        meaningDifference: 'Future Perfect ชี้ว่าอาจจะส่งตั้งแต่วันพุธหรือพฤหัสบดี แต่ที่แน่ๆ ก่อนศุกร์หน้างานเสร็จชัวร์',
      },
    },
    structure: {
      affirmative: 'Subject + will + have + V.3',
      negative: 'Subject + will not (won\'t) + have + V.3',
      question: 'Will + Subject + have + V.3...?',
      subjectRules: 'ประธานทุกตัวใช้ will have เหมือนกันทั้งหมด (ห้ามใช้ will has เด็ดขาด เพราะหลัง will ต้องเป็นรูป base form คือ have เสมอ)',
      verbRules: 'ใช้กริยาช่อง 3 (Past Participle)',
      exceptions: 'ในอนุประโยคตามหลัง by the time ต้องใช้ Present Simple (ห้ามใช้ will) เช่น By the time you arrive, I will have left.',
      auxiliaryExplanation: 'will have ทำหน้าที่เป็นกริยาช่วยคู่กับ V.3',
    },
    examples: {
      affirmative: [
        {
          id: 'futp-aff-1',
          type: 'affirmative',
          english: 'By the end of this year, they will have completed the new expressway.',
          phoneticThai: 'บาย ดิ เอนด์ ออฟ ดิส เยียร์ เด วิล แฮฟว์ ค็อมพลีทิด เดอะ นิว เอ็กซเพรสเวย์',
          translationThai: 'ก่อนสิ้นปีนี้ พวกเขาจะสร้างทางด่วนสายใหม่เสร็จสมบูรณ์เรียบร้อยแล้ว',
          reasoning: 'มีกำหนดเวลาชัดเจนคือ by the end of this year และการันตีว่าการก่อสร้างจะเสร็จก่อนเวลานั้น',
        },
      ],
      negative: [
        {
          id: 'futp-neg-1',
          type: 'negative',
          english: 'I won\'t have finished the design by noon, so please give me until 3 PM.',
          phoneticThai: 'ไอ วอนท์ แฮฟว์ ฟินิชท์ เดอะ ดีไซน์ บาย นูน โซ พลีส กิฟว์ มี อันทิล ทรี พีเอ็ม',
          translationThai: 'ฉันคงจะยังออกแบบไม่เสร็จก่อนเที่ยงนี้ ขอเวลาฉันถึงบ่ายสามโมงนะคะ',
          reasoning: 'ประเมินแล้วว่างานจะไม่ลุล่วงก่อนเที่ยง',
        },
      ],
      question: [
        {
          id: 'futp-q-1',
          type: 'question',
          english: 'Will you have saved enough money by the time you retire?',
          phoneticThai: 'วิล ยู แฮฟว์ เซฟว์ด อินัฟ มันนี บาย เดอะ ไทม์ ยู รีไทร์',
          translationThai: 'คุณจะเก็บเงินได้มากพอหรือยังก่อนถึงเวลาที่คุณเกษียณอายุ?',
          reasoning: 'ถามถึงเป้าหมายทางการเงินก่อนจุดเวลาเกษียณในอนาคต',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-futp-1',
        word: 'by the end of',
        phoneticThai: 'บาย ดิ เอนด์ ออฟ',
        translation: 'ก่อนสิ้นสุด...',
        partOfSpeech: 'Phrase',
        exampleSentence: 'By the end of this week, we will know the results.',
        examplePhonetic: 'บาย ดิ เอนด์ ออฟ ดิส วีค วี วิล โน เดอะ รีซัลทส์',
        exampleTranslation: 'ก่อนสิ้นสัปดาห์นี้พวกเราจะทราบผลลัพธ์',
        tenseId: 'future-perfect',
      },
    ],
    signalWords: [
      { word: 'by + เวลาในอนาคต (by tomorrow, by next year)', phoneticThai: 'บาย ...', translation: 'ก่อน / ภายใน (เวลาในอนาคต)' },
      { word: 'by the time + Present Simple', phoneticThai: 'บาย เดอะ ไทม์', translation: 'ก่อนถึงเวลาที่...' },
    ],
    signalWordCaution: 'จำให้ขึ้นใจ: "หลัง will ต้องเป็น have เสมอ" ห้ามเขียน will has แม้ประธานจะเป็น He หรือ She ก็ตาม!',
    commonMistakes: [
      {
        incorrect: 'He will has finished his work by 6 PM.',
        correct: 'He will have finished his work by 6 PM.',
        explanation: 'หลัง modal verb (will) กริยาต้องอยู่ในรูป base form เสมอ จึงต้องใช้ have ไม่ใช่ has',
      },
      {
        incorrect: 'By the time he will come, I will have finished.',
        correct: 'By the time he comes, I will have finished.',
        explanation: 'หลัง By the time ต้องใช้ Present Simple (comes) ห้ามใส่ will ซ้ำ',
      },
    ],
    summary: {
      keyTakeaway: 'Future Perfect = จะทำเสร็จสมบูรณ์เรียบร้อยก่อนถึงกำหนดเวลาในอนาคต (สูตรคู่บุญ By...)',
      quickFormula: 'Subject + will + have + V.3',
      mustRememberWords: ['by tomorrow', 'by the end of', 'by the time'],
      dangerTrap: 'ห้ามใช้ will has เด็ดขาด ต้องเป็น will have เสมอสำหรับทุกประธาน!',
      realLifeExample: 'เวลาการันตีงานกับลูกค้า "Don\'t worry, I will have sent the files before 5 PM."',
    },
  },

  // 12. Future Perfect Continuous
  {
    id: 'future-perfect-continuous',
    nameEn: 'Future Perfect Continuous Tense',
    nameTh: 'อนาคตสมบูรณ์กำลังกระทำ (จะทำต่อเนื่องมาครบระยะเวลานั้นในอนาคต)',
    group: 'future',
    level: 'advanced',
    tagline: 'ใช้เน้นความต่อเนื่องยาวนานที่จะเกิดขึ้นไปจนถึงจุดเวลาหนึ่งในอนาคต',
    timelineLabel: 'ลูกศรความพยายามยาวไกล พุ่งทะยานไปแตะหมุดเวลาในอนาคต (Long Duration into the Future)',
    timelinePosition: {
      relativeTime: 'future',
      isContinuous: true,
      isPerfect: true,
      descriptionTh: 'การกระทำที่เริ่มมาก่อนหน้าและยังคงดำเนินต่อเนื่องไปจนถึงจุดวัดผลในอนาคต',
    },
    whatIsIt: {
      overview: 'Future Perfect Continuous เป็น Tense ที่ยาวที่สุดและซับซ้อนที่สุดในบรรดา 12 Tenses ใช้เมื่อต้องการ "นับไมล์สะสมของความต่อเนื่อง" ไปจนถึงวันใดวันหนึ่งในอนาคต',
      coreConcept: 'เน้นคำว่า "เมื่อถึงวันนั้น ฉันจะทำสิ่งนี้ติดต่อกันมานานเท่าไหร่แล้ว"',
      realLifeAnalogy: 'เหมือนคุณทำงานที่บริษัทนี้มา 9 ปีแล้ว พอถึงเดือนธันวาคมสิ้นปีนี้ คุณจะพูดได้อย่างภาคภูมิใจว่า "สิ้นปีนี้ ฉันจะทำงานที่นี่ติดต่อกันมาครบ 10 ปีพอดี!"',
    },
    whenToUse: {
      timeframe: 'บอกระยะเวลาที่ดำเนินมาอย่างต่อเนื่อง เมื่อมองไปถึงจุดเวลาหนึ่งในอนาคต',
      points: [
        {
          title: '1. นับระยะเวลาต่อเนื่องไปจนถึงจุดในอนาคต (Duration leading up to a future point)',
          description: 'เน้นย้ำความต่อเนื่องยาวนานของกิจกรรม',
          exampleMini: 'In December, she will have been teaching here for 25 years. (ในเดือนธันวาคมนี้ เธอจะสอนหนังสือที่นี่ติดต่อกันมาครบ 25 ปีเต็มแล้ว)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'เน้นย้ำ "หยาดเหงื่อและความต่อเนื่อง" ของกิจกรรมเมื่อวัดผล ณ จุดเวลาในอนาคต',
      comparisonWithSimilar: {
        otherTenseName: 'Future Perfect',
        thisTenseSentence: 'By 10 PM, I will have been studying for eight hours. (ตอน 4 ทุ่ม ฉันจะนั่งอ่านหนังสือติดต่อกันมานานถึง 8 ชั่วโมงแล้ว = เน้นความอึดและระยะเวลา)',
        otherTenseSentence: 'By 10 PM, I will have finished three books. (ตอน 4 ทุ่ม ฉันจะอ่านหนังสือจบไป 3 เล่มแล้ว = เน้นจำนวนผลงานที่ทำเสร็จ)',
        meaningDifference: 'Continuous เน้นระยะเวลาและความไม่หยุดพัก ส่วน Perfect ธรรมดาเน้นผลผลิตที่เสร็จสิ้น',
      },
    },
    structure: {
      affirmative: 'Subject + will + have + been + V.ing',
      negative: 'Subject + will not (won\'t) + have + been + V.ing',
      question: 'Will + Subject + have + been + V.ing...?',
      subjectRules: 'ประธานทุกตัวใช้ will have been เหมือนกันทั้งหมด',
      verbRules: 'กริยาหลักเติม -ing เสมอ',
      exceptions: 'Stative Verbs ห้ามใช้รูป Continuous ให้ถอยกลับไปใช้ Future Perfect ธรรมดา',
      auxiliaryExplanation: 'มี will + have + been รวมพลังกันเป็นกริยาช่วยนำหน้า V.ing',
    },
    examples: {
      affirmative: [
        {
          id: 'futpc-aff-1',
          type: 'affirmative',
          english: 'Next month, we will have been living in this house for a decade.',
          phoneticThai: 'เน็กซ์ มั้นธ์ วี วิล แฮฟว์ บีน ลิฟวิง อิน ดิส เฮาส์ ฟอร์ อะ เดคเคด',
          translationThai: 'เดือนหน้า พวกเราจะอาศัยอยู่ในบ้านหลังนี้ติดต่อกันมาครบ 1 ทศวรรษ (10 ปี) พอดี',
          reasoning: 'เน้นการอยู่อาศัยที่ต่อเนื่องยาวนานเมื่อถึงหมุดเวลาเดือนหน้า',
        },
      ],
      negative: [
        {
          id: 'futpc-neg-1',
          type: 'negative',
          english: 'By next year, he won\'t have been working here long enough to qualify for the pension.',
          phoneticThai: 'บาย เน็กซ์ เยียร์ ฮี วอนท์ แฮฟว์ บีน เวิร์กกิง เฮียร์ ลอง อินัฟ ทู ควอลิฟาย ฟอร์ เดอะ เพนชัน',
          translationThai: 'เมื่อถึงปีหน้า เขาจะยังทำงานที่นี่ไม่นานพอที่จะมีสิทธิ์ได้รับเงินบำนาญ',
          reasoning: 'ระยะเวลาสะสมยังไม่ถึงเกณฑ์ที่กำหนด',
        },
      ],
      question: [
        {
          id: 'futpc-q-1',
          type: 'question',
          english: 'By midnight, will you have been driving for ten hours straight?',
          phoneticThai: 'บาย มิดไนท์ วิล ยู แฮฟว์ บีน ไดรฟวิง ฟอร์ เท็น เอาเออรส์ สเตรท',
          translationThai: 'ก่อนเที่ยงคืนนี้ คุณจะขับรถรวดเดียวติดต่อกันมานานถึง 10 ชั่วโมงเลยใช่ไหม?',
          reasoning: 'ถามถึงความต่อเนื่องของการขับรถอันยาวนาน',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-futpc-1',
        word: 'decade',
        phoneticThai: 'เดคเคด',
        translation: 'ทศวรรษ, รอบ 10 ปี',
        partOfSpeech: 'Noun',
        exampleSentence: 'They celebrated a decade of success.',
        examplePhonetic: 'เด เซเลเบรทิด อะ เดคเคด ออฟ ซัคเซส',
        exampleTranslation: 'พวกเขาฉลองความสำเร็จครบรอบหนึ่งทศวรรษ',
        tenseId: 'future-perfect-continuous',
      },
    ],
    signalWords: [
      { word: 'by [เวลาอนาคต] + for [ระยะเวลา]', phoneticThai: 'บาย ... ฟอร์ ...', translation: 'เมื่อถึง... จะทำมาเป็นเวลา...' },
    ],
    signalWordCaution: 'Tense นี้ไม่ค่อยได้ยินในการสนทนาธรรมดาทั่วไป แต่เป็นอาวุธสำคัญในการเขียนวิชาการ นิยาย และการสอบระดับสูง',
    commonMistakes: [
      {
        incorrect: 'By next year, I will have been knowing him for 5 years.',
        correct: 'By next year, I will have known him for 5 years.',
        explanation: 'know เป็น Stative Verb ห้ามใช้ Continuous ต้องใช้ Future Perfect (will have known)',
      },
    ],
    summary: {
      keyTakeaway: 'Future Perfect Continuous = เมื่อถึงเวลานั้นในอนาคต จะทำสิ่งนี้ต่อเนื่องมาครบระยะเวลาเท่าไหร่',
      quickFormula: 'Subject + will + have + been + V.ing',
      mustRememberWords: ['by next [year/month] ... for [X] years'],
      dangerTrap: 'อย่าลืมทั้ง have และ been หน้า V.ing และอย่าใช้กับ Stative Verbs',
      realLifeExample: 'เวลาฉลองวาระครบรอบ "In June, we will have been dating for five years!"',
    },
  },
];
