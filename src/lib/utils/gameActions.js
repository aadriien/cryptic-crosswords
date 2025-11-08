import { get } from 'svelte/store';
import {
  currentClueIndex,
  filteredClues,
  currentClue,
  answerLength,
  userAnswer,
  revealedLetters,
  showAnswer,
  showExplanation,
  score,
  attempted,
  feedbackMessage,
  feedbackType,
  hintLevel,
  selectedDifficulty,
  solvedClues
} from '../stores/gameStore.js';

/**
 * Reset the answer state for a new clue
 */
export function resetAnswerState() {
  const length = get(answerLength);
  userAnswer.set(Array(length).fill(''));
  revealedLetters.set(Array(length).fill(false));
  showAnswer.set(false);
  showExplanation.set(false);
  feedbackMessage.set('');
  feedbackType.set('');
  hintLevel.set(0);
}

/**
 * Check if the user's answer is correct
 */
export function checkAnswer() {
  const currentUserAnswer = get(userAnswer);
  const clue = get(currentClue);
  
  const userAnswerStr = currentUserAnswer.join('').toLowerCase();
  const correctNormalized = clue.answer.toLowerCase().replace(/\s/g, '');
  
  if (userAnswerStr === correctNormalized) {
    score.update(s => s + 1);
    attempted.update(a => a + 1);
    feedbackMessage.set('Correct! Well done! 🎉');
    feedbackType.set('correct');
    
    // Add to solved clues inventory
    solvedClues.update(solved => {
      // Check if already in solved list
      const exists = solved.some(c => c.clue === clue.clue && c.answer === clue.answer);
      if (!exists) {
        return [...solved, { ...clue, solvedAt: new Date().toISOString() }];
      }
      return solved;
    });
    
    setTimeout(() => {
      nextClue();
    }, 1500);
  } else {
    attempted.update(a => a + 1);
    feedbackMessage.set('Not quite right. Try again or reveal the answer!');
    feedbackType.set('incorrect');
  }
}

/**
 * Reveal a random unrevealed letter as a hint
 */
export function revealHint() {
  const clue = get(currentClue);
  const currentUserAnswer = get(userAnswer);
  const currentRevealedLetters = get(revealedLetters);
  const length = get(answerLength);
  
  const correctAnswer = clue.answer.replace(/\s/g, '');
  const unrevealedIndices = [];
  
  // Find all unrevealed positions
  for (let i = 0; i < length; i++) {
    if (!currentRevealedLetters[i] && currentUserAnswer[i] !== correctAnswer[i].toUpperCase()) {
      unrevealedIndices.push(i);
    }
  }
  
  if (unrevealedIndices.length > 0) {
    // Pick a random unrevealed position
    const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
    
    userAnswer.update(answer => {
      answer[randomIndex] = correctAnswer[randomIndex].toUpperCase();
      return answer;
    });
    
    revealedLetters.update(revealed => {
      revealed[randomIndex] = true;
      return revealed;
    });
  }
}

/**
 * Reveal the complete answer
 */
export function revealAnswer() {
  showAnswer.set(true);
}

/**
 * Toggle explanation visibility
 */
export function toggleExplanation() {
  showExplanation.update(val => !val);
}

/**
 * Move to next clue
 */
export function nextClue() {
  const clues = get(filteredClues);
  const currentIndex = get(currentClueIndex);
  
  currentClueIndex.set((currentIndex + 1) % clues.length);
  resetAnswerState();
}

/**
 * Move to previous clue
 */
export function previousClue() {
  const clues = get(filteredClues);
  const currentIndex = get(currentClueIndex);
  
  currentClueIndex.set((currentIndex - 1 + clues.length) % clues.length);
  resetAnswerState();
}

/**
 * Change difficulty filter
 */
export function changeDifficulty(difficulty) {
  selectedDifficulty.set(difficulty);
  currentClueIndex.set(0);
  resetAnswerState();
}

/**
 * Show next hint level
 */
export function showNextHint() {
  hintLevel.update(level => {
    if (level < 3) {
      return level + 1;
    }
    return level;
  });
}

/**
 * Handle input in a letter box
 */
export function handleInput(index, value) {
  if (value.match(/^[A-Z]$/)) {
    userAnswer.update(answer => {
      answer[index] = value;
      return answer;
    });
    return 'move-next';
  } else if (value === '') {
    userAnswer.update(answer => {
      answer[index] = '';
      return answer;
    });
    return 'stay';
  }
  return 'stay';
}

/**
 * Handle backspace in letter boxes
 */
export function handleBackspace(index) {
  const currentUserAnswer = get(userAnswer);
  
  if (currentUserAnswer[index] === '' && index > 0) {
    userAnswer.update(answer => {
      answer[index - 1] = '';
      return answer;
    });
    return 'move-prev';
  }
  return 'stay';
}
