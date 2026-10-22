import { TenseLesson } from '../../types/tense';

export const pastTenses: TenseLesson[] = [
  // 5. Past Simple
  {
    id: 'past-simple',
    nameEn: 'Past Simple Tense',
    nameTh: 'อดีตกาลธรรมดา (เรื่องในอดีตที่จบลงแล้ว)',
    group: 'past',
    level: 'beginner',
    tagline: 'ใช้กับเหตุการณ์ที่เกิดขึ้นและจบสิ้นลงอย่างสมบูรณ์ในอดีต มักมีเวลาเจาะจงกำกับ',
    timelineLabel: 'จุดหมุดปักในอดีต จบสิ้นไปแล้วโดยสิ้นเชิง (Finished Past Point)',
    timelinePosition: {
      relativeTime: 'past',
      isContinuous: false,
      isPerfect: false,
      descriptionTh: 'จุดเวลาในอดีตที่ถูกปิดฉากลงแล้ว ไม่มีความเกี่ยวข้องกับปัจจุบันอีกต่อไป',
    },
    whatIsIt: {
      overview: 'Past Simple เป็น Tense หลักของการ "เล่าเรื่อง (Storytelling)" และ "ประวัติศาสตร์" ใช้พูดถึงสิ่งใดก็ตามที่เกิดขึ้นในอดีต และตายสนิทไปแล้วในอดีต ณ จุดเวลาใดเวลาหนึ่ง',
      coreConcept: 'เหมือนกล่องปิดผนึกที่เก็บไว้ในห้องใต้หลังคา เหตุการณ์นั้นเกิดขึ้นแล้ว ปิดกล่องแล้ว จบแล้ว ณ เวลาที่อ้างถึง',
      realLifeAnalogy: 'เหมือนเวลาเราเปิดดูรูปถ่ายเก่าๆ เมื่อวาน หรือปีกลาย "ฉันไปเชียงใหม่มาเมื่อปีที่แล้ว" ตอนนี้คุณไม่ได้อยู่ที่นั่นแล้ว การเดินทางครั้งนั้นจบลงแล้ว',
    },
    whenToUse: {
      timeframe: 'เหตุการณ์ที่เริ่มต้นและสิ้นสุดลงแล้วในอดีต โดยมีเวลาบอกไว้ชัดเจนหรือเป็นที่เข้าใจกัน',
      points: [
        {
          title: '1. เหตุการณ์ที่จบแล้วในอดีตโดยระบุเวลาชัดเจน (Completed Action at a Definite Time)',
          description: 'มีคำระบุเวลา เช่น yesterday, last week, in 2018, two hours ago',
          exampleMini: 'I visited my grandparents yesterday. (ฉันไปเยี่ยมคุณปู่คุณย่ามาเมื่อวานนี้)',
        },
        {
          title: '2. เหตุการณ์ที่เกิดต่อเนื่องกันเป็นลำดับในอดีต (Series of Completed Actions)',
          description: 'เล่าขั้นตอนการกระทำ เช่น ทำสิ่งนี้ แล้วทำสิ่งนั้น ต่อด้วยสิ่งโน้น',
          exampleMini: 'He woke up, brushed his teeth, and left the house. (เขาตื่นนอน แปรงฟัน แล้วออกจากบ้าน)',
        },
        {
          title: '3. นิสัยหรือสภาพในอดีตที่ไม่ทำอีกแล้ว (Past Habits / States)',
          description: 'สิ่งที่เคยทำเป็นประจำในอดีต แต่ปัจจุบันเลิกทำแล้ว (มักใช้คู่กับ used to ได้ด้วย)',
          exampleMini: 'When I was young, I lived in a small village. (ตอนที่ฉันยังเด็ก ฉันเคยอาศัยอยู่ในหมู่บ้านเล็กๆ)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'ใช้เพื่อบอกข้อเท็จจริงในอดีตที่ "ตัดขาดจากปัจจุบันแล้ว" และมักระบุเวลาชัดเจนว่าเกิดขึ้นเมื่อไร',
      comparisonWithSimilar: {
        otherTenseName: 'Present Perfect',
        thisTenseSentence: 'I lived in London for two years. (ฉันเคยอยู่ที่ลอนดอนเป็นเวลา 2 ปี = ตอนนี้ไม่ได้อยู่ที่ลอนดอนแล้ว)',
        otherTenseSentence: 'I have lived in London for two years. (ฉันอยู่ที่ลอนดอนมา 2 ปีแล้ว = ตอนนี้ก็ยังคงอยู่ที่ลอนดอน)',
        meaningDifference: 'Past Simple ชัดเจนว่า "อดีตจบลงแล้ว ไม่ได้อยู่ที่นั่นแล้ว" แต่ Present Perfect สื่อว่า "เริ่มอยู่ตั้งแต่ 2 ปีก่อน และตอนนี้ก็ยังอยู่ที่นั่น"',
      },
    },
    structure: {
      affirmative: 'Subject + V.2 (Past Simple form)',
      negative: 'Subject + did + not + V.inf (กริยาแท้รูปเดิม)',
      question: 'Did + Subject + V.inf...?',
      subjectRules: 'ประธานทุกตัว (I, You, We, They, He, She, It) ใช้กริยาช่อง 2 เหมือนกันทั้งหมด ไม่ต้องผันตามเอกพจน์/พหูพจน์',
      verbRules: 'Regular Verbs เติม -ed (work -> worked, play -> played) / Irregular Verbs เปลี่ยนรูป (go -> went, see -> saw, buy -> bought, eat -> ate)',
      exceptions: 'Verb to be ในอดีตมี 2 รูป คือ was (ใช้กับ I, He, She, It) และ were (ใช้กับ You, We, They) เมื่อทำเป็นปฏิเสธและคำถาม ไม่ต้องใช้ did มาช่วย เช่น He was happy. / He was not happy. / Was he happy?',
      auxiliaryExplanation: 'กริยาช่วยคือ Did สำหรับประโยคปฏิเสธและคำถาม เมื่อมี did แล้ว กริยาหลักต้องกลับไปเป็นรูปพื้นฐาน (Infinitive ช่อง 1 รูปไม่ผัน) เสมอ',
    },
    examples: {
      affirmative: [
        {
          id: 'past-aff-1',
          type: 'affirmative',
          english: 'She bought a new laptop last Friday.',
          phoneticThai: 'ชี บอท อะ นิว แลปท็อป ลาสต์ ไฟรเดย์',
          translationThai: 'เธอซื้อแล็ปท็อปเครื่องใหม่เมื่อวันศุกร์ที่แล้ว',
          reasoning: 'ใช้ bought (ช่อง 2 ของ buy) เพราะมีคำบอกเวลาชัดเจนคือ last Friday บ่งบอกถึงเหตุการณ์ที่เสร็จสิ้นไปแล้ว',
        },
        {
          id: 'past-aff-2',
          type: 'affirmative',
          english: 'We watched an inspiring movie last night.',
          phoneticThai: 'วี วอชท์ แอน อินสไปริง มูวี ลาสต์ ไนท์',
          translationThai: 'พวกเราดูหนังที่สร้างแรงบันดาลใจเรื่องหนึ่งเมื่อคืนนี้',
          reasoning: 'watched เป็น Regular verb เติม -ed เกิดขึ้นและจบลงแล้วเมื่อคืนนี้',
        },
      ],
      negative: [
        {
          id: 'past-neg-1',
          type: 'negative',
          english: 'I did not receive your message yesterday.',
          phoneticThai: 'ไอ ดิด น็อต รีซีฟว์ ยัวร์ เมสเสจ เยสเตอร์เดย์',
          translationThai: 'ฉันไม่ได้รับข้อความของคุณเมื่อวานนี้',
          reasoning: 'ใช้ did not (didn\'t) นำหน้ากริยาช่อง 1 (receive) กริยา receive ไม่ต้องผันเป็นช่อง 2 เพราะ did รับหน้าที่บอกอดีตแล้ว',
        },
      ],
      question: [
        {
          id: 'past-q-1',
          type: 'question',
          english: 'Did you lock the front door before leaving?',
          phoneticThai: 'ดิด ยู ล็อค เดอะ ฟรอนท์ ดอร์ บีฟอร์ ลีฟวิง',
          translationThai: 'คุณได้ล็อคประตูหน้าบ้านก่อนออกจากบ้านหรือเปล่า?',
          reasoning: 'ใช้ Did ขึ้นต้นคำถามเพื่อถามถึงการกระทำในอดีต และกริยา lock กลับเป็นรูปปกติ',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-past-1',
        word: 'yesterday',
        phoneticThai: 'เยสเตอร์เดย์',
        translation: 'เมื่อวานนี้',
        partOfSpeech: 'Adverb',
        exampleSentence: 'I saw him yesterday at the supermarket.',
        examplePhonetic: 'ไอ ซอ ฮิม เยสเตอร์เดย์ แอท เดอะ ซูเปอร์มาร์เก็ต',
        exampleTranslation: 'ฉันเจอเขาเมื่อวานนี้ที่ซูเปอร์มาร์เก็ต',
        tenseId: 'past-simple',
      },
      {
        id: 'voc-past-2',
        word: 'ago',
        phoneticThai: 'อะโก',
        translation: 'ที่แล้ว, ผ่านมาแล้ว (วางหลังคำบอกเวลา เช่น three days ago)',
        partOfSpeech: 'Adverb',
        exampleSentence: 'The bus left ten minutes ago.',
        examplePhonetic: 'เดอะ บัส เลฟต์ เท็น มินิทส์ อะโก',
        exampleTranslation: 'รถเมล์ออกไปเมื่อสิบนาทีที่แล้ว',
        tenseId: 'past-simple',
      },
    ],
    signalWords: [
      { word: 'yesterday', phoneticThai: 'เยสเตอร์เดย์', translation: 'เมื่อวานนี้' },
      { word: 'last night / week / month / year', phoneticThai: 'ลาสต์ ไนท์ / วีค / มั้นธ์ / เยียร์', translation: 'เมื่อคืน / สัปดาห์ / เดือน / ปีที่แล้ว' },
      { word: '... ago (two days ago)', phoneticThai: 'อะโก', translation: '...ที่แล้ว (สองวันที่แล้ว)' },
      { word: 'in 2010 / in the past', phoneticThai: 'อิน ... / อิน เดอะ พาสต์', translation: 'ในปี 2010 / ในอดีต' },
    ],
    signalWordCaution: 'เมื่อเห็นคำบอกเวลาอดีตที่ชัดเจนเหล่านี้ อย่าใช้ Present Perfect ให้เลือกใช้ Past Simple กริยาช่อง 2 เท่านั้น',
    commonMistakes: [
      {
        incorrect: 'I didn\'t saw him yesterday.',
        correct: 'I didn\'t see him yesterday.',
        explanation: 'เมื่อมี didn\'t แล้ว กริยาตามหลังต้องเป็นรูปพื้นฐาน (see) ห้ามใช้ช่อง 2 (saw) ซ้ำซ้อน',
      },
      {
        incorrect: 'Where did you went?',
        correct: 'Where did you go?',
        explanation: 'เช่นเดียวกัน มี did ในประโยคคำถามแล้ว กริยาแท้ต้องเป็น go (ช่อง 1)',
      },
    ],
    summary: {
      keyTakeaway: 'Past Simple = เรื่องในอดีตที่จบลงแล้ว มีเวลาเจาะจงชัดเจน กริยาใช้ช่อง 2',
      quickFormula: 'Subject + V.2 | ปฏิเสธ: didn\'t + V.inf | คำถาม: Did + S + V.inf?',
      mustRememberWords: ['yesterday', 'last...', '...ago', 'in [ปีอดีต]'],
      dangerTrap: 'ระวังเวลาใช้ did หรือ didn\'t กริยาตัวหลังต้องเปลี่ยนกลับเป็นช่อง 1 เสมอ!',
      realLifeExample: 'เวลาตอบคำถามว่าเมื่อวานทำอะไร "Yesterday, I relaxed at home and cooked pasta."',
    },
  },

  // 6. Past Continuous
  {
    id: 'past-continuous',
    nameEn: 'Past Continuous Tense',
    nameTh: 'อดีตกาลกำลังกระทำ (กำลังดำเนินอยู่ ณ จุดเวลาในอดีต)',
    group: 'past',
    level: 'intermediate',
    tagline: 'ใช้บอกว่า ณ วินาทีนั้นในอดีต กำลังทำอะไรอยู่ หรือเป็นฉากหลังตอนที่มีอีกเหตุการณ์หนึ่งเข้ามาแทรก',
    timelineLabel: 'ช่วงเวลาที่กำลังเคลื่อนไหวดำเนินอยู่ ณ จุดหนึ่งในอดีต (Was Happening)',
    timelinePosition: {
      relativeTime: 'past',
      isContinuous: true,
      isPerfect: false,
      descriptionTh: 'คลื่นเหตุการณ์ที่กำลังดำเนินอยู่ ณ เวลาหนึ่งในอดีต ก่อนที่จะจบลง',
    },
    whatIsIt: {
      overview: 'Past Continuous คือการกดปุ่ม "หยุดภาพ (Freeze frame)" ไปยังช่วงเวลาหนึ่งในอดีต แล้วซูมดูว่าในตอนนั้น ใครกำลังทำอะไรอยู่ มักใช้ร่วมกับ Past Simple เมื่อมีเหตุการณ์หนึ่งกำลังดำเนินอยู่เป็นฉากหลัง แล้วมีอีกเหตุการณ์หนึ่งเข้ามาขัดจังหวะ',
      coreConcept: 'เปรียบเสมือนฉากหลังของภาพยนตร์ (Background Action) เช่น "ฉันกำลังเดินเล่นอยู่ในสวนอย่างเพลิดเพลิน (Past Cont)... ทันใดนั้นฟ้าก็ผ่าลงมา! (Past Simple เข้ามาแทรก)"',
      realLifeAnalogy: 'เหมือนเวลาตำรวจถามว่า "เมื่อคืนตอน 2 ทุ่ม คุณกำลังทำอะไรอยู่?" คุณต้องตอบด้วย Past Continuous ว่า "ตอนสองทุ่มพอดีเป๊ะ ฉันกำลังทานข้าวเย็นอยู่ครับ"',
    },
    whenToUse: {
      timeframe: 'เหตุการณ์ที่กำลังดำเนินอยู่ ณ เวลาเจาะจงในอดีต หรือเหตุการณ์ที่กำลังดำเนินอยู่แล้วถูกแทรก',
      points: [
        {
          title: '1. กำลังเกิดขึ้น ณ เวลาที่ระบุเจาะจงในอดีต (Action in Progress at Specific Time)',
          description: 'บอกว่ากำลังทำอะไรอยู่ตอนเวลานั้นพอดี',
          exampleMini: 'At 8 PM last night, I was watching television. (ตอนสองทุ่มเมื่อคืน ฉันกำลังดูทีวีอยู่)',
        },
        {
          title: '2. เหตุการณ์กำลังดำเนินอยู่ แล้วมีอีกเหตุการณ์เข้ามาแทรก (Interrupted Action)',
          description: 'เหตุการณ์ที่กำลังดำเนินอยู่ใช้ Past Continuous ส่วนเหตุการณ์ที่เข้ามาแทรกใช้ Past Simple (เชื่อมด้วย While หรือ When)',
          exampleMini: 'I was taking a shower when the phone rang. (ฉันกำลังอาบน้ำอยู่ตอนที่โทรศัพท์ดังขึ้น)',
        },
        {
          title: '3. สองเหตุการณ์กำลังดำเนินไปพร้อมๆ กันในอดีต (Parallel Actions)',
          description: 'ทำสิ่งสองอย่างคู่ขนานกันไปในเวลาเดียวกันในอดีต (มักใช้ While เชื่อม)',
          exampleMini: 'While she was studying, her brother was playing games. (ในขณะที่เธอกำลังอ่านหนังสือ น้องชายของเธอก็กำลังเล่นเกมอยู่)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'สร้างมิติทางอารมณ์และฉากหลัง (Setting the Scene) ให้เห็นว่ามีการกระทำที่ยังไม่จบ ณ ขณะนั้นในอดีต',
      comparisonWithSimilar: {
        otherTenseName: 'Past Simple',
        thisTenseSentence: 'When she arrived, I was making dinner. (ตอนที่เธอมาถึง ฉันกำลังทำอาหารเย็นอยู่ = ทำไปครึ่งหนึ่งแล้ว อาหารยังไม่เสร็จ)',
        otherTenseSentence: 'When she arrived, I made dinner. (ตอนที่เธอมาถึง ฉันจึงลงมือทำอาหารเย็น = เธอมาถึงก่อน แล้วฉันค่อยเริ่มทำ)',
        meaningDifference: 'Past Continuous แสดงว่าการทำอาหารเริ่มต้นไปก่อนหน้าแล้ว ส่วน Past Simple แสดงถึงลำดับเหตุการณ์ว่าสิ่งหนึ่งเสร็จแล้วอีกสิ่งหนึ่งจึงเริ่ม',
      },
    },
    structure: {
      affirmative: 'Subject + was / were + V.ing',
      negative: 'Subject + was / were + not + V.ing',
      question: 'Was / Were + Subject + V.ing...?',
      subjectRules: 'I, He, She, It, นามเอกพจน์ ใช้ was | You, We, They, นามพหูพจน์ ใช้ were',
      verbRules: 'กริยาหลักเติม -ing ตามกฎการเติม -ing ทั่วไป',
      exceptions: 'เช่นเดิม Stative verbs (เช่น realize, seem, know) ไม่ใช้ในรูป Continuous ให้ใช้ Past Simple ธรรมดา',
      auxiliaryExplanation: 'was/were คือรูปอดีตของ Verb to be ทำหน้าที่เป็นกริยาช่วยเพื่อบอกทั้งกาลอดีตและสภาพกำลังกระทำ',
    },
    examples: {
      affirmative: [
        {
          id: 'pastc-aff-1',
          type: 'affirmative',
          english: 'It was raining heavily when we left the office.',
          phoneticThai: 'อิท วอส เรนนิง เฮฟวิลี เวน วี เลฟต์ ดิ ออฟฟิศ',
          translationThai: 'ฝนกำลังตกหนักมากตอนที่พวกเราออกจากที่ทำงาน',
          reasoning: 'ฝนกำลังตกอยู่ก่อนแล้ว (was raining - Past Cont) ตอนที่พวกเราก้าวขาออกจากออฟฟิศ (left - Past Simple เข้ามาแทรก)',
        },
      ],
      negative: [
        {
          id: 'pastc-neg-1',
          type: 'negative',
          english: 'They were not paying attention during the lecture.',
          phoneticThai: 'เด เวิร์ น็อต เพย์ยิง แอทเทนเชิน ดิวริง เดอะ เลคเชอร์',
          translationThai: 'พวกเขาไม่ได้กำลังตั้งใจฟังระหว่างการบรรยาย',
          reasoning: 'were not (weren\'t) + V.ing บอกว่าตลอดช่วงเวลานั้น ไม่ได้มีสมาธิอยู่',
        },
      ],
      question: [
        {
          id: 'pastc-q-1',
          type: 'question',
          english: 'What were you doing at 9 PM yesterday?',
          phoneticThai: 'วอท เวิร์ ยู ดูอิง แอท ไนน พีเอ็ม เยสเตอร์เดย์',
          translationThai: 'คุณกำลังทำอะไรอยู่ตอนเวลา 3 ทุ่มเมื่อวานนี้?',
          reasoning: 'ถามถึงกิจกรรมที่กำลังดำเนินอยู่ ณ จุดเวลา 3 ทุ่มเมื่อวานนี้พอดี',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-pastc-1',
        word: 'while',
        phoneticThai: 'วายล์',
        translation: 'ในขณะที่ (มักตามด้วย Past Continuous เช่น While I was reading...)',
        partOfSpeech: 'Phrase',
        exampleSentence: 'While he was driving, he listened to a podcast.',
        examplePhonetic: 'วายล์ ฮี วอส ไดรฟวิง ฮี ลิสเซินด์ ทู อะ พอดแคสต์',
        exampleTranslation: 'ในขณะที่เขากำลังขับรถ เขาฟังพอดแคสต์ไปด้วย',
        tenseId: 'past-continuous',
      },
      {
        id: 'voc-pastc-2',
        word: 'interrupt',
        phoneticThai: 'อินเทอะรัปต์',
        translation: 'ขัดจังหวะ, แทรกแซง',
        partOfSpeech: 'Verb',
        exampleSentence: 'A loud noise interrupted my sleep.',
        examplePhonetic: 'อะ ลาวด์ น้อยส์ อินเทอะรัปทิด มาย สลีพ',
        exampleTranslation: 'เสียงดังขัดจังหวะการนอนของฉัน',
        tenseId: 'past-continuous',
      },
    ],
    signalWords: [
      { word: 'when + Past Simple', phoneticThai: 'เวน', translation: 'เมื่อ... (มักตามด้วยเหตุการณ์ที่เข้ามาแทรก)' },
      { word: 'while + Past Continuous', phoneticThai: 'วายล์', translation: 'ในขณะที่... (ตามด้วยเหตุการณ์ที่กำลังทำอยู่)' },
      { word: 'at [เวลาเจาะจง] yesterday', phoneticThai: 'แอท ... เยสเตอร์เดย์', translation: 'ตอนเวลา...เมื่อวาน' },
    ],
    signalWordCaution: 'จำสูตรง่ายๆ: While มักตามด้วย Past Continuous (While + was/were + ing) ส่วน When มักตามด้วย Past Simple (When + V.2)',
    commonMistakes: [
      {
        incorrect: 'When I was walking home, it was starting to rain.',
        correct: 'When I was walking home, it started to rain.',
        explanation: 'ฝนเริ่มต้นตกเป็นเหตุการณ์สั้นๆ ที่เข้ามาแทรก จึงควรใช้ Past Simple (started) ไม่ใช่ was starting',
      },
    ],
    summary: {
      keyTakeaway: 'Past Continuous = กำลังทำอยู่ ณ จุดเวลาในอดีต หรือเป็นฉากหลังก่อนที่จะมีเหตุการณ์อื่นเข้ามาแทรก',
      quickFormula: 'Subject + was/were + V.ing',
      mustRememberWords: ['while', 'when', 'at [เวลา] yesterday'],
      dangerTrap: 'แยกให้ออกว่าอันไหน "กำลังทำอยู่ (was/were V.ing)" และอันไหน "เข้ามาแทรกทีหลัง (V.2)"',
      realLifeExample: 'เวลาแก้ตัวเมื่อเพื่อนโทรมาแล้วไม่ได้รับ "Sorry, I was driving when you called!"',
    },
  },

  // 7. Past Perfect
  {
    id: 'past-perfect',
    nameEn: 'Past Perfect Tense',
    nameTh: 'อดีตสมบูรณ์ (อดีตของอดีต เกิดก่อนอีกเหตุการณ์หนึ่ง)',
    group: 'past',
    level: 'intermediate',
    tagline: 'ใช้บอกเหตุการณ์ที่เกิดขึ้นและสิ้นสุดลง ก่อนที่อีกเหตุการณ์หนึ่งในอดีตจะเกิดขึ้นตามมา',
    timelineLabel: 'อดีตขั้นที่ 1 (เกิดก่อน) -> ส่งต่อไปยังอดีตขั้นที่ 2 (เกิดหลัง)',
    timelinePosition: {
      relativeTime: 'past',
      isContinuous: false,
      isPerfect: true,
      descriptionTh: 'เกิดขึ้นเสร็จสมบูรณ์ไปแล้ว ก่อนที่จุดเวลาอดีตอีกจุดหนึ่งจะเกิดขึ้น',
    },
    whatIsIt: {
      overview: 'Past Perfect หรือที่ครูหลายท่านเรียกว่า "อดีตของอดีต" เป็น Tense ที่แทบไม่เคยอยู่เดี่ยวๆ แต่มักอยู่เป็น "คู่แฝด" กับ Past Simple เพื่อชี้ชัดว่าในอดีตที่มีสองเหตุการณ์เกิดขึ้นนั้น "สิ่งไหนเกิดขึ้นก่อน สิ่งไหนเกิดขึ้นทีหลัง"',
      coreConcept: 'เหตุการณ์ที่เกิดก่อน = มีสถานะเก่าแก่กว่า = ใช้ Past Perfect (had + V.3) / เหตุการณ์ที่เกิดทีหลัง = ใช้ Past Simple (V.2)',
      realLifeAnalogy: 'เหมือนคุณรีบวิ่งไปสถานีรถไฟ แต่พอไปถึง ปรากฏว่ารถไฟออกไปแล้ว "รถไฟออกไปก่อน (Past Perfect)" แล้วคุณ "เพิ่งไปถึงทีหลัง (Past Simple)"',
    },
    whenToUse: {
      timeframe: 'เหตุการณ์ที่เสร็จสิ้นลงโดยสมบูรณ์ ก่อนอีกเหตุการณ์หนึ่งในอดีตจะเกิดขึ้น',
      points: [
        {
          title: '1. เหตุการณ์ที่เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต (Earlier Past Event)',
          description: 'บอกลำดับเวลาที่ชัดเจนในอดีต (เชื่อมด้วย before, after, by the time)',
          exampleMini: 'When I arrived at the station, the train had already left. (ตอนที่ฉันไปถึงสถานี รถไฟได้แล่นออกไปก่อนหน้านั้นแล้ว)',
        },
        {
          title: '2. เงื่อนไขสมมติในอดีตที่เป็นไปไม่ได้ (Third Conditional)',
          description: 'ใช้ในโครงสร้าง If + Past Perfect เพื่อบอกความเสียดายในอดีต',
          exampleMini: 'If I had studied harder, I would have passed the exam. (ถ้าตอนนั้นฉันตั้งใจเรียนมากกว่านี้ ฉันคงสอบผ่านไปแล้ว)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'ป้องกันความสับสนทางลำดับเวลา ทำให้ผู้ฟังรู้ทันทีว่าการกระทำใดสำเร็จลุล่วงไปก่อนหน้าแล้ว',
      comparisonWithSimilar: {
        otherTenseName: 'Past Simple',
        thisTenseSentence: 'When we arrived, the movie had started. (ตอนที่เราไปถึง หนังเริ่มฉายไปก่อนหน้านั้นแล้ว = เราพลาดตอนต้นเรื่อง)',
        otherTenseSentence: 'When we arrived, the movie started. (ตอนที่เราไปถึง หนังก็เริ่มฉายพอดี = เราได้ดูตั้งแต่ต้นเรื่องทันเวลา)',
        meaningDifference: 'การใช้ had started บ่งบอกชัดเจนว่าหนังเริ่มไปก่อนที่เราจะก้าวเท้าเข้าไปในโรง',
      },
    },
    structure: {
      affirmative: 'Subject + had + V.3',
      negative: 'Subject + had + not + V.3',
      question: 'Had + Subject + V.3...?',
      subjectRules: 'ประธานทุกตัวใช้ had เหมือนกันหมด ไม่มีการแยกเอกพจน์หรือพหูพจน์',
      verbRules: 'ใช้กริยาช่อง 3 (Past Participle)',
      exceptions: 'หากมีคำเชื่อมที่บอกลำดับเวลาชัดเจนมาก เช่น before หรือ after บางครั้งเจ้าของภาษาอาจใช้ Past Simple ทั้งสองประโยคได้ แต่การใช้ Past Perfect ช่วยเพิ่มความชัดเจนและถูกต้องตามไวยากรณ์ทางการอย่างยิ่ง',
      auxiliaryExplanation: 'กริยาช่วยคือ Had (รูปอดีตของ have/has) ทำหน้าที่บอกระดับความลึกของอดีต',
    },
    examples: {
      affirmative: [
        {
          id: 'pastp-aff-1',
          type: 'affirmative',
          english: 'By the time the police arrived, the thief had escaped.',
          phoneticThai: 'บาย เดอะ ไทม์ เดอะ พะลีส อะไรฟว์ด เดอะ ทีฟ แฮด อิสเคพท์',
          translationThai: 'กว่าตำรวจจะมาถึง โจรก็ได้หลบหนีไปก่อนหน้านั้นแล้ว',
          reasoning: 'โจรหนีไปก่อน (had escaped - Past Perfect เกิดก่อน) แล้วตำรวจจึงมาถึง (arrived - Past Simple เกิดทีหลัง)',
        },
      ],
      negative: [
        {
          id: 'pastp-neg-1',
          type: 'negative',
          english: 'She had not finished the report before the deadline passed.',
          phoneticThai: 'ชี แฮด น็อต ฟินิชท์ เดอะ รีพอร์ท บีฟอร์ เดอะ เดดไลน์ พาสต์',
          translationThai: 'เธอยังทำรายงานไม่เสร็จก่อนที่เวลาเดดไลน์จะผ่านพ้นไป',
          reasoning: 'had not finished บ่งบอกสภาพที่ยังไม่ลุล่วงก่อนอีกเหตุการณ์หนึ่งจะมาถึง',
        },
      ],
      question: [
        {
          id: 'pastp-q-1',
          type: 'question',
          english: 'Had you ever visited New York before moving there in 2021?',
          phoneticThai: 'แฮด ยู เอฟเวอะ วิสิทิด นิว ยอร์ก บีฟอร์ มูฟวิง แดร์ อิน ทู ทาวซันด์ ทเวนตี วัน',
          translationThai: 'คุณเคยไปเที่ยวนิวยอร์กมาก่อนที่จะย้ายไปอยู่ที่นั่นในปี 2021 หรือไม่?',
          reasoning: 'ถามประสบการณ์ก่อนช่วงเวลาหนึ่งในอดีต',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-pastp-1',
        word: 'by the time',
        phoneticThai: 'บาย เดอะ ไทม์',
        translation: 'กว่าจะถึงเวลาที่... (ประโยคตามหลังมักเป็น Past Simple และประโยคหลักเป็น Past Perfect)',
        partOfSpeech: 'Phrase',
        exampleSentence: 'By the time we got home, the rain had stopped.',
        examplePhonetic: 'บาย เดอะ ไทม์ วี กอท โฮม เดอะ เรน แฮด สต็อปท์',
        exampleTranslation: 'กว่าพวกเราจะถึงบ้าน ฝนก็หยุดตกไปก่อนแล้ว',
        tenseId: 'past-perfect',
      },
    ],
    signalWords: [
      { word: 'by the time', phoneticThai: 'บาย เดอะ ไทม์', translation: 'กว่าจะถึงเวลาที่...' },
      { word: 'before', phoneticThai: 'บีฟอร์', translation: 'ก่อนหน้าที่จะ...' },
      { word: 'after', phoneticThai: 'อาฟเตอร์', translation: 'หลังจากที่... (After + Past Perfect)' },
      { word: 'already / just', phoneticThai: 'ออลเรดดี / จัสต์', translation: 'เรียบร้อยแล้ว / เพิ่งจะ' },
    ],
    signalWordCaution: 'อย่าใช้ Past Perfect โดดๆ ตัวเดียวถ้าไม่มีเหตุการณ์อดีตอีกเหตุการณ์หนึ่งมาเปรียบเทียบ ถ้ามีเหตุการณ์เดียวในอดีต ให้ใช้ Past Simple ปกติ',
    commonMistakes: [
      {
        incorrect: 'After he finished dinner, he had gone to bed.',
        correct: 'After he had finished dinner, he went to bed.',
        explanation: 'เขากินข้าวเย็นเสร็จก่อน (เกิดก่อน = had finished) แล้วจึงไปนอนทีหลัง (เกิดทีหลัง = went)',
      },
    ],
    summary: {
      keyTakeaway: 'Past Perfect = เหตุการณ์ที่เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต (เกิดก่อนใช้ had + V.3, เกิดหลังใช้ V.2)',
      quickFormula: 'Subject + had + V.3',
      mustRememberWords: ['by the time', 'before', 'after', 'already'],
      dangerTrap: 'อย่าใช้ Past Perfect โดยไม่มีบริบทอดีตอีกตัวมาเปรียบเทียบลำดับเวลา',
      realLifeExample: 'เวลาอธิบายสถานการณ์ตกรถหรือพลาดโอกาส "By the time I checked my email, the offer had expired."',
    },
  },

  // 8. Past Perfect Continuous
  {
    id: 'past-perfect-continuous',
    nameEn: 'Past Perfect Continuous Tense',
    nameTh: 'อดีตสมบูรณ์กำลังกระทำ (ทำต่อเนื่องยาวนานก่อนอีกเหตุการณ์ในอดีต)',
    group: 'past',
    level: 'advanced',
    tagline: 'เน้นความต่อเนื่องยาวนานของการกระทำหนึ่งในอดีต ก่อนที่จะมีอีกเหตุการณ์ในอดีตตามมาตัดจบ',
    timelineLabel: 'ลูกศรความพยายามยาวนานในอดีต พุ่งมาชนจุดเหตุการณ์อดีตจุดที่สอง',
    timelinePosition: {
      relativeTime: 'past',
      isContinuous: true,
      isPerfect: true,
      descriptionTh: 'การกระทำที่ดำเนินมาอย่างต่อเนื่องไม่หยุดในอดีต ก่อนถูกตัดตอนด้วยอีกเหตุการณ์หนึ่งในอดีต',
    },
    whatIsIt: {
      overview: 'Past Perfect Continuous คือการรวม Past Perfect (เกิดก่อน) เข้ากับ Continuous (เน้นระยะเวลาและความต่อเนื่อง) เพื่อสื่อว่า ในอดีตมีกิจกรรมหนึ่งดำเนินมาอย่างยาวนานต่อเนื่องจนกระทั่งมีอีกสิ่งหนึ่งเกิดขึ้น',
      coreConcept: 'เน้นคำว่า "เหนื่อยมานานแค่ไหนก่อนจะเกิดเรื่องนั้น" เช่น นั่งรอมา 3 ชั่วโมงกว่าหมอจะเรียก หรือ ขับรถมาตลอดคืนจนกระทั่งน้ำมันหมด',
      realLifeAnalogy: 'เหมือนคุณนั่งซ้อมเปียโนมา 4 ชั่วโมงเต็มจนนิ้วล้า แล้วจู่ๆ ไฟดับ "การซ้อมเปียโน 4 ชั่วโมง (Past Perfect Cont)" ดำเนินต่อเนื่องมาก่อนที่ "ไฟจะดับ (Past Simple)"',
    },
    whenToUse: {
      timeframe: 'เหตุการณ์ที่ดำเนินต่อเนื่องยาวนานในอดีต จนกระทั่งถึงจุดเวลาหนึ่งในอดีต',
      points: [
        {
          title: '1. เน้นความยาวนานก่อนอีกเหตุการณ์ในอดีต (Duration Before Past Event)',
          description: 'บอกว่าทำต่อเนื่องมานานเท่าไร ก่อนที่อีกเหตุการณ์หนึ่งจะเกิดขึ้น',
          exampleMini: 'They had been playing football for two hours before it started to rain. (พวกเขาเตะบอลกันมาต่อเนื่อง 2 ชั่วโมงแล้ว ก่อนที่ฝนจะเริ่มเทลงมา)',
        },
        {
          title: '2. อธิบายสาเหตุของสภาพในอดีต (Cause of a Past State)',
          description: 'บอกว่าทำไมในอดีตตอนนั้นจึงเหนื่อย เปียก หรือโกรธ',
          exampleMini: 'Her eyes were red because she had been crying. (ตาของเธอแดงก่ำเพราะเธอร้องไห้มาตลอดก่อนหน้านั้น)',
        },
      ],
    },
    whyUseIt: {
      primaryReason: 'เน้นย้ำ "ความทุ่มเท เวลา หรือความเหน็ดเหนื่อย" ในอดีต ก่อนที่อีกเหตุการณ์จะเกิดขึ้น',
      comparisonWithSimilar: {
        otherTenseName: 'Past Perfect',
        thisTenseSentence: 'He was tired because he had been working hard all day. (เขาเหนื่อยมากเพราะเขาตรากตรำทำงานหนักมาตลอดทั้งวัน = เน้นความเหน็ดเหนื่อยและระยะเวลา)',
        otherTenseSentence: 'He had finished all his work before 5 PM. (เขาเคลียร์งานทั้งหมดเสร็จก่อน 5 โมงเย็น = เน้นความสำเร็จของงาน)',
        meaningDifference: 'Continuous เน้นกระบวนการที่ยาวนาน ส่วน Perfect ธรรมดาเน้นผลลัพธ์ที่เสร็จสิ้น',
      },
    },
    structure: {
      affirmative: 'Subject + had + been + V.ing',
      negative: 'Subject + had + not + been + V.ing',
      question: 'Had + Subject + been + V.ing...?',
      subjectRules: 'ประธานทุกตัวใช้ had been เหมือนกันหมด',
      verbRules: 'กริยาหลักเติม -ing เสมอ',
      exceptions: 'Stative Verbs ห้ามใช้ในรูป Continuous ให้ใช้ Past Perfect ธรรมดาแทน',
      auxiliaryExplanation: 'มีกริยาช่วย 2 ตัวคือ had (บอกอดีตสมบูรณ์) และ been (บอกรูปต่อเนื่อง) ร่วมกับ V.ing',
    },
    examples: {
      affirmative: [
        {
          id: 'pastpc-aff-1',
          type: 'affirmative',
          english: 'We had been driving for six hours when we finally reached the hotel.',
          phoneticThai: 'วี แฮด บีน ไดรฟวิง ฟอร์ ซิกส์ เอาเออรส์ เวน วี ไฟเนิลลี รีชท์ เดอะ โฮเทล',
          translationThai: 'พวกเราขับรถติดต่อกันมานานถึง 6 ชั่วโมงในที่สุดก็ถึงโรงแรม',
          reasoning: 'เน้นการขับรถยาวนานถึง 6 ชั่วโมงติดต่อกัน ก่อนที่จะถึงโรงแรมในอดีต',
        },
      ],
      negative: [
        {
          id: 'pastpc-neg-1',
          type: 'negative',
          english: 'He had not been practicing regularly, so he failed the audition.',
          phoneticThai: 'ฮี แฮด น็อต บีน แพรคทิสซิง เรกกิวลาร์ลี โซ ฮี เฟลด ดิ ออดิชัน',
          translationThai: 'เขาไม่ได้ฝึกซ้อมอย่างสม่ำเสมอมาก่อนหน้านั้น เขาจึงสอบออดิชันไม่ผ่าน',
          reasoning: 'ชี้แจงสาเหตุของความล้มเหลวในอดีต',
        },
      ],
      question: [
        {
          id: 'pastpc-q-1',
          type: 'question',
          english: 'How long had you been waiting before the doctor called your name?',
          phoneticThai: 'ฮาว ลอง แฮด ยู บีน เวททิง บีฟอร์ เดอะ ด็อคเทอะ คอลด์ ยัวร์ เนม',
          translationThai: 'คุณนั่งรอมานานเท่าไรแล้วก่อนที่คุณหมอจะเรียกชื่อของคุณ?',
          reasoning: 'ถามระยะเวลาการรอคอยที่เกิดขึ้นก่อนเหตุการณ์ในอดีต',
        },
      ],
    },
    vocabulary: [
      {
        id: 'voc-pastpc-1',
        word: 'audition',
        phoneticThai: 'ออดิชัน',
        translation: 'การทดสอบคัดเลือกนักแสดง/นักดนตรี',
        partOfSpeech: 'Noun',
        exampleSentence: 'She prepared well for the singing audition.',
        examplePhonetic: 'ชี พรีแพร์ด เวล ฟอร์ เดอะ ซิงอิง ออดิชัน',
        exampleTranslation: 'เธอเตรียมตัวมาอย่างดีสำหรับการทดสอบร้องเพลง',
        tenseId: 'past-perfect-continuous',
      },
    ],
    signalWords: [
      { word: 'for [ระยะเวลา] before...', phoneticThai: 'ฟอร์ ... บีฟอร์', translation: 'เป็นเวลา... ก่อนที่จะ...' },
      { word: 'had been ... when...', phoneticThai: 'แฮด บีน ... เวน', translation: 'ทำมาต่อเนื่องตอนที่...' },
    ],
    signalWordCaution: 'เป็น Tense ระดับสูงที่มักพบในนิยาย การเล่าเรื่องสืบสวน หรือข้อสอบระดับสูง เช่น IELTS / TOEFL',
    commonMistakes: [
      {
        incorrect: 'I had been knowing him for three years before we worked together.',
        correct: 'I had known him for three years before we worked together.',
        explanation: 'know เป็น Stative Verb ห้ามใช้ had been knowing ต้องใช้ had known',
      },
    ],
    summary: {
      keyTakeaway: 'Past Perfect Continuous = ทำต่อเนื่องยาวนานในอดีต ก่อนอีกเหตุการณ์หนึ่งจะตามมาตัดจบ',
      quickFormula: 'Subject + had + been + V.ing',
      mustRememberWords: ['for [hours] before', 'had been V-ing when'],
      dangerTrap: 'อย่าลืม been หลัง had และอย่าใช้กับ Stative Verbs',
      realLifeExample: 'เวลาเล่าเรื่องความลำบากในอดีต "I was sweating because I had been running up the stairs."',
    },
  },
];
