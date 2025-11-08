<script>
  import { currentClue, showAnswer, showExplanation, hintLevel } from '../stores/gameStore.js';
  import { checkAnswer, revealHint, revealAnswer, toggleExplanation, showNextHint } from '../utils/gameActions.js';
  import AnswerInput from './AnswerInput.svelte';
  import HintDisplay from './HintDisplay.svelte';
  import FeedbackDisplay from './FeedbackDisplay.svelte';
</script>

<div class="clue-card">
  <div class="clue-header">
    <span class="difficulty-badge {$currentClue.difficulty}">
      {$currentClue.difficulty}
    </span>
    <span class="clue-type">{$currentClue.type}</span>
  </div>
  
  <div class="clue-text">
    "{$currentClue.clue}"
  </div>
  
  <HintDisplay />
  
  <div class="letter-count">
    ({$currentClue.length})
  </div>

  <AnswerInput />

  <div class="action-row">
    <button class="check-btn" on:click={checkAnswer} disabled={$showAnswer}>
      Check Answer
    </button>
    <button class="hint-btn" on:click={revealHint} disabled={$showAnswer}>
      💡 Reveal Letter
    </button>
  </div>

  <FeedbackDisplay />

  {#if $showAnswer}
    <div class="answer-reveal">
      <strong>Answer:</strong> {$currentClue.answer}
    </div>
  {/if}

  <div class="action-buttons">
    <button on:click={showNextHint} disabled={$showAnswer || $hintLevel >= 3}>
      💡 {$hintLevel === 0 ? 'Show Hint' : $hintLevel === 1 ? 'More Hints' : $hintLevel === 2 ? 'More Hints' : 'All Hints Shown'}
    </button>
    <button on:click={revealAnswer} disabled={$showAnswer}>
      Reveal Answer
    </button>
    <button on:click={toggleExplanation} class="explain-btn">
      {$showExplanation ? 'Hide' : 'Show'} Explanation
    </button>
  </div>

  {#if $showExplanation}
    <div class="explanation">
      <h3>How it works:</h3>
      <p><strong>Definition:</strong> {$currentClue.explanation.definition}</p>
      <p><strong>Wordplay:</strong> {$currentClue.explanation.wordplay}</p>
      <p><strong>Breakdown:</strong> {$currentClue.explanation.breakdown}</p>
      {#if $currentClue.explanation.tip}
        <p class="tip"><strong>💡 Tip:</strong> {$currentClue.explanation.tip}</p>
      {/if}
    </div>
  {/if}
</div>

<style>
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
</style>
