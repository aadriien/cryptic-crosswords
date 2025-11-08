<script>
  import { previousClue, nextClue } from '../utils/gameActions.js';
</script>

<div class="navigation">
  <button on:click={previousClue}>← Previous</button>
  <button on:click={nextClue}>Next →</button>
</div>

<style>
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
