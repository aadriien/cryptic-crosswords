import { writable, derived } from 'svelte/store';
import { crypticClues } from '../clues.js';

// Core state
export const currentClueIndex = writable(0);
export const selectedDifficulty = writable('all');
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

// Solved clues inventory
export const solvedClues = writable([]); // Array of solved clue objects
export const showInventory = writable(false);

// Derived stores
export const filteredClues = derived(
  selectedDifficulty,
  ($selectedDifficulty) => {
    return $selectedDifficulty === 'all'
      ? crypticClues
      : crypticClues.filter(c => c.difficulty === $selectedDifficulty);
  }
);

export const currentClue = derived(
  [filteredClues, currentClueIndex],
  ([$filteredClues, $currentClueIndex]) => {
    return $filteredClues[$currentClueIndex];
  }
);

export const answerLength = derived(
  currentClue,
  ($currentClue) => {
    return $currentClue ? $currentClue.answer.replace(/\s/g, '').length : 0;
  }
);
