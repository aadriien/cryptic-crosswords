<script>
  import { crypticClues } from './clues.js';
  
  let currentClueIndex = 0;
  let userAnswer = '';
  let showAnswer = false;
  let showExplanation = false;
  let score = 0;
  let attempted = 0;
  let selectedDifficulty = 'all';

  $: currentClue = filteredClues[currentClueIndex];
  $: filteredClues = selectedDifficulty === 'all' 
    ? crypticClues 
    : crypticClues.filter(c => c.difficulty === selectedDifficulty);
  
  function checkAnswer() {
    const normalized = userAnswer.trim().toLowerCase().replace(/\s/g, '');
    const correctNormalized = currentClue.answer.toLowerCase().replace(/\s/g, '');
    
    if (normalized === correctNormalized) {
      score++;
      attempted++;
      alert('✅ Correct! Well done!');
      nextClue();
    } else {
      attempted++;
      alert('❌ Not quite right. Try again or reveal the answer!');
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
    userAnswer = '';
    showAnswer = false;
    showExplanation = false;
  }

  function previousClue() {
    currentClueIndex = (currentClueIndex - 1 + filteredClues.length) % filteredClues.length;
    userAnswer = '';
    showAnswer = false;
    showExplanation = false;
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  }

  function changeDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    currentClueIndex = 0;
    userAnswer = '';
    showAnswer = false;
    showExplanation = false;
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

    <div class="input-section">
      <input 
        type="text" 
        bind:value={userAnswer}
        on:keypress={handleKeyPress}
        placeholder="Type your answer..."
        disabled={showAnswer}
      />
      <button class="check-btn" on:click={checkAnswer} disabled={showAnswer || !userAnswer}>
        Check Answer
      </button>
    </div>

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

  .input-section {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    text-transform: uppercase;
  }

  input:focus {
    outline: none;
    border-color: #667eea;
  }

  input:disabled {
    background: #e9ecef;
  }

  .check-btn {
    padding: 0.75rem 1.5rem;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }

  .check-btn:hover:not(:disabled) {
    background: #218838;
  }

  .check-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
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
