<script>
  import { crypticClues } from './clues.js';
  
  let currentClueIndex = 0;
  let userAnswer = [];
  let showAnswer = false;
  let showExplanation = false;
  let score = 0;
  let attempted = 0;
  let selectedDifficulty = 'all';
  let revealedLetters = [];
  let feedbackMessage = '';
  let feedbackType = ''; // 'correct' or 'incorrect'

  $: currentClue = filteredClues[currentClueIndex];
  $: filteredClues = selectedDifficulty === 'all' 
    ? crypticClues 
    : crypticClues.filter(c => c.difficulty === selectedDifficulty);
  $: answerLength = currentClue.answer.replace(/\s/g, '').length;
  
  // Initialize answer array when clue changes
  $: if (currentClue) {
    userAnswer = Array(answerLength).fill('');
    revealedLetters = Array(answerLength).fill(false);
  }
  
  function checkAnswer() {
    const userAnswerStr = userAnswer.join('').toLowerCase();
    const correctNormalized = currentClue.answer.toLowerCase().replace(/\s/g, '');
    
    if (userAnswerStr === correctNormalized) {
      score++;
      attempted++;
      feedbackMessage = 'Correct! Well done! 🎉';
      feedbackType = 'correct';
      setTimeout(() => {
        nextClue();
      }, 1500);
    } else {
      attempted++;
      feedbackMessage = 'Not quite right. Try again or reveal the answer!';
      feedbackType = 'incorrect';
    }
  }

  function revealHint() {
    const correctAnswer = currentClue.answer.replace(/\s/g, '');
    const unrevealedIndices = [];
    
    // Find all unrevealed positions
    for (let i = 0; i < answerLength; i++) {
      if (!revealedLetters[i] && userAnswer[i] !== correctAnswer[i].toUpperCase()) {
        unrevealedIndices.push(i);
      }
    }
    
    if (unrevealedIndices.length > 0) {
      // Pick a random unrevealed position
      const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
      userAnswer[randomIndex] = correctAnswer[randomIndex].toUpperCase();
      revealedLetters[randomIndex] = true;
    }
  }

  function revealAnswer() {
    showAnswer = true;
  }

  function toggleExplanation() {
    showExplanation = !showExplanation;
  }

  function nextClue() {
    currentClueIndex = (currentClueIndex + 1) % filteredClues.length;
    userAnswer = Array(answerLength).fill('');
    revealedLetters = Array(answerLength).fill(false);
    showAnswer = false;
    showExplanation = false;
    feedbackMessage = '';
    feedbackType = '';
  }

  function previousClue() {
    currentClueIndex = (currentClueIndex - 1 + filteredClues.length) % filteredClues.length;
    userAnswer = Array(answerLength).fill('');
    revealedLetters = Array(answerLength).fill(false);
    showAnswer = false;
    showExplanation = false;
    feedbackMessage = '';
    feedbackType = '';
  }

  function handleInput(index, event) {
    const value = event.target.value.toUpperCase();
    if (value.match(/^[A-Z]$/)) {
      userAnswer[index] = value;
      // Move to next box
      if (index < answerLength - 1) {
        const nextInput = event.target.nextElementSibling;
        if (nextInput) nextInput.focus();
      }
    } else if (value === '') {
      userAnswer[index] = '';
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && userAnswer[index] === '' && index > 0) {
      const prevInput = event.target.previousElementSibling;
      if (prevInput) {
        prevInput.focus();
        userAnswer[index - 1] = '';
      }
    } else if (event.key === 'Enter') {
      checkAnswer();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.target.previousElementSibling?.focus();
    } else if (event.key === 'ArrowRight' && index < answerLength - 1) {
      event.target.nextElementSibling?.focus();
    }
  }

  function changeDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    currentClueIndex = 0;
    userAnswer = Array(answerLength).fill('');
    revealedLetters = Array(answerLength).fill(false);
    showAnswer = false;
    showExplanation = false;
    feedbackMessage = '';
    feedbackType = '';
  }
</script>

<div class="trainer">
  <div class="stats">
    <span>Score: {score}/{attempted}</span>
    <span>Clue {currentClueIndex + 1} of {filteredClues.length}</span>
  </div>

  <div class="difficulty-selector">
    <button 
      class:active={selectedDifficulty === 'all'} 
      on:click={() => changeDifficulty('all')}
    >
      All
    </button>
    <button 
      class:active={selectedDifficulty === 'easy'} 
      on:click={() => changeDifficulty('easy')}
    >
      Easy
    </button>
    <button 
      class:active={selectedDifficulty === 'medium'} 
      on:click={() => changeDifficulty('medium')}
    >
      Medium
    </button>
    <button 
      class:active={selectedDifficulty === 'hard'} 
      on:click={() => changeDifficulty('hard')}
    >
      Hard
    </button>
  </div>

  <div class="clue-card">
    <div class="clue-header">
      <span class="difficulty-badge {currentClue.difficulty}">
        {currentClue.difficulty}
      </span>
      <span class="clue-type">{currentClue.type}</span>
    </div>
    
    <div class="clue-text">
      "{currentClue.clue}"
    </div>
    
    <div class="letter-count">
      ({currentClue.length})
    </div>

    <div class="letter-boxes">
      {#each Array(answerLength) as _, i}
        <input
          type="text"
          class="letter-box"
          class:revealed={revealedLetters[i]}
          maxlength="1"
          bind:value={userAnswer[i]}
          on:input={(e) => handleInput(i, e)}
          on:keydown={(e) => handleKeyDown(i, e)}
          disabled={showAnswer || revealedLetters[i]}
        />
      {/each}
    </div>

    <div class="action-row">
      <button class="check-btn" on:click={checkAnswer} disabled={showAnswer}>
        Check Answer
      </button>
      <button class="hint-btn" on:click={revealHint} disabled={showAnswer}>
        💡 Reveal Letter
      </button>
    </div>

    {#if feedbackMessage}
      <div class="feedback {feedbackType}">
        {feedbackMessage}
      </div>
    {/if}

    {#if showAnswer}
      <div class="answer-reveal">
        <strong>Answer:</strong> {currentClue.answer}
      </div>
    {/if}

    <div class="action-buttons">
      <button on:click={revealAnswer} disabled={showAnswer}>
        Reveal Answer
      </button>
      <button on:click={toggleExplanation} class="explain-btn">
        {showExplanation ? 'Hide' : 'Show'} Explanation
      </button>
    </div>

    {#if showExplanation}
      <div class="explanation">
        <h3>How it works:</h3>
        <p><strong>Definition:</strong> {currentClue.explanation.definition}</p>
        <p><strong>Wordplay:</strong> {currentClue.explanation.wordplay}</p>
        <p><strong>Breakdown:</strong> {currentClue.explanation.breakdown}</p>
        {#if currentClue.explanation.tip}
          <p class="tip"><strong>💡 Tip:</strong> {currentClue.explanation.tip}</p>
        {/if}
      </div>
    {/if}
  </div>

  <div class="navigation">
    <button on:click={previousClue}>← Previous</button>
    <button on:click={nextClue}>Next →</button>
  </div>
</div>

<style>
  .trainer {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    font-weight: 600;
    color: #495057;
  }

  .difficulty-selector {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  }

  .difficulty-selector button {
    padding: 0.5rem 1rem;
    border: 2px solid #dee2e6;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
  }

  .difficulty-selector button:hover {
    border-color: #667eea;
    color: #667eea;
  }

  .difficulty-selector button.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  .clue-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .clue-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .difficulty-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .difficulty-badge.easy {
    background: #d4edda;
    color: #155724;
  }

  .difficulty-badge.medium {
    background: #fff3cd;
    color: #856404;
  }

  .difficulty-badge.hard {
    background: #f8d7da;
    color: #721c24;
  }

  .clue-type {
    padding: 0.25rem 0.75rem;
    background: white;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #667eea;
    font-weight: 600;
  }

  .clue-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
    margin: 1.5rem 0;
    line-height: 1.6;
  }

  .letter-count {
    font-size: 1rem;
    color: #6c757d;
    margin-bottom: 1.5rem;
  }

  .letter-boxes {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .letter-box {
    width: 3rem;
    height: 3rem;
    padding: 0;
    border: 3px solid #dee2e6;
    border-radius: 8px;
    font-size: 1.5rem;
    font-weight: 700;
    font-family: monospace;
    text-align: center;
    text-transform: uppercase;
    transition: all 0.2s;
  }

  .letter-box:focus {
    outline: none;
    border-color: #667eea;
    transform: scale(1.05);
  }

  .letter-box:disabled {
    background: #e9ecef;
    cursor: not-allowed;
  }

  .letter-box.revealed {
    background: #fff3cd;
    border-color: #ffc107;
  }

  .action-row {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .check-btn,
  .hint-btn {
    flex: 1;
    padding: 0.75rem 1.5rem;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }

  .check-btn {
    background: #28a745;
  }

  .check-btn:hover:not(:disabled) {
    background: #218838;
  }

  .check-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }

  .hint-btn {
    background: #ffc107;
    color: #212529;
  }

  .hint-btn:hover:not(:disabled) {
    background: #e0a800;
  }

  .hint-btn:disabled {
    background: #6c757d;
    color: white;
    cursor: not-allowed;
  }

  .feedback {
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
    animation: slideIn 0.3s ease-out;
  }

  .feedback.correct {
    background: #d4edda;
    color: #155724;
    border: 2px solid #28a745;
  }

  .feedback.incorrect {
    background: #f8d7da;
    color: #721c24;
    border: 2px solid #dc3545;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .answer-reveal {
    background: #d4edda;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    font-size: 1.2rem;
    color: #155724;
  }

  .action-buttons {
    display: flex;
    gap: 0.75rem;
  }

  .action-buttons button {
    flex: 1;
    padding: 0.75rem;
    background: white;
    border: 2px solid #667eea;
    color: #667eea;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-buttons button:hover:not(:disabled) {
    background: #667eea;
    color: white;
  }

  .action-buttons button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .explain-btn {
    background: #667eea !important;
    color: white !important;
    border: none !important;
  }

  .explain-btn:hover {
    background: #5568d3 !important;
  }

  .explanation {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .explanation h3 {
    margin-top: 0;
    color: #667eea;
  }

  .explanation p {
    margin: 0.75rem 0;
    line-height: 1.6;
  }

  .tip {
    background: #fff3cd;
    padding: 0.75rem;
    border-radius: 6px;
    margin-top: 1rem !important;
  }

  .navigation {
    display: flex;
    gap: 1rem;
  }

  .navigation button {
    flex: 1;
    padding: 1rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }

  .navigation button:hover {
    background: #5568d3;
  }
</style>
