<script>
  import { currentClue, hintLevel } from '../stores/gameStore.js';
</script>

{#if $hintLevel > 0 && $currentClue.hints}
  <div class="hint-display">
    {#if $hintLevel >= 1}
      <div class="hint-item definition">
        <span class="hint-label">Definition:</span>
        <span class="hint-value">{$currentClue.hints.definition}</span>
      </div>
    {/if}
    {#if $hintLevel >= 2}
      <div class="hint-item indicator">
        <span class="hint-label">Indicator:</span>
        <span class="hint-value">{$currentClue.hints.indicator}</span>
      </div>
    {/if}
    {#if $hintLevel >= 3}
      <div class="hint-item fodder">
        <span class="hint-label">Fodder:</span>
        <span class="hint-value">{$currentClue.hints.fodder}</span>
      </div>
    {/if}
  </div>
{/if}

<style>
  .hint-display {
    background: #e7f3ff;
    border-left: 4px solid #2196F3;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
    animation: slideIn 0.3s ease-out;
  }

  .hint-item {
    margin: 0.5rem 0;
    font-size: 0.95rem;
  }

  .hint-label {
    font-weight: 700;
    color: #1976D2;
    margin-right: 0.5rem;
  }

  .hint-value {
    color: #424242;
  }

  .hint-item.definition .hint-label {
    color: #2e7d32;
  }

  .hint-item.indicator .hint-label {
    color: #f57c00;
  }

  .hint-item.fodder .hint-label {
    color: #7b1fa2;
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
</style>
