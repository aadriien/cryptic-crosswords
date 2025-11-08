<script>
  import { userAnswer, revealedLetters, answerLength, showAnswer } from '../stores/gameStore.js';
  import { handleInput, handleBackspace, checkAnswer } from '../utils/gameActions.js';

  function onInput(index, event) {
    const value = event.target.value.toUpperCase();
    const action = handleInput(index, value);
    
    if (action === 'move-next' && index < $answerLength - 1) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) nextInput.focus();
    }
  }

  function onKeyDown(index, event) {
    if (event.key === 'Backspace' && $userAnswer[index] === '') {
      const action = handleBackspace(index);
      if (action === 'move-prev' && index > 0) {
        const prevInput = event.target.previousElementSibling;
        if (prevInput) prevInput.focus();
      }
    } else if (event.key === 'Enter') {
      checkAnswer();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.target.previousElementSibling?.focus();
    } else if (event.key === 'ArrowRight' && index < $answerLength - 1) {
      event.target.nextElementSibling?.focus();
    }
  }
</script>

<div class="letter-boxes">
  {#each Array($answerLength) as _, i}
    <input
      type="text"
      class="letter-box"
      class:revealed={$revealedLetters[i]}
      maxlength="1"
      bind:value={$userAnswer[i]}
      on:input={(e) => onInput(i, e)}
      on:keydown={(e) => onKeyDown(i, e)}
      disabled={$showAnswer || $revealedLetters[i]}
    />
  {/each}
</div>

<style>
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
</style>
