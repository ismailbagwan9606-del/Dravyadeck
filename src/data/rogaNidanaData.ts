// Roga Nidana - Part 2 (Vyadhi Vigyan) Flashcard Data
// Following NCISM BAMS 2nd Year Syllabus
// References: Madhava Nidana, Charaka Samhita, Sushruta Samhita

export interface VyadhiQAFlashcard {
  id: string;
  vyadhiId: string;
  topic: string;
  front: string;
  back: string;
  reference: string;
  isPreview?: boolean; // Cards shown without login
}

export interface VyadhiTopic {
  id: string;
  name: string;
  category: string;
  isPreviewTopic: boolean; // Jvara & Prameha are preview topics
  cardCount: number;
}

// All 33 Vyadhi Topics (NCISM Paper 2 aligned)
export const vyadhiTopics: VyadhiTopic[] = [
  // Jvara Varga
  { id: "jvara", name: "Jvara", category: "Jvara Varga", isPreviewTopic: true, cardCount: 12 },
  // Prameha Varga
  { id: "prameha", name: "Prameha", category: "Prameha Varga", isPreviewTopic: true, cardCount: 14 },
  // Annavaha Vikara
  { id: "ajirna", name: "Ajirna (Agnimandya)", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "amlapitta", name: "Amlapitta", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 9 },
  { id: "shoola", name: "Shoola", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "chhardi", name: "Chhardi", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 9 },
  { id: "atisara", name: "Atisara", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "pravahika", name: "Pravahika", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 8 },
  { id: "grahani", name: "Grahani", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 11 },
  { id: "visuchika", name: "Visuchika, Alasaka, Vilambika", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "udara", name: "Udara Roga", category: "Annavaha Vikara", isPreviewTopic: false, cardCount: 12 },
  // Pranavaha Vikara
  { id: "kasa", name: "Kasa", category: "Pranavaha Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "shwasa", name: "Shwasa", category: "Pranavaha Vikara", isPreviewTopic: false, cardCount: 11 },
  { id: "hridroga", name: "Hridroga", category: "Pranavaha Vikara", isPreviewTopic: false, cardCount: 10 },
  // Raktaja Vikara
  { id: "raktapitta", name: "Raktapitta", category: "Raktaja Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "pandu", name: "Pandu", category: "Raktaja Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "kamala", name: "Kamala", category: "Raktaja Vikara", isPreviewTopic: false, cardCount: 8 },
  // Twak Vikara (Skin disorders)
  { id: "kushta", name: "Kushtha", category: "Twak Vikara", isPreviewTopic: false, cardCount: 12 },
  { id: "sheetapitta", name: "Sheetapitta", category: "Twak Vikara", isPreviewTopic: false, cardCount: 9 },
  { id: "shwitra", name: "Shwitra", category: "Twak Vikara", isPreviewTopic: false, cardCount: 9 },
  { id: "visarpa", name: "Visarpa", category: "Twak Vikara", isPreviewTopic: false, cardCount: 10 },
  // Udakavaha Vikara
  { id: "shotha", name: "Shotha", category: "Udakavaha Vikara", isPreviewTopic: false, cardCount: 10 },
  // Mutravaha Vikara
  { id: "mutrakricchra", name: "Mutrakricchra", category: "Mutravaha Vikara", isPreviewTopic: false, cardCount: 9 },
  { id: "mutraghata", name: "Mutraghata", category: "Mutravaha Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "ashmari", name: "Ashmari", category: "Mutravaha Vikara", isPreviewTopic: false, cardCount: 10 },
  // Purishavaha Vikara
  { id: "arsha", name: "Arsha", category: "Purishavaha Vikara", isPreviewTopic: false, cardCount: 11 },
  { id: "bhagandara", name: "Bhagandara", category: "Purishavaha Vikara", isPreviewTopic: false, cardCount: 9 },
  // Vatavyadhi
  { id: "vatavyadhi", name: "Vatavyadhi", category: "Vatavyadhi", isPreviewTopic: false, cardCount: 12 },
  { id: "vatarakta", name: "Vatarakta", category: "Vatavyadhi", isPreviewTopic: false, cardCount: 10 },
  { id: "amavata", name: "Amavata", category: "Vatavyadhi", isPreviewTopic: false, cardCount: 10 },
  // Manasika Vikara
  { id: "unmada", name: "Unmada", category: "Manasika Vikara", isPreviewTopic: false, cardCount: 10 },
  { id: "apasmara", name: "Apasmara", category: "Manasika Vikara", isPreviewTopic: false, cardCount: 10 },
  // Medoroga
  { id: "sthoulya", name: "Sthoulya-Karshya", category: "Medoroga", isPreviewTopic: false, cardCount: 10 },
];

export const vyadhiCategories = [
  "All",
  "Jvara Varga",
  "Prameha Varga",
  "Annavaha Vikara",
  "Pranavaha Vikara",
  "Raktaja Vikara",
  "Twak Vikara",
  "Udakavaha Vikara",
  "Mutravaha Vikara",
  "Purishavaha Vikara",
  "Vatavyadhi",
  "Manasika Vikara",
  "Medoroga",
];

// Complete Flashcard Data for all 20 Vyadhi Topics
export const rogaNidanaFlashcards: VyadhiQAFlashcard[] = [
  // ==================== JVARA (Preview Topic) ====================
  {
    id: "jvara-001",
    vyadhiId: "jvara",
    topic: "Definition",
    front: "What is the classical definition of Jvara according to Charaka?",
    back: "Jvara is defined as:\n\n• 'Santapo Jvara Uchyate' - Elevation of body temperature\n• Deha-Indriya-Manas Santapa - Heat affecting body, senses, and mind\n• It is the king of diseases (Rogaraja)\n• First disease to affect living beings (Adi Vyadhi)\n• Most difficult to treat when chronic",
    reference: "Charaka Samhita, Chikitsa Sthana 3/3",
    isPreview: true,
  },
  {
    id: "jvara-002",
    vyadhiId: "jvara",
    topic: "Samprapti",
    front: "Describe the Samprapti (pathogenesis) of Jvara.",
    back: "Samprapti Flow:\n\nNidana Sevana → Dosha Prakopa → Amashaya Sthita Agni Dushti → Ama Utpatti → Rasa Dhatu Dushti → Amasaya Vimarga Gamana → Bahya Rogamarga → Swedavaha Srotas Avarodha → Ushma Vriddhi → Jvara\n\nSamprapti Ghataka:\n• Dosha: Tridosha (Vata Pradhana)\n• Dushya: Rasa Dhatu\n• Agni: Mandagni\n• Srotas: Rasavaha, Swedavaha\n• Udbhava: Amashaya\n• Vyakti: Sarva Shareera",
    reference: "Madhava Nidana - Madhukosha, Jvara Nidana",
    isPreview: true,
  },
  {
    id: "jvara-003",
    vyadhiId: "jvara",
    topic: "Classification",
    front: "What is the classification (Bheda) of Jvara according to Charaka?",
    back: "Classification of Jvara:\n\n1. Based on Dosha (8 types):\n• Vataja, Pittaja, Kaphaja (3 Ekadoshaja)\n• Vata-Pittaja, Vata-Kaphaja, Pitta-Kaphaja (3 Dvidoshaja)\n• Sannipataja (Tridoshaja)\n• Agantuja (External cause)\n\n2. Based on Origin:\n• Nija (Endogenous)\n• Agantuja (Exogenous)\n\n3. Based on Prognosis:\n• Sadhya, Yapya, Asadhya\n\n4. Special Types:\n• Vishama Jvara (Intermittent)\n• Satata, Anyedyushka, Tritiyaka, Chaturthaka",
    reference: "Charaka Samhita, Chikitsa Sthana 3/27-30",
    isPreview: true,
  },
  {
    id: "jvara-004",
    vyadhiId: "jvara",
    topic: "Nidana",
    front: "What are the Nidana (etiological factors) of Jvara?",
    back: "Nidana of Jvara:\n\nAharaja:\n• Viruddha Ahara (Incompatible food)\n• Adhyashana (Eating before digestion)\n• Vishamashana (Irregular eating)\n• Guru, Ruksha, Sheeta Ahara\n\nViharaja:\n• Vega Dharana (Suppression of urges)\n• Diwaswapna (Day sleep)\n• Ratri Jagarana (Night awakening)\n• Excessive exercise\n\nManasika:\n• Krodha (Anger)\n• Shoka (Grief)\n• Bhaya (Fear)\n\nAgantuja:\n• Abhichara (Black magic)\n• Abhishanga (Infection)\n• Abhighata (Trauma)",
    reference: "Charaka Samhita, Nidana Sthana 1/20-25",
  },
  {
    id: "jvara-005",
    vyadhiId: "jvara",
    topic: "Purvarupa",
    front: "What are the Purvarupa (prodromal symptoms) of Jvara?",
    back: "Purvarupa of Jvara:\n\n• Avipaka (Indigestion)\n• Aruchi (Anorexia)\n• Trishna (Thirst)\n• Angamarda (Body ache)\n• Gourava (Heaviness)\n• Alasya (Laziness)\n• Jrimbha (Yawning)\n• Romharsha (Horripilation)\n• Ashru Srava (Lacrimation)\n• Vaktra Vairasya (Altered taste)\n• Sweda Abhava (Absence of sweating)\n• Nidra Vikara (Sleep disturbance)",
    reference: "Madhava Nidana, Jvara Nidana 4-5",
  },
  {
    id: "jvara-006",
    vyadhiId: "jvara",
    topic: "Rupa - Vataja",
    front: "What are the Lakshana (symptoms) of Vataja Jvara?",
    back: "Vataja Jvara Lakshana:\n\n• Vishamam Jvaranam (Irregular fever)\n• Sheeta Kampa (Cold with shivering)\n• Parva Bheda (Joint pain)\n• Shirashula (Headache)\n• Mukha Shosha (Dryness of mouth)\n• Romharsha (Horripilation)\n• Aruchi (Anorexia)\n• Vit Graha (Constipation)\n• Nidranasha (Insomnia)\n• Tikta-Kashaya Mukha Rasa\n\nTiming: Fever increases in evening/night (Aparahna-Ratri)",
    reference: "Charaka Samhita, Chikitsa Sthana 3/52-55",
  },
  {
    id: "jvara-007",
    vyadhiId: "jvara",
    topic: "Rupa - Pittaja",
    front: "What are the Lakshana (symptoms) of Pittaja Jvara?",
    back: "Pittaja Jvara Lakshana:\n\n• Atisantapa (High grade fever)\n• Daha (Burning sensation)\n• Trishna (Excessive thirst)\n• Sweda (Sweating)\n• Moha (Confusion)\n• Bhrama (Giddiness)\n• Vidaha (Heartburn)\n• Atisara (Diarrhea)\n• Mukha Paaka (Stomatitis)\n• Katu-Amla Mukha Rasa\n• Harita-Peeta Varna (Yellowish discoloration)\n\nTiming: Fever increases in afternoon (Madhyahna)",
    reference: "Charaka Samhita, Chikitsa Sthana 3/56-60",
  },
  {
    id: "jvara-008",
    vyadhiId: "jvara",
    topic: "Rupa - Kaphaja",
    front: "What are the Lakshana (symptoms) of Kaphaja Jvara?",
    back: "Kaphaja Jvara Lakshana:\n\n• Mandoshmata (Low grade fever)\n• Gourava (Heaviness)\n• Aruchi (Anorexia)\n• Chardi (Vomiting)\n• Praseka (Excessive salivation)\n• Kasa (Cough)\n• Peenasa (Rhinitis)\n• Sheeta Kampa (Mild chills)\n• Madhura Mukha Rasa\n• Tandra (Drowsiness)\n• Alasya (Laziness)\n\nTiming: Fever increases in morning (Purvahna)",
    reference: "Charaka Samhita, Chikitsa Sthana 3/61-65",
  },
  {
    id: "jvara-009",
    vyadhiId: "jvara",
    topic: "Vishama Jvara",
    front: "What is Vishama Jvara and its types?",
    back: "Vishama Jvara (Intermittent Fever):\n\nDefinition: Fever with irregular pattern of occurrence\n\nTypes based on Vegakala:\n\n1. Santata - Continuous (remittent)\n   Duration: 7-12 days\n\n2. Satata - Daily paroxysm\n   Duration: 7-12 days\n\n3. Anyedyushka - Every alternate day\n   Duration: 12 days or more\n\n4. Tritiyaka - Every 3rd day\n   Duration: 12 days or more\n\n5. Chaturthaka - Every 4th day\n   Duration: 12 days or more\n\nCause: Dosha lodged in deeper Dhatus and Marma",
    reference: "Charaka Samhita, Chikitsa Sthana 3/72-80",
  },
  {
    id: "jvara-010",
    vyadhiId: "jvara",
    topic: "Upadrava",
    front: "What are the Upadrava (complications) of Jvara?",
    back: "Upadrava of Jvara:\n\n• Trishna (Excessive thirst)\n• Daha (Burning sensation)\n• Shwasa (Dyspnea)\n• Kasa (Cough)\n• Atisara (Diarrhea)\n• Chardi (Vomiting)\n• Aruchi (Anorexia)\n• Hikka (Hiccough)\n• Murchha (Syncope)\n• Bhrama (Giddiness)\n• Pipasa (Extreme thirst)\n• Murcha (Fainting)\n\nNote: Complications indicate poor prognosis and require immediate attention.",
    reference: "Madhava Nidana, Jvara Nidana 15-16",
  },
  {
    id: "jvara-011",
    vyadhiId: "jvara",
    topic: "Sadhya-Asadhyata",
    front: "What is the prognosis (Sadhya-Asadhyata) of Jvara?",
    back: "Sadhya-Asadhyata of Jvara:\n\nSadhya (Curable):\n• Nava Jvara (Recent onset)\n• Ekadoshaja Jvara\n• Alpa Lakshana\n• Good Bala (strength)\n\nKriccha Sadhya (Difficult to cure):\n• Dvidoshaja Jvara\n• Vishama Jvara\n• Moderate symptoms\n\nYapya (Manageable):\n• Chronic with complications\n• Durbala patient\n\nAsadhya (Incurable):\n• Sannipataja with severe symptoms\n• Multiple Upadravas\n• Extreme debility\n• Jvara with Murchha, Atisara, Shwasa simultaneously",
    reference: "Charaka Samhita, Chikitsa Sthana 3/85-90",
  },
  {
    id: "jvara-012",
    vyadhiId: "jvara",
    topic: "Exam Points",
    front: "What are the high-yield exam and viva points for Jvara?",
    back: "High-Yield Exam Points:\n\n1. Jvara = Rogaraja (King of diseases)\n2. Adi Vyadhi = First disease in creation\n3. 8 types of Jvara (Ashtavidha)\n4. Swedavaha Srotas Avarodha = Key pathology\n5. Timing correlation:\n   • Vataja - Evening/Night\n   • Pittaja - Afternoon\n   • Kaphaja - Morning\n6. Vishama Jvara - 5 types based on Vegakala\n7. Langhana = First line of treatment\n8. Taruna Jvara = No medication for first 7 days\n9. Sannipataja Jvara = Most dangerous\n10. Jwara Mukti Lakshana - Signs of recovery",
    reference: "Madhava Nidana with Madhukosha Commentary",
  },

  // ==================== PRAMEHA (Preview Topic) ====================
  {
    id: "prameha-001",
    vyadhiId: "prameha",
    topic: "Definition",
    front: "What is the classical definition of Prameha?",
    back: "Prameha Definition:\n\n'Prabhoota Avilam Mutram' - Excessive and turbid urination\n\nCharacteristics:\n• Prabhuta Mutra - Increased quantity of urine\n• Avila Mutra - Turbid/cloudy urine\n• Mutra Dosha Pradhana Vyadhi - Primarily affects urinary system\n\nEtymology:\n• Pra + Meha = Excessive urination\n• 'Pramehati Iti Prameha' - That which causes excessive urination\n\nAlternate names:\n• Madhumeha (when chronic)\n• Ojomeha (loss of Ojas)",
    reference: "Charaka Samhita, Nidana Sthana 4/3-4",
    isPreview: true,
  },
  {
    id: "prameha-002",
    vyadhiId: "prameha",
    topic: "Samprapti",
    front: "Describe the Samprapti (pathogenesis) of Prameha.",
    back: "Samprapti Flow:\n\nNidana Sevana → Kapha-Pitta-Meda Prakopa → Medovaha Srotas Dushti → Meda-Mamsa-Kleda Vriddhi → Mutravaha Srotas Abhisyanda → Basti Dushti → Prabhuta Avila Mutra → Prameha\n\nSamprapti Ghataka:\n• Dosha: Kapha Pradhana, Pitta, Vata (in later stages)\n• Dushya: Meda, Mamsa, Kleda, Shukra, Shonita, Vasa, Majja, Lasika, Rasa, Ojas (10 Dushyas)\n• Agni: Dhatwagnimandya\n• Srotas: Medovaha, Mutravaha\n• Udbhava: Amashaya\n• Vyakti: Basti (Urinary system)",
    reference: "Sushruta Samhita, Nidana Sthana 6/6-8",
    isPreview: true,
  },
  {
    id: "prameha-003",
    vyadhiId: "prameha",
    topic: "Classification",
    front: "What is the classification (Bheda) of Prameha?",
    back: "Classification of Prameha (20 Types):\n\n1. Kaphaja Prameha (10 types):\n• Udakameha, Ikshumeha, Sandrameha, Sandraprasadameha, Suklameha, Sukrameha, Sheetameha, Sikatameha, Shanairmeha, Alalameha\n\n2. Pittaja Prameha (6 types):\n• Ksharameha, Kalameha, Nilameha, Raktameha, Manjishthameha, Haridrameha\n\n3. Vataja Prameha (4 types):\n• Vasameha, Majjameha, Hastimeha, Madhumeha\n\nBased on Sadhyata:\n• Sahaja (Hereditary) - Asadhya\n• Apathyanimittaja (Lifestyle) - Sadhya/Yapya",
    reference: "Charaka Samhita, Nidana Sthana 4/5-7",
    isPreview: true,
  },
  {
    id: "prameha-004",
    vyadhiId: "prameha",
    topic: "Nidana",
    front: "What are the Nidana (etiological factors) of Prameha?",
    back: "Nidana of Prameha:\n\nAharaja:\n• Madhura, Snigdha, Guru Ahara (Sweet, oily, heavy food)\n• Navanna, Navadhanya (New grains)\n• Guda Vikara (Jaggery preparations)\n• Payasa, Krushara, Vilepi\n• Dadhi, Dugdha, Ikshu Rasa\n• Masha, Tila excessive use\n\nViharaja:\n• Asyasukham (Sedentary lifestyle)\n• Swapnasukham (Excessive sleep)\n• Avyayama (Lack of exercise)\n• Diwaswapna (Day sleeping)\n\nManasika:\n• Chinta (Worry)\n• Shoka (Grief)\n• Bhaya (Fear)\n\nOther:\n• Sahaja (Hereditary)\n• Beejadosha (Genetic factors)",
    reference: "Charaka Samhita, Nidana Sthana 4/4-5",
  },
  {
    id: "prameha-005",
    vyadhiId: "prameha",
    topic: "Purvarupa",
    front: "What are the Purvarupa (prodromal symptoms) of Prameha?",
    back: "Purvarupa of Prameha:\n\n• Sweda (Excessive sweating)\n• Anga Gandha (Body odor)\n• Anga Shaithilyam (Laxity of body)\n• Sayyasna Swapna Sukha (Desire for rest/sleep)\n• Hridaya-Netra-Jihva-Shrotra Upadeha (Coating sensation)\n• Ghana Angata (Heaviness of body)\n• Kesha-Nakha Ativridhi (Excessive growth of hair/nails)\n• Sheeta Priyata (Desire for cold)\n• Gala-Talu Shosha (Dryness of throat/palate)\n• Mukha Madhurya (Sweet taste in mouth)\n• Kara-Pada Daha (Burning in hands/feet)\n• Pipasa (Thirst)\n• Mukhena Makshika Upasarpana (Flies attracted to body)",
    reference: "Sushruta Samhita, Nidana Sthana 6/13",
  },
  {
    id: "prameha-006",
    vyadhiId: "prameha",
    topic: "Rupa - Kaphaja",
    front: "What are the Lakshana of Kaphaja Prameha (10 types)?",
    back: "Kaphaja Prameha (10 types):\n\n1. Udakameha - Urine like water, clear, excessive\n2. Ikshumeha - Urine like sugarcane juice, sweet\n3. Sandrameha - Urine becomes thick on standing\n4. Sandraprasadameha - Thick with clear upper layer\n5. Shuklameha - White colored urine\n6. Shukrameha - Urine mixed with semen-like material\n7. Sheetameha - Cold urine\n8. Sikatameha - Sandy particles in urine\n9. Shanairmeha - Slow voiding of urine\n10. Alalameha - Slimy/viscid urine\n\nCommon Features: Prabhuta, Snigdha, Picchila, Shweta, Sheeta Mutra",
    reference: "Charaka Samhita, Nidana Sthana 4/8-14",
  },
  {
    id: "prameha-007",
    vyadhiId: "prameha",
    topic: "Rupa - Pittaja",
    front: "What are the Lakshana of Pittaja Prameha (6 types)?",
    back: "Pittaja Prameha (6 types):\n\n1. Ksharameha - Urine like alkaline solution, with burning\n2. Kalameha - Black colored urine\n3. Nilameha - Blue/greenish colored urine\n4. Raktameha - Blood in urine (Haematuria)\n5. Manjishthameha - Urine colored like Manjishtha (red)\n6. Haridrameha - Yellow colored urine like turmeric\n\nCommon Features:\n• Ushna Mutra (Hot urine)\n• Amla, Katu Gandha (Sour, pungent smell)\n• Daha (Burning sensation)\n• Peeta, Neela, Rakta Varna (Yellow, blue, red color)",
    reference: "Charaka Samhita, Nidana Sthana 4/15-19",
  },
  {
    id: "prameha-008",
    vyadhiId: "prameha",
    topic: "Rupa - Vataja",
    front: "What are the Lakshana of Vataja Prameha (4 types)?",
    back: "Vataja Prameha (4 types):\n\n1. Vasameha - Urine mixed with fat/Vasa\n2. Majjameha - Urine mixed with Majja-like substance\n3. Hastimeha - Urine in spurts like elephant urination\n4. Madhumeha - Honey-like sweet urine, most severe\n\nMadhumeha Specific Features:\n• Kashaya Madhura Mutra (Astringent-sweet urine)\n• Ruksha, Pandura Mutra (Dry, pale urine)\n• Ojakshaya Lakshana (Signs of Ojas depletion)\n• Krisha Deha (Emaciated body)\n• Pipasa, Daurbalya (Thirst, weakness)\n\nNote: All untreated Prameha eventually become Madhumeha",
    reference: "Charaka Samhita, Nidana Sthana 4/20-23",
  },
  {
    id: "prameha-009",
    vyadhiId: "prameha",
    topic: "Dushya",
    front: "What are the 10 Dushyas involved in Prameha Samprapti?",
    back: "10 Dushyas of Prameha:\n\n1. Meda (Fat tissue) - Primary Dushya\n2. Mamsa (Muscle tissue)\n3. Kleda (Body fluid/moisture)\n4. Shukra (Reproductive tissue)\n5. Shonita (Blood)\n6. Vasa (Muscle fat)\n7. Majja (Bone marrow)\n8. Lasika (Lymph)\n9. Rasa (Plasma/chyle)\n10. Ojas (Vital essence)\n\nImportance:\n• All 10 Dushyas get vitiated in Prameha\n• Meda and Kleda are most commonly affected\n• Ojas Kshaya indicates worst prognosis (Madhumeha)\n• Dushya involvement determines the type of Prameha",
    reference: "Sushruta Samhita, Nidana Sthana 6/9",
  },
  {
    id: "prameha-010",
    vyadhiId: "prameha",
    topic: "Upadrava",
    front: "What are the Upadrava (complications) of Prameha?",
    back: "Upadrava of Prameha:\n\nPrameha Pidika (10 types of skin lesions):\n1. Sharavika - Shallow ulcer\n2. Kacchapika - Turtle shell-like lesion\n3. Jalini - Web-like pattern\n4. Sarshapi - Mustard seed-like\n5. Alaji - Burning lesion\n6. Vidradhi - Abscess\n7. Putrini - Lesion with satellite pustules\n8. Masurika - Lentil-like\n9. Visarpa - Spreading cellulitis\n10. Vidari - Deep undermined ulcer\n\nOther Complications:\n• Trishna (Thirst)\n• Daha (Burning)\n• Daurbalya (Weakness)\n• Avipaka (Indigestion)\n• Gandha Sharira (Body odor)",
    reference: "Sushruta Samhita, Nidana Sthana 6/16-17",
  },
  {
    id: "prameha-011",
    vyadhiId: "prameha",
    topic: "Sahaja vs Apathyanimittaja",
    front: "Differentiate between Sahaja and Apathyanimittaja Prameha.",
    back: "Sahaja vs Apathyanimittaja Prameha:\n\nSahaja Prameha (Hereditary):\n• Beeja Dosha Janya (Genetic orig
