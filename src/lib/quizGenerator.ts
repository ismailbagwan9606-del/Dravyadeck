import { flashcards, Flashcard } from "@/data/flashcards";
import { QuizQuestion, QuizOption, QuizType } from "@/types/quiz";

// Utility to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Shuffle array utility
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get random items from array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  return shuffleArray(array).slice(0, count);
};

// Get random item excluding specific ones
const getRandomExcluding = <T>(array: T[], exclude: T[], count: number): T[] => {
  const filtered = array.filter(item => !exclude.includes(item));
  return getRandomItems(filtered, count);
};

// Generate MCQ questions
const generateMCQ = (card: Flashcard, allCards: Flashcard[]): QuizQuestion => {
  const questionTemplates = [
    {
      question: `Which drug has ${card.back.rasa} and ${card.back.virya} Virya?`,
      correctAnswer: card.front.sanskritName,
      getWrongAnswers: () => getRandomExcluding(
        allCards.map(c => c.front.sanskritName),
        [card.front.sanskritName],
        3
      ),
      explanation: `${card.front.sanskritName} (${card.front.latinName}) has ${card.back.rasa} and ${card.back.virya} Virya.`,
    },
    {
      question: `What is the Virya of ${card.front.sanskritName}?`,
      correctAnswer: card.back.virya,
      getWrongAnswers: () => {
        const options = ['Ushna', 'Sheeta', 'Anushna'].filter(v => v !== card.back.virya);
        return options.slice(0, 3);
      },
      explanation: `${card.front.sanskritName} has ${card.back.virya} Virya.`,
    },
    {
      question: `What is the Vipaka of ${card.front.sanskritName}?`,
      correctAnswer: card.back.vipaka,
      getWrongAnswers: () => {
        const vipakas = ['Madhura', 'Amla', 'Katu'];
        return vipakas.filter(v => v !== card.back.vipaka);
      },
      explanation: `${card.front.sanskritName} has ${card.back.vipaka} Vipaka.`,
    },
    {
      question: `Which family does ${card.front.sanskritName} belong to?`,
      correctAnswer: card.front.family,
      getWrongAnswers: () => getRandomExcluding(
        [...new Set(allCards.map(c => c.front.family))],
        [card.front.family],
        3
      ),
      explanation: `${card.front.sanskritName} (${card.front.latinName}) belongs to the ${card.front.family} family.`,
    },
    {
      question: `What is the Dosha Karma of ${card.front.sanskritName}?`,
      correctAnswer: card.back.doshaKarma,
      getWrongAnswers: () => getRandomExcluding(
        [...new Set(allCards.map(c => c.back.doshaKarma))],
        [card.back.doshaKarma],
        3
      ),
      explanation: `${card.front.sanskritName} is ${card.back.doshaKarma}.`,
    },
  ];

  const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
  const wrongAnswers = template.getWrongAnswers();
  
  const options: QuizOption[] = shuffleArray([
    { id: generateId(), text: template.correctAnswer, isCorrect: true },
    ...wrongAnswers.map(answer => ({
      id: generateId(),
      text: answer,
      isCorrect: false,
    })),
  ]);

  return {
    id: generateId(),
    type: 'mcq',
    question: template.question,
    options,
    correctAnswer: template.correctAnswer,
    explanation: template.explanation,
    drugId: card.id,
    drugName: card.front.sanskritName,
  };
};

// Generate True/False questions
const generateTrueFalse = (card: Flashcard, allCards: Flashcard[]): QuizQuestion => {
  const isTrue = Math.random() > 0.5;
  
  const trueStatements = [
    {
      statement: `${card.front.sanskritName} has ${card.back.virya} Virya.`,
      explanation: `Correct! ${card.front.sanskritName} indeed has ${card.back.virya} Virya.`,
    },
    {
      statement: `${card.front.sanskritName} is ${card.back.doshaKarma}.`,
      explanation: `Correct! ${card.front.sanskritName} is ${card.back.doshaKarma}.`,
    },
    {
      statement: `The Vipaka of ${card.front.sanskritName} is ${card.back.vipaka}.`,
      explanation: `Correct! ${card.front.sanskritName} has ${card.back.vipaka} Vipaka.`,
    },
    {
      statement: `${card.front.sanskritName} belongs to the ${card.front.family} family.`,
      explanation: `Correct! ${card.front.sanskritName} (${card.front.latinName}) belongs to ${card.front.family}.`,
    },
  ];

  const falseStatements = [
    {
      statement: `${card.front.sanskritName} has ${card.back.virya === 'Ushna' ? 'Sheeta' : 'Ushna'} Virya.`,
      explanation: `Incorrect. ${card.front.sanskritName} actually has ${card.back.virya} Virya.`,
    },
    {
      statement: `The Vipaka of ${card.front.sanskritName} is ${['Madhura', 'Amla', 'Katu'].find(v => v !== card.back.vipaka)}.`,
      explanation: `Incorrect. The Vipaka of ${card.front.sanskritName} is ${card.back.vipaka}.`,
    },
    {
      statement: `${card.front.sanskritName} belongs to the ${getRandomExcluding([...new Set(allCards.map(c => c.front.family))], [card.front.family], 1)[0] || 'Unknown'} family.`,
      explanation: `Incorrect. ${card.front.sanskritName} belongs to the ${card.front.family} family.`,
    },
  ];

  const statements = isTrue ? trueStatements : falseStatements;
  const selected = statements[Math.floor(Math.random() * statements.length)];

  return {
    id: generateId(),
    type: 'trueFalse',
    question: selected.statement,
    options: [
      { id: generateId(), text: 'True', isCorrect: isTrue },
      { id: generateId(), text: 'False', isCorrect: !isTrue },
    ],
    correctAnswer: isTrue ? 'True' : 'False',
    explanation: selected.explanation,
    drugId: card.id,
    drugName: card.front.sanskritName,
  };
};

// Generate Fill in the Blank questions
const generateFillBlank = (card: Flashcard): QuizQuestion => {
  const blanks = [
    {
      question: `The Vipaka of ${card.front.sanskritName} is ____.`,
      answer: card.back.vipaka,
      options: ['Madhura', 'Amla', 'Katu'],
      explanation: `The Vipaka of ${card.front.sanskritName} is ${card.back.vipaka}.`,
    },
    {
      question: `${card.front.sanskritName} has ____ Virya.`,
      answer: card.back.virya,
      options: ['Ushna', 'Sheeta', 'Anushna'],
      explanation: `${card.front.sanskritName} has ${card.back.virya} Virya.`,
    },
    {
      question: `The useful part of ${card.front.sanskritName} is ____.`,
      answer: card.front.usefulPart,
      options: [...new Set(flashcards.map(c => c.front.usefulPart))].slice(0, 4),
      explanation: `The useful part of ${card.front.sanskritName} is ${card.front.usefulPart}.`,
    },
    {
      question: `${card.front.sanskritName} belongs to the ____ category.`,
      answer: card.category,
      options: [...new Set(flashcards.map(c => c.category))].slice(0, 4),
      explanation: `${card.front.sanskritName} belongs to the ${card.category} category.`,
    },
  ];

  const template = blanks[Math.floor(Math.random() * blanks.length)];
  const wrongOptions = template.options.filter(o => o !== template.answer).slice(0, 3);
  
  const options: QuizOption[] = shuffleArray([
    { id: generateId(), text: template.answer, isCorrect: true },
    ...wrongOptions.map(opt => ({
      id: generateId(),
      text: opt,
      isCorrect: false,
    })),
  ]);

  return {
    id: generateId(),
    type: 'fillBlank',
    question: template.question,
    options,
    correctAnswer: template.answer,
    explanation: template.explanation,
    drugId: card.id,
    drugName: card.front.sanskritName,
  };
};

// Generate Identify the Drug questions
const generateIdentifyDrug = (card: Flashcard, allCards: Flashcard[]): QuizQuestion => {
  const properties = [
    `${card.back.rasa}`,
    `${card.back.guna}`,
    `${card.back.virya} Virya`,
    `${card.back.vipaka} Vipaka`,
  ];

  const selectedProps = getRandomItems(properties, 3);
  
  const question = `Identify the drug with these properties:\n• ${selectedProps.join('\n• ')}`;

  const wrongAnswers = getRandomExcluding(
    allCards.map(c => c.front.sanskritName),
    [card.front.sanskritName],
    3
  );

  const options: QuizOption[] = shuffleArray([
    { id: generateId(), text: card.front.sanskritName, isCorrect: true },
    ...wrongAnswers.map(answer => ({
      id: generateId(),
      text: answer,
      isCorrect: false,
    })),
  ]);

  return {
    id: generateId(),
    type: 'identifyDrug',
    question,
    options,
    correctAnswer: card.front.sanskritName,
    explanation: `${card.front.sanskritName} has ${card.back.rasa}, ${card.back.guna}, ${card.back.virya} Virya, and ${card.back.vipaka} Vipaka.`,
    drugId: card.id,
    drugName: card.front.sanskritName,
  };
};

// Main quiz generator function
export const generateQuiz = (type: QuizType, count: number): QuizQuestion[] => {
  const selectedCards = getRandomItems(flashcards, count);
  
  return selectedCards.map(card => {
    switch (type) {
      case 'mcq':
        return generateMCQ(card, flashcards);
      case 'trueFalse':
        return generateTrueFalse(card, flashcards);
      case 'fillBlank':
        return generateFillBlank(card);
      case 'identifyDrug':
        return generateIdentifyDrug(card, flashcards);
      default:
        return generateMCQ(card, flashcards);
    }
  });
};

// Calculate quiz results
export const calculateResults = (
  questions: QuizQuestion[],
  answers: { questionId: string; selectedOptionId: string | null; isCorrect: boolean }[],
  startTime: number
) => {
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const totalQuestions = questions.length;
  
  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers: totalQuestions - correctAnswers,
    accuracy: Math.round((correctAnswers / totalQuestions) * 100),
    answers,
    questions,
    timeTaken: Date.now() - startTime,
  };
};
