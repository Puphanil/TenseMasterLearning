import { TenseComparisonItem } from '../types/tense';

export const tenseComparisons: TenseComparisonItem[] = [
  // 1. Present Simple vs Present Continuous
  {
    id: 'present-simple-vs-continuous',
    tenseAId: 'present-simple',
    tenseBId: 'present-continuous',
    title: 'Present Simple vs Present Continuous',
    summaryDifference: 'Present Simple คือ "นิสัย ความจริงทั่วไป ทำเป็นประจำ" ส่วน Present Continuous คือ "กำลังกระทำอยู่ตอนนี้ ณ วินาทีที่พูด หรือแผนการชั่วคราว"',
    pairScenarios: [
      {
        context: 'สถานการณ์: การดื่มกาแฟ',
        tenseAExample: {
          sentence: 'I drink coffee every morning.',
          phonetic: 'ไอ ดริงค์ คอฟฟี่ เอฟวรี มอร์นิง',
          meaning: 'ฉันดื่มกาแฟทุกเช้า (เป็นนิสัยปกติในชีวิต)',
          nuance: 'บอกให้รู้ว่าชีวิตปกติทำสิ่งนี้ ไม่ได้แปลว่าตอนนี้กำลังถือแก้วกาแฟอยู่',
        },
        tenseBExample: {
          sentence: 'I am drinking coffee right now.',
          phonetic: 'ไอ แอม ดริงคิง คอฟฟี่ ไรท์ นาว',
          meaning: 'ฉันกำลังดื่มกาแฟอยู่ตอนนี้เลย',
          nuance: 'กำลังยกแก้วกาแฟจิบอยู่ ณ วินาทีที่พูด',
        },
        whyTheDifferenceMatters: 'ถ้าคุณบอกฝรั่งว่า "I am living in Thailand" เขาจะคิดว่าคุณมาอยู่ไทยชั่วคราวแค่ไม่กี่เดือน แต่ถ้าคุณพูดว่า "I live in Thailand" เขาจะเข้าใจว่านี่คือบ้านถาวรของคุณ',
      },
      {
        context: 'สถานการณ์: ที่อยู่อาศัย (ถาวร vs ชั่วคราว)',
        tenseAExample: {
          sentence: 'She lives in Chiang Mai with her parents.',
          phonetic: 'ชี ลิฟว์ส อิน เชียงใหม่ วิธ เฮอร์ แพเรินท์ส',
          meaning: 'เธออาศัยอยู่ที่เชียงใหม่กับพ่อแม่',
          nuance: 'เป็นบ้านถาวร สภาพชีวิตปกติอันมั่นคง',
        },
        tenseBExample: {
          sentence: 'She is living in Bangkok for three months for an internship.',
          phonetic: 'ชี อิส ลิฟวิง อิน แบงค็อก ฟอร์ ทรี มั้นธ์ส ฟอร์ แอน อินเทิร์นชิพ',
          meaning: 'เธอกำลังพักอยู่ที่กรุงเทพฯ เป็นเวลา 3 เดือนเพื่อฝึกงาน',
          nuance: 'เป็นสภาพชั่วคราว เดี๋ยวฝึกงานเสร็จก็กลับ',
        },
        whyTheDifferenceMatters: 'การเลือกใช้รูป Continuous แสดงถึง "ความไม่ถาวร (Temporary State)" อย่างชัดเจน',
      },
    ],
    quickComparisonPoints: [
      { aspect: 'มิติของเวลา', tenseA: 'ตลอดเวลา เป็นประจำ วงจรชีวิต', tenseB: 'เฉพาะตอนนี้ หรือช่วงเวลาสั้นๆ นี้' },
      { aspect: 'โครงสร้างประโยค', tenseA: 'Subject + V.1 (s/es)', tenseB: 'Subject + is/am/are + V.ing' },
      { aspect: 'คำบอกเวลาใบ้', tenseA: 'always, usually, every day, often', tenseB: 'now, right now, at the moment, currently' },
      { aspect: 'กริยาแสดงสภาพ (Stative)', tenseA: 'ใช้ได้ (I know, I love, I want)', tenseB: 'ห้ามใช้ (ห้ามใช้ I am knowing)' },
    ],
    practiceQuestion: {
      scenario: 'คุณเดินเข้าไปเห็นเพื่อนกำลังนั่งอ่านหนังสือพิมพ์อยู่บนโซฟา และอยากถามว่ากำลังทำอะไร',
      question: 'ข้อใดคือประโยคที่ถูกต้องและเหมาะสมกับสถานการณ์นี้ที่สุด?',
      options: [
        { id: 'opt-1', text: 'What do you do?', isCorrect: false, explanation: '"What do you do?" มีความหมายว่า "คุณทำงานอะไร/ประกอบอาชีพอะไร" เป็น Present Simple ใช้ถามอาชีพ ไม่ได้ถามสิ่งที่กำลังทำอยู่ตรงหน้า' },
        { id: 'opt-2', text: 'What are you doing?', isCorrect: true, explanation: 'ถูกต้อง! "What are you doing?" เป็น Present Continuous ใช้ถามสิ่งที่กำลังดำเนินอยู่ตรงหน้า ณ วินาทีนี้' },
        { id: 'opt-3', text: 'What have you done?', isCorrect: false, explanation: 'นี่คือ Present Perfect แปลว่า "เธอไปทำอะไรมาเนี่ย (ผลงาน/ความผิด)"' },
      ],
    },
  },

  // 2. Past Simple vs Present Perfect
  {
    id: 'past-simple-vs-present-perfect',
    tenseAId: 'past-simple',
    tenseBId: 'present-perfect',
    title: 'Past Simple vs Present Perfect',
    summaryDifference: 'Past Simple คือ "อดีตที่ตายสนิทแล้ว มีเวลาเจาะจงกำกับ" ส่วน Present Perfect คือ "อดีตที่ส่งผลต่อเนื่องหรือผลลัพธ์ยังคาอยู่ที่ปัจจุบัน หรือประสบการณ์ชีวิต"',
    pairScenarios: [
      {
        context: 'สถานการณ์: กุญแจหาย (ผลกระทบต่อปัจจุบัน)',
        tenseAExample: {
          sentence: 'I lost my key yesterday, but luckily I found it this morning.',
          phonetic: 'ไอ ลอสต์ มาย คีย์ เยสเตอร์เดย์ บัท ลัคคิลี ไอ ฟาวนด์ อิท ดิส มอร์นิง',
          meaning: 'เมื่อวานฉันทำกุญแจหาย แต่โชคดีที่เมื่อเช้าฉันหาเจอแล้ว',
          nuance: 'เรื่องการทำหายจบลงไปแล้วในอดีต และตอนนี้มีกุญแจอยู่ในมือเรียบร้อย',
        },
        tenseBExample: {
          sentence: 'I have lost my key! Can you help me look for it?',
          phonetic: 'ไอ แฮฟว์ ลอสต์ มาย คีย์ แคน ยู เฮลพ์ มี ลุค ฟอร์ อิท',
          meaning: 'ฉันทำกุญแจหายไปแล้ว! ช่วยฉันหาหน่อยได้ไหม?',
          nuance: 'ทำหายในอดีต และ "จนถึงวินาทีนี้ก็ยังหาไม่เจอ ยังเข้าห้องไม่ได้!" ผลลัพธ์คาอยู่ที่ปัจจุบัน',
        },
        whyTheDifferenceMatters: 'ถ้าคุณบอกตำรวจว่า "I lost my passport in 2020" ตำรวจจะถามว่ามาแจ้งความทำไมตอนนี้? แต่ถ้าบอกว่า "I have lost my passport!" ตำรวจจะรีบช่วยหาเพราะเป็นเรื่องสดๆ ร้อนๆ ที่ผลลัพธ์ยังอยู่',
      },
      {
        context: 'สถานการณ์: การไปเที่ยวต่างประเทศ (ประวัติศาสตร์ vs ประสบการณ์)',
        tenseAExample: {
          sentence: 'I went to Japan in 2019.',
          phonetic: 'ไอ เวนท์ ทู แจแปน อิน ทู ทาวซันด์ ไนนทีน',
          meaning: 'ฉันไปเที่ยวญี่ปุ่นมาเมื่อปี 2019 (ระบุเวลาชัดเจนในอดีต)',
          nuance: 'เล่าบันทึกประวัติศาสตร์การเดินทางที่จบลงไปแล้ว',
        },
        tenseBExample: {
          sentence: 'I have been to Japan three times.',
          phonetic: 'ไอ แฮฟว์ บีน ทู แจแปน ทรี ไทมส์',
          meaning: 'ฉันเคยไปญี่ปุ่นมาแล้ว 3 ครั้งในชีวิต',
          nuance: 'นับแต้มประสบการณ์ชีวิตตั้งแต่เกิดจนถึงปัจจุบัน ไม่ระบุเวลาเจาะจง',
        },
        whyTheDifferenceMatters: 'อย่าใส่คำบอกเวลาอดีต (yesterday, ago, in 2019) ใน Present Perfect เด็ดขาด!',
      },
    ],
    quickComparisonPoints: [
      { aspect: 'ความสัมพันธ์กับปัจจุบัน', tenseA: 'ตัดขาดจากปัจจุบัน จบไปแล้ว', tenseB: 'เชื่อมโยงถึงปัจจุบัน หรือผลลัพธ์ยังอยู่' },
      { aspect: 'เวลาที่ระบุ', tenseA: 'มีเวลาเจาะจง (yesterday, last year, ago)', tenseB: 'ไม่ระบุเวลาเจาะจง (ever, never, already, yet, since, for)' },
      { aspect: 'โครงสร้างประโยค', tenseA: 'Subject + V.2 (went, saw, played)', tenseB: 'Subject + have/has + V.3 (have gone, have seen)' },
    ],
    practiceQuestion: {
      scenario: 'คุณกำลังคุยกับเพื่อนเรื่องภาพยนตร์เรื่องใหม่ที่เพิ่งเข้าฉายเมื่อวาน และเพื่อนบอกว่า "เมื่อคืนฉันดูแล้ว"',
      question: 'ประโยคภาษาอังกฤษข้อใดถูกต้องตามหลักไวยากรณ์ที่สุด?',
      options: [
        { id: 'opt-pp-1', text: 'I have watched it last night.', isCorrect: false, explanation: 'ผิด! เพราะมีคำว่า "last night" ซึ่งเป็นเวลาเจาะจงในอดีต ห้ามใช้กับ Present Perfect' },
        { id: 'opt-pp-2', text: 'I watched it last night.', isCorrect: true, explanation: 'ถูกต้อง! มีคำบอกเวลาชัดเจนในอดีต (last night) ต้องใช้ Past Simple (watched กริยาช่อง 2)' },
        { id: 'opt-pp-3', text: 'I have been watching it last night.', isCorrect: false, explanation: 'ผิดโครงสร้างและผิดกาลเวลา' },
      ],
    },
  },

  // 3. Past Simple vs Past Continuous
  {
    id: 'past-simple-vs-past-continuous',
    tenseAId: 'past-simple',
    tenseBId: 'past-continuous',
    title: 'Past Simple vs Past Continuous',
    summaryDifference: 'Past Continuous คือ "เหตุการณ์ฉากหลังที่กำลังดำเนินอยู่" ส่วน Past Simple คือ "เหตุการณ์สั้นๆ ที่เข้ามาแทรกกลางคัน"',
    pairScenarios: [
      {
        context: 'สถานการณ์: ฝนตกขณะเดินกลับบ้าน',
        tenseAExample: {
          sentence: 'Suddenly, it started to rain.',
          phonetic: 'ซัดเดนลี อิท สตาร์ทิด ทู เรน',
          meaning: 'จู่ๆ ฝนก็เริ่มตกลงมา (เหตุการณ์สั้นๆ ที่เกิดขึ้นฉับพลัน)',
          nuance: 'เป็นจุดเวลาสั้นๆ ที่เข้ามาขัดจังหวะ (Past Simple)',
        },
        tenseBExample: {
          sentence: 'I was walking home through the park.',
          phonetic: 'ไอ วอส วอคกิง โฮม ทรู เดอะ พาร์ค',
          meaning: 'ฉันกำลังเดินกลับบ้านผ่านสวนสาธารณะ (ฉากหลังที่ดำเนินอยู่)',
          nuance: 'กำลังเดินอยู่เรื่อยๆ เป็นฉากหลังอันยาวนาน (Past Continuous)',
        },
        whyTheDifferenceMatters: 'เมื่อรวมกัน: "While I was walking home, it started to rain." ผู้ฟังจะเห็นภาพชัดเจนทันทีว่าอะไรเริ่มก่อนและอะไรเข้ามาแทรก',
      },
    ],
    quickComparisonPoints: [
      { aspect: 'บทบาทในประโยค', tenseA: 'การกระทำที่แทรกเข้ามา หรือลำดับเหตุการณ์ 1-2-3', tenseB: 'ฉากหลังที่กำลังดำเนินอยู่ (In progress)' },
      { aspect: 'คำเชื่อมนำหน้า', tenseA: 'มักตามหลัง When', tenseB: 'มักตามหลัง While หรือ As' },
      { aspect: 'โครงสร้าง', tenseA: 'Subject + V.2', tenseB: 'Subject + was/were + V.ing' },
    ],
    practiceQuestion: {
      scenario: 'คุณกำลังทำกับข้าวอยู่ในครัว แล้วจู่ๆ ทำมีดบาดนิ้วตัวเอง',
      question: 'ข้อใดเรียงกริยาได้อย่างถูกต้องตามไวยากรณ์: "While I _______ dinner, I accidentally _______ my finger."',
      options: [
        { id: 'opt-pc-1', text: 'was cooking / cut', isCorrect: true, explanation: 'ถูกต้อง! การทำกับข้าวเป็นฉากหลังที่กำลังทำอยู่ (was cooking) ส่วนการบาดนิ้วเกิดขึ้นฉับพลันเข้ามาแทรก (cut - ช่อง 2)' },
        { id: 'opt-pc-2', text: 'cooked / was cutting', isCorrect: false, explanation: 'ผิดความหมาย! จะแปลว่าฉันกำลังค่อยๆ เอามีดบาดนิ้วตัวเองเป็นฉากหลัง ซึ่งไม่เป็นธรรมชาติ' },
        { id: 'opt-pc-3', text: 'cooked / cut', isCorrect: false, explanation: 'ไม่สะท้อนมิติของการถูกแทรกขณะกำลังทำกิจกรรม' },
      ],
    },
  },

  // 4. Present Perfect vs Present Perfect Continuous
  {
    id: 'present-perfect-vs-continuous',
    tenseAId: 'present-perfect',
    tenseBId: 'present-perfect-continuous',
    title: 'Present Perfect vs Present Perfect Continuous',
    summaryDifference: 'Present Perfect ธรรมดาเน้น "ผลลัพธ์และความสำเร็จ (How much / How many)" ส่วน Continuous เน้น "ความยาวนานของเวลาและหยาดเหงื่อ (How long)"',
    pairScenarios: [
      {
        context: 'สถานการณ์: การเขียนอีเมลหรือรายงาน',
        tenseAExample: {
          sentence: 'I have written five emails today.',
          phonetic: 'ไอ แฮฟว์ ริทเทิน ไฟฟว์ อีเมลส์ ทูเดย์',
          meaning: 'วันนี้ฉันเขียนอีเมลเสร็จไปแล้ว 5 ฉบับ',
          nuance: 'เน้นจำนวนชิ้นงานที่เสร็จสมบูรณ์ (Completed output)',
        },
        tenseBExample: {
          sentence: 'I have been writing emails all morning.',
          phonetic: 'ไอ แฮฟว์ บีน ไรท์ทิง อีเมลส์ ออล มอร์นิง',
          meaning: 'ฉันนั่งพิมพ์อีเมลมาตลอดทั้งเช้าเลยเนี่ย',
          nuance: 'เน้นความเหน็ดเหนื่อยและเวลาที่ทุ่มเทลงไป ยังไม่ได้เน้นว่าส่งไปกี่ฉบับ',
        },
        whyTheDifferenceMatters: 'ถ้ามีตัวเลขจำนวนชิ้นงาน (เช่น 3 เล่ม, 5 ฉบับ, 2 ถ้วย) ต้องใช้ Present Perfect ธรรมดา ห้ามใช้ Continuous!',
      },
    ],
    quickComparisonPoints: [
      { aspect: 'จุดเน้นหลัก', tenseA: 'ผลสำเร็จของงาน (Completion / Results)', tenseB: 'ระยะเวลาและความต่อเนื่อง (Duration / Activity)' },
      { aspect: 'คำถามที่ตอบ', tenseA: 'How many? / How much? (กี่อัน/เท่าไร)', tenseB: 'How long? (นานแค่ไหนแล้ว)' },
      { aspect: 'โครงสร้าง', tenseA: 'have/has + V.3', tenseB: 'have/has + been + V.ing' },
    ],
    practiceQuestion: {
      scenario: 'คุณต้องการบอกหัวหน้าว่า "วันนี้ฉันดื่มกาแฟไป 3 แก้วแล้ว"',
      question: 'ประโยคภาษาอังกฤษข้อใดถูกต้อง?',
      options: [
        { id: 'opt-ppc-1', text: 'I have been drinking three cups of coffee today.', isCorrect: false, explanation: 'ผิด! เมื่อระบุจำนวนชิ้นงาน/จำนวนแก้วที่แน่นอน ห้ามใช้รูป Continuous' },
        { id: 'opt-ppc-2', text: 'I have drunk three cups of coffee today.', isCorrect: true, explanation: 'ถูกต้อง! Present Perfect ธรรมดา (have + V.3) ใช้เมื่อระบุจำนวนผลงานที่ทำสำเร็จแล้ว (three cups)' },
        { id: 'opt-ppc-3', text: 'I drink three cups of coffee right now.', isCorrect: false, explanation: 'ผิดไวยากรณ์และความหมาย' },
      ],
    },
  },

  // 5. Will vs Be going to
  {
    id: 'will-vs-be-going-to',
    tenseAId: 'future-simple',
    tenseBId: 'future-simple',
    title: 'Will vs Be Going To',
    summaryDifference: 'Will คือ "ตัดสินใจเดี๋ยวนั้น สัญญา คาดคะเนลอยๆ" ส่วน Be Going To คือ "ตั้งใจวางแผนไว้ล่วงหน้าแล้ว หรือมีหลักฐานชัดเจนตรงหน้า"',
    pairScenarios: [
      {
        context: 'สถานการณ์: ฝนจะตก (หลักฐานตรงหน้า vs คาดเดาลอยๆ)',
        tenseAExample: {
          sentence: 'I think it will rain tomorrow.',
          phonetic: 'ไอ ติงค์ อิท วิล เรน ทูมอโรว',
          meaning: 'ฉันคิดว่าพรุ่งนี้ฝนน่าจะตกนะ',
          nuance: 'คาดเดาจากความคิดเห็นส่วนตัว ยังไม่มีหลักฐานอะไรชี้ชัด',
        },
        tenseBExample: {
          sentence: 'Look at those dark clouds! It is going to rain!',
          phonetic: 'ลุค แอท โดส ดาร์ก คลาวดส์ อิท อิส โกอิง ทู เรน',
          meaning: 'ดูเมฆดำทะมึนก้อนนั้นสิ! ฝนกำลังจะตกแล้วเนี่ย!',
          nuance: 'มีหลักฐานชัดเจนประจักษ์อยู่ตรงหน้า (เมฆดำ) จึงมั่นใจเกือบ 100%',
        },
        whyTheDifferenceMatters: 'เมื่อเห็นสิ่งของกำลังจะหล่น หรือมีหลักฐานทนโท่ เจ้าของภาษาจะใช้ "be going to" เสมอ เช่น "Watch out! That box is going to fall!"',
      },
      {
        context: 'สถานการณ์: การตัดสินใจในชีวิต',
        tenseAExample: {
          sentence: 'The phone is ringing. – I will answer it!',
          phonetic: 'เดอะ โฟน อิส ริงอิง – ไอ วิล แอนเซอะ อิท',
          meaning: 'โทรศัพท์ดัง – เดี๋ยวฉันรับสายเอง!',
          nuance: 'ตัดสินใจฉับพลันเดี๋ยวนั้น ไม่ได้มีแผนมาก่อน',
        },
        tenseBExample: {
          sentence: 'I am going to study medicine next year.',
          phonetic: 'ไอ แอม โกอิง ทู สตัดดี เมดดิซิน เน็กซ์ เยียร์',
          meaning: 'ฉันตั้งใจจะเรียนแพทย์ในปีหน้า',
          nuance: 'วางแผนและเตรียมตัวล่วงหน้ามาอย่างรอบคอบแล้ว',
        },
        whyTheDifferenceMatters: 'การใช้ be going to ช่วยแสดงถึงความตั้งใจจริงที่คิดมาแล้วล่วงหน้า',
      },
    ],
    quickComparisonPoints: [
      { aspect: 'ที่มาของการตัดสินใจ', tenseA: 'ตัดสินใจทันที ณ ขณะพูด (Spontaneous)', tenseB: 'วางแผนล่วงหน้ามาก่อนแล้ว (Prior Plan)' },
      { aspect: 'การทำนายอนาคต', tenseA: 'เดาจากความรู้สึก / ความคิดเห็น (Opinion)', tenseB: 'เดาจากหลักฐานที่เห็นตรงหน้า (Present Evidence)' },
      { aspect: 'การให้คำสัญญา', tenseA: 'ใช้ Will (I will never leave you)', tenseB: 'ไม่นิยมใช้ be going to ในการสัญญา' },
    ],
    practiceQuestion: {
      scenario: 'คุณเห็นผู้หญิงคนหนึ่งกำลังตั้งครรภ์ท้องแก่ และมีอาการปวดท้องเตือน',
      question: 'ข้อใดคือการพูดที่เจ้าของภาษาใช้เป็นธรรมชาติที่สุด?',
      options: [
        { id: 'opt-wbg-1', text: 'She will have a baby.', isCorrect: false, explanation: 'ประโยคนี้เหมือนการบอกข้อเท็จจริงทั่วไป ไม่ได้สะท้อนหลักฐานตรงหน้า' },
        { id: 'opt-wbg-2', text: 'She is going to have a baby.', isCorrect: true, explanation: 'ถูกต้อง! มีหลักฐานชัดเจนตรงหน้า (ท้องแก่ / อาการเจ็บท้อง) เจ้าของภาษาใช้ be going to' },
        { id: 'opt-wbg-3', text: 'She had a baby.', isCorrect: false, explanation: 'นี่คืออดีต เด็กยังไม่คลอด' },
      ],
    },
  },
];
