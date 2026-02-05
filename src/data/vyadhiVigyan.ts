export interface VyadhiFlashcard {
  id: string;
  vyadhiName: string;
  category: string;
  paribhasha: string;
  nidana: {
    ahara: string[];
    vihara: string[];
    manasika?: string[];
  };
  poorvaRupa: string[];
  rupa: string[];
  samprapti: {
    doshaPradhanyata: string;
    dushya: string;
    agniStatus: string;
    srotasInvolvement: string;
    srotodushtiPrakara: string;
    udbhavaSthana: string;
    sanchara: string;
    vyaktiSthana: string;
    bhedaSthana?: string;
  };
  bheda: string[];
  upadrava: string[];
  sadhyaAsadhyata: string;
  examMemoryKey: string;
}

export const vyadhiCategories = [
  "All",
  "Jvara Varga",
  "Prameha Varga", 
  "Raktaja Vikara",
  "Annavaha Vikara",
  "Pranavaha Vikara",
  "Udakavaha Vikara",
  "Purishavaha Vikara",
  "Vatavyadhi"
];

export const vyadhiFlashcards: VyadhiFlashcard[] = [];
