<script>
  import { selectedDifficulty } from '../stores/gameStore.js';
  import { changeDifficulty } from '../utils/gameActions.js';

  const difficulties = [
    { value: 'all', label: 'All' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];
</script>

<div class="difficulty-selector">
  {#each difficulties as { value, label }}
    <button
      class:active={$selectedDifficulty === value}
      on:click={() => changeDifficulty(value)}
    >
      {label}
    </button>
  {/each}
</div>

<style>
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
</style>
