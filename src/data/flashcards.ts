export interface Flashcard {
  id: string;
  category: string;
  imageUrl?: string;
  front: {
    sanskritName: string;
    latinName: string;
    family: string;
    commonName: string;
    usefulPart: string;
  };
  back: {
    rasa: string;
    guna: string;
    virya: string;
    vipaka: string;
    prabhava: string;
    doshaKarma: string;
    importantKarma: string;
    prayoga: string;
    classicalFormulations: string[];
  };
  filters: {
    rasaList: string[];
    virya: "Ushna" | "Sheeta" | "Anushna";
    doshaList: string[];
    usefulPart: string;
  };
}

export const rasaOptions = [
  "Madhura",
  "Amla",
  "Lavana",
  "Katu",
  "Tikta",
  "Kashaya",
];

export const viryaOptions = ["Ushna", "Sheeta", "Anushna"];

export const doshaOptions = [
  "Vata",
  "Pitta",
  "Kapha",
  "Tridosha",
];

export const usefulPartOptions = [
  "Root",
  "Stem",
  "Leaf",
  "Bark",
  "Fruit",
  "Seed",
  "Rhizome",
  "Whole Plant",
  "Resin",
  "Flower",
  "Latex",
  "Oil",
  "Heartwood",
  "Tuber",
];

export const categories = [
  "All",
  "Jwarahara",
  "Shothahara",
  "Krimighna",
  "Raktashodhaka",
  "Balya",
  "Medhya",
  "Rasayana",
  "Deepaniya",
  "Vajikarana",
  "Mutral",
  "Kasahara",
  "Vishaghna",
  "Stambhana",
  "Kushthaghna",
];

export const flashcards: Flashcard[] = [
  // ===== JWARAHARA DRUGS =====
  {
    id: "1",
    category: "Jwarahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Tinospora_cordifolia.jpg/640px-Tinospora_cordifolia.jpg",
    front: {
      sanskritName: "गुडूची (Guduchi)",
      latinName: "Tinospora cordifolia",
      family: "Menispermaceae",
      commonName: "Giloy, Heart-leaved Moonseed",
      usefulPart: "Stem (Kanda)",
    },
    back: {
      rasa: "Tikta (Bitter), Kashaya (Astringent)",
      guna: "Laghu (Light), Snigdha (Unctuous)",
      virya: "Ushna (Hot)",
      vipaka: "Madhura (Sweet)",
      prabhava: "Tridoshahara, Jwarahara",
      doshaKarma: "Tridosha Shamaka, especially Pitta and Kapha",
      importantKarma: "Rasayana, Jwarahara, Deepana, Trishnahara",
      prayoga: "Jwara, Prameha, Kushtha, Raktapitta, Kamala",
      classicalFormulations: ["Guduchi Satva", "Amritarishta", "Guduchyadi Kashaya"],
    },
    filters: {
      rasaList: ["Tikta", "Kashaya"],
      virya: "Ushna",
      doshaList: ["Tridosha", "Pitta", "Kapha"],
      usefulPart: "Stem",
    },
  },
  {
    id: "2",
    category: "Jwarahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ocimum_tenuiflorum_2.jpg/640px-Ocimum_tenuiflorum_2.jpg",
    front: {
      sanskritName: "तुलसी (Tulasi)",
      latinName: "Ocimum sanctum",
      family: "Lamiaceae",
      commonName: "Holy Basil, Sacred Basil",
      usefulPart: "Leaf (Patra), Whole Plant",
    },
    back: {
      rasa: "Katu (Pungent), Tikta (Bitter)",
      guna: "Laghu (Light), Ruksha (Dry), Tikshna (Sharp)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Shwasahara, Kasahara",
      doshaKarma: "Kapha-Vata Shamaka",
      importantKarma: "Shwasahara, Kasahara, Jwarahara, Krimighna",
      prayoga: "Jwara, Kasa, Shwasa, Krimi, Hikka",
      classicalFormulations: ["Tulasi Swarasa", "Panchatulasi", "Tribhuvana Kirti Rasa"],
    },
    filters: {
      rasaList: ["Katu", "Tikta"],
      virya: "Ushna",
      doshaList: ["Kapha", "Vata"],
      usefulPart: "Leaf",
    },
  },
  {
    id: "3",
    category: "Jwarahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Woodfordia_fruticosa_%28Dhawai%29_flowers_W_IMG_5369.jpg/640px-Woodfordia_fruticosa_%28Dhawai%29_flowers_W_IMG_5369.jpg",
    front: {
      sanskritName: "धातकी (Dhataki)",
      latinName: "Woodfordia fruticosa",
      family: "Lythraceae",
      commonName: "Fire Flame Bush, Dhatki",
      usefulPart: "Flower (Pushpa)",
    },
    back: {
      rasa: "Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Sheeta (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Sandhana (Fermentation Agent)",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Grahi, Stambhana, Jwarahara, Raktastambhana",
      prayoga: "Atisara, Raktapitta, Pradara, Arsha",
      classicalFormulations: ["Dhataki Pushpa (Arishta preparation)", "Dhataki Churna", "Pushyanuga Churna"],
    },
    filters: {
      rasaList: ["Kashaya"],
      virya: "Sheeta",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Flower",
    },
  },
  {
    id: "4",
    category: "Jwarahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Cyperus_rotundus_Blanco1.206-cropped.jpg/640px-Cyperus_rotundus_Blanco1.206-cropped.jpg",
    front: {
      sanskritName: "मुस्ता (Musta)",
      latinName: "Cyperus rotundus",
      family: "Cyperaceae",
      commonName: "Nut Grass, Nagarmotha",
      usefulPart: "Rhizome (Kanda)",
    },
    back: {
      rasa: "Tikta (Bitter), Katu (Pungent), Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Sheeta (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Deepana, Grahi",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Deepana, Pachana, Grahi, Jwarahara",
      prayoga: "Jwara, Atisara, Trishna, Apasmara",
      classicalFormulations: ["Mustadi Kwatha", "Mustaka Churna", "Chandanasava"],
    },
    filters: {
      rasaList: ["Tikta", "Katu", "Kashaya"],
      virya: "Sheeta",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Rhizome",
    },
  },
  {
    id: "5",
    category: "Jwarahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Picrorhiza_kurrooa_Royle_ex_Benth.jpg/640px-Picrorhiza_kurrooa_Royle_ex_Benth.jpg",
    front: {
      sanskritName: "कटुकी (Katuki)",
      latinName: "Picrorhiza kurroa",
      family: "Scrophulariaceae",
      commonName: "Kutki",
      usefulPart: "Rhizome (Kanda)",
    },
    back: {
      rasa: "Tikta (Bitter)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Sheeta (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Jwarahara, Kamalaghna",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Jwarahara, Deepana, Rechana, Kamalaghna",
      prayoga: "Jwara, Kamala, Yakrit Roga, Kushtha",
      classicalFormulations: ["Arogyavardhini Vati", "Katukadya Churna", "Tikta Ghrita"],
    },
    filters: {
      rasaList: ["Tikta"],
      virya: "Sheeta",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Rhizome",
    },
  },

  // ===== SHOTHAHARA DRUGS =====
  {
    id: "6",
    category: "Shothahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Curcuma_longa_roots.jpg/640px-Curcuma_longa_roots.jpg",
    front: {
      sanskritName: "हरिद्रा (Haridra)",
      latinName: "Curcuma longa",
      family: "Zingiberaceae",
      commonName: "Turmeric, Haldi",
      usefulPart: "Rhizome (Kanda)",
    },
    back: {
      rasa: "Tikta (Bitter), Katu (Pungent)",
      guna: "Ruksha (Dry), Laghu (Light)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Varnya, Vishaghna",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Varnya, Kusthaghna, Vishaghna, Shothahara",
      prayoga: "Prameha, Kushtha, Pandu, Shotha, Vrana",
      classicalFormulations: ["Haridra Khanda", "Nishakathakadi Kashaya", "Khadiradi Vati"],
    },
    filters: {
      rasaList: ["Tikta", "Katu"],
      virya: "Ushna",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Rhizome",
    },
  },
  {
    id: "7",
    category: "Shothahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Commiphora_wightii.jpg/640px-Commiphora_wightii.jpg",
    front: {
      sanskritName: "गुग्गुलु (Guggulu)",
      latinName: "Commiphora wightii",
      family: "Burseraceae",
      commonName: "Indian Bdellium",
      usefulPart: "Oleo-gum Resin (Niryasa)",
    },
    back: {
      rasa: "Tikta (Bitter), Katu (Pungent)",
      guna: "Laghu (Light), Ruksha (Dry), Tikshna (Sharp), Vishada (Clear), Sukshma (Subtle)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Lekhana, Medohara",
      doshaKarma: "Tridosha Shamaka, especially Kapha-Vata",
      importantKarma: "Shothahara, Vedanasthapana, Lekhana, Vranaropana",
      prayoga: "Amavata, Vatavyadhi, Medoroga, Granthi",
      classicalFormulations: ["Yogaraja Guggulu", "Kaishore Guggulu", "Triphala Guggulu"],
    },
    filters: {
      rasaList: ["Tikta", "Katu"],
      virya: "Ushna",
      doshaList: ["Tridosha", "Kapha", "Vata"],
      usefulPart: "Resin",
    },
  },
  {
    id: "8",
    category: "Shothahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Boerhavia_diffusa_W_IMG_1583.jpg/640px-Boerhavia_diffusa_W_IMG_1583.jpg",
    front: {
      sanskritName: "पुनर्नवा (Punarnava)",
      latinName: "Boerhavia diffusa",
      family: "Nyctaginaceae",
      commonName: "Spreading Hogweed, Horse Purslane",
      usefulPart: "Root (Mula), Whole Plant",
    },
    back: {
      rasa: "Madhura (Sweet), Tikta (Bitter), Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Ushna (Hot)",
      vipaka: "Madhura (Sweet)",
      prabhava: "Shothahara, Rasayana",
      doshaKarma: "Tridosha Shamaka, especially Kapha",
      importantKarma: "Shothahara, Mutral, Rasayana, Hrudya",
      prayoga: "Shotha, Pandu, Hridroga, Mutrakrichra, Ascites",
      classicalFormulations: ["Punarnavadi Kashaya", "Punarnavadi Mandura", "Punarnava Mandura"],
    },
    filters: {
      rasaList: ["Madhura", "Tikta", "Kashaya"],
      virya: "Ushna",
      doshaList: ["Tridosha", "Kapha"],
      usefulPart: "Root",
    },
  },
  {
    id: "9",
    category: "Shothahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Vitex_negundo_%28Nirgundi%29_in_Hyderabad_W_IMG_8187.jpg/640px-Vitex_negundo_%28Nirgundi%29_in_Hyderabad_W_IMG_8187.jpg",
    front: {
      sanskritName: "निर्गुण्डी (Nirgundi)",
      latinName: "Vitex negundo",
      family: "Verbenaceae",
      commonName: "Five-leaved Chaste Tree",
      usefulPart: "Leaf (Patra), Root (Mula)",
    },
    back: {
      rasa: "Katu (Pungent), Tikta (Bitter)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Shothahara, Vedanasthapana",
      doshaKarma: "Kapha-Vata Shamaka",
      importantKarma: "Shothahara, Vedanasthapana, Keshya, Jantughna",
      prayoga: "Shotha, Shula, Vrana, Keshapata",
      classicalFormulations: ["Nirgundi Taila", "Nirgundyadi Kashaya", "Vishagarbha Taila"],
    },
    filters: {
      rasaList: ["Katu", "Tikta"],
      virya: "Ushna",
      doshaList: ["Kapha", "Vata"],
      usefulPart: "Leaf",
    },
  },
  {
    id: "10",
    category: "Shothahara",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Moringa_oleifera_%28Sajina%29_in_Narsapur%2C_AP_W_IMG_0742.jpg/640px-Moringa_oleifera_%28Sajina%29_in_Narsapur%2C_AP_W_IMG_0742.jpg",
    front: {
      sanskritName: "शिग्रु (Shigru)",
      latinName: "Moringa oleifera",
      family: "Moringaceae",
      commonName: "Drumstick Tree, Moringa",
      usefulPart: "Root Bark (Mula Twak), Leaf (Patra)",
    },
    back: {
      rasa: "Katu (Pungent), Tikta (Bitter)",
      guna: "Laghu (Light), Ruksha (Dry), Tikshna (Sharp)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Vedanasthapana",
      doshaKarma: "Kapha-Vata Shamaka",
      importantKarma: "Vedanasthapana, Shothahara, Deepana, Hridya",
      prayoga: "Shula, Shotha, Vataroga, Aruchi",
      classicalFormulations: ["Shigru Taila", "Shigruadi Kwatha"],
    },
    filters: {
      rasaList: ["Katu", "Tikta"],
      virya: "Ushna",
      doshaList: ["Kapha", "Vata"],
      usefulPart: "Bark",
    },
  },
  {
    id: "11",
    category: "Shothahara",
    front: {
      sanskritName: "गम्भारी (Gambhari)",
      latinName: "Gmelina arborea",
      family: "Verbenaceae",
      commonName: "Beechwood, Gamhar",
      usefulPart: "Root (Mula), Fruit (Phala)",
    },
    back: {
      rasa: "Tikta (Bitter), Madhura (Sweet), Kashaya (Astringent)",
      guna: "Guru (Heavy)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Balya, Rasayana",
      doshaKarma: "Tridosha Shamaka",
      importantKarma: "Balya, Rasayana, Shothahara, Jwarahara",
      prayoga: "Jwara, Daha, Trishna, Daurbalya",
      classicalFormulations: ["Dashmula Kwatha", "Chyawanprash"],
    },
    filters: {
      rasaList: ["Tikta", "Madhura", "Kashaya"],
      virya: "Ushna",
      doshaList: ["Tridosha"],
      usefulPart: "Root",
    },
  },
  {
    id: "12",
    category: "Shothahara",
    front: {
      sanskritName: "दारुहरिद्रा (Daruharidra)",
      latinName: "Berberis aristata",
      family: "Berberidaceae",
      commonName: "Tree Turmeric, Indian Barberry",
      usefulPart: "Stem (Kanda), Root (Mula)",
    },
    back: {
      rasa: "Tikta (Bitter), Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Chakshushya, Kusthaghna",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Shothahara, Jwarahara, Kusthaghna, Chakshushya",
      prayoga: "Prameha, Netra Roga, Kushtha, Kamala",
      classicalFormulations: ["Daruharidra Churna", "Chandraprabha Vati"],
    },
    filters: {
      rasaList: ["Tikta", "Kashaya"],
      virya: "Ushna",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Stem",
    },
  },
  {
    id: "13",
    category: "Shothahara",
    front: {
      sanskritName: "शल्लकी (Shallaki)",
      latinName: "Boswellia serrata",
      family: "Burseraceae",
      commonName: "Indian Frankincense, Salai Guggul",
      usefulPart: "Gum Resin (Niryasa)",
    },
    back: {
      rasa: "Kashaya (Astringent), Madhura (Sweet)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Sheeta (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Shothahara, Vedanasthapana",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Shothahara, Vedanasthapana, Sandhishotha, Vranaropana",
      prayoga: "Sandhivata, Amavata, Shotha, Vrana",
      classicalFormulations: ["Shallaki Churna", "Shallakigugguluadi Vati"],
    },
    filters: {
      rasaList: ["Kashaya", "Madhura"],
      virya: "Sheeta",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Resin",
    },
  },

  // ===== KRIMIGHNA DRUGS =====
  {
    id: "14",
    category: "Krimighna",
    front: {
      sanskritName: "विडंग (Vidanga)",
      latinName: "Embelia ribes",
      family: "Myrsinaceae",
      commonName: "False Black Pepper, Vaividang",
      usefulPart: "Fruit (Phala)",
    },
    back: {
      rasa: "Katu (Pungent), Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry), Tikshna (Sharp)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Krimighna (Anthelmintic)",
      doshaKarma: "Kapha-Vata Shamaka",
      importantKarma: "Krimighna, Deepana, Anulomana, Shirovirechana",
      prayoga: "Krimi Roga, Udara Roga, Kushtha",
      classicalFormulations: ["Vidangadi Churna", "Vidangasava", "Krimighatini Vati"],
    },
    filters: {
      rasaList: ["Katu", "Kashaya"],
      virya: "Ushna",
      doshaList: ["Kapha", "Vata"],
      usefulPart: "Fruit",
    },
  },
  {
    id: "15",
    category: "Krimighna",
    front: {
      sanskritName: "कम्पिल्लक (Kampillaka)",
      latinName: "Mallotus philippensis",
      family: "Euphorbiaceae",
      commonName: "Kamala Tree, Monkey Face Tree",
      usefulPart: "Fruit Glands (Phala Rajas)",
    },
    back: {
      rasa: "Katu (Pungent)",
      guna: "Laghu (Light), Ruksha (Dry), Tikshna (Sharp)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Krimighna",
      doshaKarma: "Kapha-Vata Shamaka",
      importantKarma: "Krimighna, Virechana, Kushtaghna",
      prayoga: "Krimi, Kushtha, Udararoga",
      classicalFormulations: ["Kampillakadi Churna", "Krimighatini Vati"],
    },
    filters: {
      rasaList: ["Katu"],
      virya: "Ushna",
      doshaList: ["Kapha", "Vata"],
      usefulPart: "Fruit",
    },
  },
  {
    id: "16",
    category: "Krimighna",
    front: {
      sanskritName: "पलाश (Palasha)",
      latinName: "Butea monosperma",
      family: "Fabaceae",
      commonName: "Flame of the Forest, Bastard Teak",
      usefulPart: "Seed (Beeja), Bark (Twak)",
    },
    back: {
      rasa: "Katu (Pungent), Tikta (Bitter), Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry), Tikshna (Sharp)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Krimighna",
      doshaKarma: "Kapha-Vata Shamaka",
      importantKarma: "Krimighna, Virechana, Chakshushya",
      prayoga: "Krimi, Netra Roga, Arsha",
      classicalFormulations: ["Palasha Beeja Churna", "Palasha Kshara"],
    },
    filters: {
      rasaList: ["Katu", "Tikta", "Kashaya"],
      virya: "Ushna",
      doshaList: ["Kapha", "Vata"],
      usefulPart: "Seed",
    },
  },

  // ===== RAKTASHODHAKA DRUGS =====
  {
    id: "17",
    category: "Raktashodhaka",
    front: {
      sanskritName: "मञ्जिष्ठा (Manjishtha)",
      latinName: "Rubia cordifolia",
      family: "Rubiaceae",
      commonName: "Indian Madder",
      usefulPart: "Root (Mula)",
    },
    back: {
      rasa: "Tikta (Bitter), Kashaya (Astringent), Madhura (Sweet)",
      guna: "Guru (Heavy), Ruksha (Dry)",
      virya: "Ushna (Hot)",
      vipaka: "Katu (Pungent)",
      prabhava: "Varnya, Raktaprasadana",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Raktashodhaka, Varnya, Vishaghna, Shothahara",
      prayoga: "Raktavikara, Kushtha, Visarpa, Vrana",
      classicalFormulations: ["Manjishthadi Kashaya", "Mahamanjishthadi Kashaya", "Khadirarishta"],
    },
    filters: {
      rasaList: ["Tikta", "Kashaya", "Madhura"],
      virya: "Ushna",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Root",
    },
  },
  {
    id: "18",
    category: "Raktashodhaka",
    front: {
      sanskritName: "नीम (Nimba)",
      latinName: "Azadirachta indica",
      family: "Meliaceae",
      commonName: "Neem, Margosa Tree",
      usefulPart: "All parts - Bark, Leaves, Seeds (Twak, Patra, Beeja)",
    },
    back: {
      rasa: "Tikta (Bitter), Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Sheeta (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Krimighna, Kusthaghna",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Krimighna, Kusthaghna, Raktashodhaka, Jwaraghna",
      prayoga: "Kushtha, Prameha, Jwara, Krimi, Vrana",
      classicalFormulations: ["Nimbadi Churna", "Nimbadi Kashaya", "Panchtikta Ghrita Guggulu"],
    },
    filters: {
      rasaList: ["Tikta", "Kashaya"],
      virya: "Sheeta",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Bark",
    },
  },
  {
    id: "19",
    category: "Raktashodhaka",
    front: {
      sanskritName: "खदिर (Khadira)",
      latinName: "Acacia catechu",
      family: "Fabaceae",
      commonName: "Catechu Tree, Cutch Tree",
      usefulPart: "Heartwood (Sara), Bark (Twak)",
    },
    back: {
      rasa: "Tikta (Bitter), Kashaya (Astringent)",
      guna: "Laghu (Light), Ruksha (Dry)",
      virya: "Sheeta (Cold)",
      vipaka: "Katu (Pungent)",
      prabhava: "Kusthaghna, Raktashodhaka",
      doshaKarma: "Kapha-Pitta Shamaka",
      importantKarma: "Kusthaghna, Raktashodhaka, Varnya, Kandughna",
      prayoga: "Kushtha, Prameha, Mukharoga, Raktavikara",
      classicalFormulations: ["Khadirarishta", "Khadiradi Vati", "Khadiradi Kashaya"],
    },
    filters: {
      rasaList: ["Tikta", "Kashaya"],
      virya: "Sheeta",
      doshaList: ["Kapha", "Pitta"],
      usefulPart: "Heartwood",
    },
  },
  {
    id: "20",
    category: "Raktashodhaka",
    front: {
      sanskritName: "सारिवा (Sariva)",
      latinName: "
