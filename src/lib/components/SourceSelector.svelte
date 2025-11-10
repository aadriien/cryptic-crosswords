<script>
  import { selectedSource } from '../stores/gameStore.js';
  import { changeSource } from '../utils/gameActions.js';
  import { sources } from '../data/sources.js';
</script>

<div class="source-selector">
  {#each sources as { id, label }}
    <button
      class:active={$selectedSource === id}
      on:click={() => changeSource(id)}
    >
      {label}
    </button>
  {/each}
</div>

<style>
  .source-selector {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    justify-content: center;
  }

  .source-selector button {
    padding: 0.6rem 1.25rem;
    border: 2px solid #dee2e6;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.95rem;
    transition: all 0.2s;
  }

  .source-selector button:hover {
    border-color: #764ba2;
    color: #764ba2;
  }

  .source-selector button.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
</style>
