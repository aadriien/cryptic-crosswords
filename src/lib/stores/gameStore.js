import { writable, derived } from 'svelte/store';
import { getCluesForSource } from '../data/sources.js';

// Core state
export const currentClueIndex = writable(0);
export const selectedDifficulty = writable('all');
export const selectedSource = writable('regular'); // 'regular' or 'nytimes'
export const userAnswer = writable([]);
export const revealedLetters = writable([]);
export const showAnswer = writable(false);
export const showExplanation = writable(false);
export const hintLevel = writable(0);

// Score tracking
export const score = writable(0);
export const attempted = writable(0);

// Feedback
export const feedbackMessage = writable('');
export const feedbackType = writable(''); // 'correct' or 'incorrect'

// Solved clues inventory with localStorage persistence
const SOLVED_CLUES_KEY = 'cryptic-crosswords-solved-clues';

// Load solved clues from localStorage on initialization
function loadSolvedClues() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(SOLVED_CLUES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load solved clues from localStorage:', e);
      return [];
    }
  }
  return [];
}

export const solvedClues = writable(loadSolvedClues());
export const showInventory = writable(false);

// Subscribe to solvedClues changes and save to localStorage
if (typeof window !== 'undefined') {
  solvedClues.subscribe(value => {
    try {
      localStorage.setItem(SOLVED_CLUES_KEY, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save solved clues to localStorage:', e);
    }
  });
}

// Derived stores
export const allClues = derived(
  selectedSource,
  ($selectedSource) => {
    return getCluesForSource($selectedSource);
  }
);

export const filteredClues = derived(
  [allClues, selectedDifficulty, solvedClues],
  ([$allClues, $selectedDifficulty, $solvedClues]) => {
    // First filter by difficulty
    let clues = $selectedDifficulty === 'all'
      ? $allClues
      : $allClues.filter(c => c.difficulty === $selectedDifficulty);
    
    // Then filter out solved clues
    const solvedClueIds = new Set(
      $solvedClues.map(c => `${c.clue}|${c.answer}`)
    );
    
    return clues.filter(c => !solvedClueIds.has(`${c.clue}|${c.answer}`));
  }
);

export const currentClue = derived(
  [filteredClues, currentClueIndex],
  ([$filteredClues, $currentClueIndex]) => {
    if ($filteredClues.length === 0) {
      return null;
    }
    return $filteredClues[$currentClueIndex];
  }
);

export const answerLength = derived(
  currentClue,
  ($currentClue) => {
    return $currentClue ? $currentClue.answer.replace(/\s/g, '').length : 0;
  }
);

export const hasClues = derived(
  filteredClues,
  ($filteredClues) => $filteredClues.length > 0
);
