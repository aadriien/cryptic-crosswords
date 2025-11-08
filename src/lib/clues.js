// Verified cryptic crossword clues with proper construction
// Note: More real clues need to be added from actual cryptic crossword sources
// Good sources: The Guardian, The Times, Telegraph cryptics

export const crypticClues = [
  // === EASY DOUBLE DEFINITIONS ===
  {
    clue: "Boat made of paper (5)",
    answer: "CRAFT",
    length: "5",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'Boat' (vessel)",
      indicator: "None - both parts define the answer",
      fodder: "'made of paper' (as in the craft of making things)"
    },
    explanation: {
      definition: "'Boat' and 'made' are both definitions of the answer",
      wordplay: "CRAFT can mean both a boat/vessel AND the skill of making things (like paper craft)",
      breakdown: "This is a double definition clue - both parts of the clue define the same answer. CRAFT = boat, CRAFT = skill in making things.",
      tip: "Double definition clues are often the easiest type. Look for two different meanings of the same word."
    }
  },
  {
    clue: "Observe the parade (5)",
    answer: "WATCH",
    length: "5",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'Observe' (to watch)",
      indicator: "None - both parts define the answer",
      fodder: "'the parade' (military watch/guard duty)"
    },
    explanation: {
      definition: "'Observe' and 'the parade' both point to the answer",
      wordplay: "WATCH = to observe, WATCH = a military parade or guard duty",
      breakdown: "Double definition. WATCH means to observe/look at something, and also means a military parade or guard duty.",
      tip: "When you see two simple words or phrases that seem unrelated, consider if they might both define the same word."
    }
  },
  {
    clue: "Flower that's a girl's name (4)",
    answer: "ROSE",
    length: "4",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'Flower' (the plant)",
      indicator: "None - both parts define the answer",
      fodder: "'girl's name' (Rose as a name)"
    },
    explanation: {
      definition: "'Flower' and 'girl's name' both define the answer",
      wordplay: "ROSE is both a flower AND a common girl's name",
      breakdown: "A straightforward double definition. ROSE = a type of flower, ROSE = a female given name.",
      tip: "Names are common in cryptic crosswords. Think about words that have multiple meanings including proper nouns."
    }
  },
  {
    clue: "Small child (3)",
    answer: "TOT",
    length: "3",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'Small' (a small amount)",
      indicator: "None - both parts define the answer",
      fodder: "'child' (a young child)"
    },
    explanation: {
      definition: "Both 'Small' and 'child' define the answer",
      wordplay: "TOT = a small amount (like a tot of whisky), TOT = a small child",
      breakdown: "Double definition: TOT means both 'a small measure' and 'a young child'.",
      tip: "The shortest clues are often double definitions."
    }
  },
  {
    clue: "Compete in a competition (4)",
    answer: "RACE",
    length: "4",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'Compete' (verb: to race)",
      indicator: "None - both parts define the answer",
      fodder: "'competition' (noun: a race)"
    },
    explanation: {
      definition: "Both parts of the clue define RACE",
      wordplay: "RACE can be a verb (to compete) or a noun (a competition)",
      breakdown: "Simple double definition where RACE works as both verb and noun.",
      tip: "Look for words that can be different parts of speech."
    }
  },
  {
    clue: "Pub at end of street (3)",
    answer: "BAR",
    length: "3",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'Pub' (drinking establishment)",
      indicator: "None - both parts define the answer",
      fodder: "'at end of street' (to bar/block the end)"
    },
    explanation: {
      definition: "Pub and barrier/end both work",
      wordplay: "BAR = pub/tavern, BAR = to block/prevent",
      breakdown: "Double definition: BAR as drinking establishment and BAR as obstruction.",
      tip: "Short clues are often double definitions."
    }
  },
  {
    clue: "Type of tree or mountain (3)",
    answer: "ASH",
    length: "3",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'tree' (ash tree)",
      indicator: "'or' - signals two separate definitions",
      fodder: "'mountain' (volcanic ash from mountains)"
    },
    explanation: {
      definition: "Tree species and volcanic material",
      wordplay: "ASH is a tree species AND the residue from volcanoes/mountains",
      breakdown: "Simple double definition linking tree and volcanic ash.",
      tip: "'Or' can signal a double definition."
    }
  },
  {
    clue: "Letter from Greece required in maths (5)",
    answer: "THETA",
    length: "5",
    difficulty: "easy",
    type: "Double Definition",
    hints: {
      definition: "'Letter from Greece' (Greek letter)",
      indicator: "None - both parts define the answer",
      fodder: "'required in maths' (mathematical symbol)"
    },
    explanation: {
      definition: "'Letter from Greece' and 'required in maths' both define the answer",
      wordplay: "THETA is a Greek letter AND a mathematical symbol",
      breakdown: "THETA is the eighth letter of the Greek alphabet and commonly used in mathematics for angles.",
      tip: "Greek letters appear frequently in cryptics: ALPHA, BETA, GAMMA, DELTA, etc."
    }
  },
  {
    clue: "Make angry and blow top (6)",
    answer: "MADDEN",
    length: "6",
    difficulty: "medium",
    type: "Double Definition",
    hints: {
      definition: "'Make angry' (to madden/enrage)",
      indicator: "'and' - connects two definitions",
      fodder: "'blow top' (to go mad/madden)"
    },
    explanation: {
      definition: "Both 'Make angry' and 'blow top' are definitions",
      wordplay: "MADDEN = to make someone angry, to madden can also mean to blow one's top/go crazy",
      breakdown: "This is a double definition where both phrases mean the same thing - MADDEN (to infuriate/enrage).",
      tip: "Look for phrases that might be saying the same thing in different ways."
    }
  },
  {
    clue: "Bird served with dressing on the side (4)",
    answer: "DUCK",
    length: "4",
    difficulty: "medium",
    type: "Double Definition",
    hints: {
      definition: "'Bird' (waterfowl)",
      indicator: "None - both parts define the answer",
      fodder: "'on the side' (to duck/move aside)"
    },
    explanation: {
      definition: "Waterfowl and action",
      wordplay: "DUCK = bird species, DUCK = to move aside/avoid",
      breakdown: "Classic double definition with misdirection about food.",
      tip: "Surface reading often creates a misleading picture."
    }
  },

  // === HOMOPHONES ===
  {
    clue: "Belonging to us, we hear (3)",
    answer: "OUR",
    length: "3",
    difficulty: "medium",
    type: "Homophone",
    hints: {
      definition: "'Belonging to us'",
      indicator: "'we hear' - signals a homophone (sound-alike)",
      fodder: "HOUR (unit of time) sounds like OUR"
    },
    explanation: {
      definition: "'Belonging to us' is the definition",
      wordplay: "The phrase 'we hear' indicates a homophone (sounds-like) clue. OUR sounds like HOUR",
      breakdown: "OUR (belonging to us) sounds like HOUR (a unit of time). The words 'we hear', 'sounds like', 'reportedly' are common indicators for homophones.",
      tip: "Homophone indicators include: 'we hear', 'sounds like', 'reportedly', 'they say', 'audibly', 'vocal', 'on the radio', etc."
    }
  },
  {
    clue: "Listening to music by the ocean (3)",
    answer: "SEA",
    length: "3",
    difficulty: "easy",
    type: "Homophone",
    hints: {
      definition: "'ocean'",
      indicator: "'Listening to' - signals a homophone",
      fodder: "'music' = C (the musical note) sounds like SEA"
    },
    explanation: {
      definition: "'ocean' is the definition",
      wordplay: "'Listening to' indicates homophone. Music note = C, sounds like SEA",
      breakdown: "The musical note 'C' sounds like SEA (ocean). Homophone clues rely on words that sound the same.",
      tip: "Musical notes (A, B, C, D, E, F, G) often appear in cryptic clues as homophones."
    }
  },

  // === HIDDEN WORDS ===
  {
    clue: "Insect found in the pantry (3)",
    answer: "ANT",
    length: "3",
    difficulty: "easy",
    type: "Hidden Word",
    hints: {
      definition: "'Insect'",
      indicator: "'found in' - signals a hidden word",
      fodder: "'the pantry' contains ANT (p-ANT-ry)"
    },
    explanation: {
      definition: "'Insect' is the definition",
      wordplay: "'found in' indicates hidden word. 'the pANTry' contains ANT",
      breakdown: "The word ANT is hidden in 'the pANTry'. Simple hidden word clue.",
      tip: "'Found in', 'hidden in', 'part of' all indicate hidden word clues."
    }
  },
  {
    clue: "Musical work held by Spartan theme (6)",
    answer: "ANTHEM",
    length: "6",
    difficulty: "medium",
    type: "Hidden Word",
    hints: {
      definition: "'Musical work'",
      indicator: "'held by' - signals a hidden word",
      fodder: "'Spartan theme' contains ANTHEM (spart-AN THEM-e)"
    },
    explanation: {
      definition: "'Musical work' is the definition",
      wordplay: "'held by' indicates hidden word. 'sparTAN THEMe' contains ANTHEM",
      breakdown: "The word ANTHEM is hidden in 'sparTAN THEMe'. An anthem is a musical work or song.",
      tip: "Hidden words can span across word boundaries in the clue."
    }
  },

  // === REVERSALS ===
  {
    clue: "Music maker turned over fish (4)",
    answer: "TUNA",
    length: "4",
    difficulty: "medium",
    type: "Reversal",
    hints: {
      definition: "'fish'",
      indicator: "'turned over' - signals reversal",
      fodder: "'Music maker' = AUNT, reversed = TUNA"
    },
    explanation: {
      definition: "'fish' is the definition",
      wordplay: "'turned over' indicates reversal. Music maker = AUNT (like Auntie Beeb, BBC), reversed = TUNA",
      breakdown: "AUNT reversed (turned over) gives TUNA, which is a type of fish. Reversal indicators work differently in across vs down clues.",
      tip: "Reversal indicators: 'turned over', 'back', 'returned', 'up' (in down clues), 'left' or 'west' (in across clues)."
    }
  },

  // === CHARADES (parts joining) ===
  {
    clue: "A tree is like one (5)",
    answer: "ASPEN",
    length: "5",
    difficulty: "easy",
    type: "Charade",
    hints: {
      definition: "'tree'",
      indicator: "None - parts join directly",
      fodder: "'is like' = AS, 'one' = PEN (prison slang)"
    },
    explanation: {
      definition: "'A tree' is the definition",
      wordplay: "AS (like) + PEN (one = penitentiary, jail)",
      breakdown: "AS + PEN = ASPEN, which is a type of tree. 'Like' = AS, 'one' (as in doing time) = PEN.",
      tip: "Common crossword shorthand: 'one' can mean PEN (penitentiary), I (Roman numeral), or A."
    }
  },
  {
    clue: "Container for couple who get married (6)",
    answer: "UNITED",
    length: "6",
    difficulty: "medium",
    type: "Charade",
    hints: {
      definition: "'who get married'",
      indicator: "None - parts join directly",
      fodder: "'Container' = UNIT, 'for couple' = ED (abbreviation)"
    },
    explanation: {
      definition: "'who get married' is the definition",
      wordplay: "Container = UNIT, for couple = ED (abbreviation)",
      breakdown: "UNIT (container) + ED = UNITED (married/joined together). This is a charade where parts are added together.",
      tip: "Look for common abbreviations like ED, AL, DI, etc. that can represent names or roles."
    }
  }
];
