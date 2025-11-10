<script>
  import { solvedClues, showInventory } from '../stores/gameStore.js';

  function toggleInventory() {
    showInventory.update(val => !val);
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function deleteClue(index) {
    solvedClues.update(clues => {
      return clues.filter((_, i) => i !== index);
    });
  }

  function clearAll() {
    if (confirm('Are you sure you want to clear all solved clues? This will allow you to solve them again.')) {
      solvedClues.set([]);
    }
  }
</script>

<div class="inventory-container">
  <button class="inventory-toggle" on:click={toggleInventory}>
    📋 Solved Clues ({$solvedClues.length})
  </button>

  {#if $showInventory}
    <div class="inventory-panel">
      <div class="inventory-header">
        <h3>🎉 Solved Clues</h3>
        <button class="close-btn" on:click={toggleInventory}>✕</button>
      </div>
      
{#if $solvedClues.length === 0}
        <div class="empty-state">
          <p>No clues solved yet!</p>
          <p class="hint">Start solving to see your progress here.</p>
        </div>
      {:else}
        <div class="solved-list">
          {#each $solvedClues as clue, index}
            <div class="solved-item">
              <div class="solved-header">
                <span class="solved-number">#{$solvedClues.length - index}</span>
                <span class="solved-difficulty {clue.difficulty}">{clue.difficulty}</span>
                <span class="solved-time">{formatDate(clue.solvedAt)}</span>
                <button class="delete-btn" on:click={() => deleteClue(index)} title="Remove and solve again">
                  ✕
                </button>
              </div>
              <div class="solved-clue">"{clue.clue}"</div>
              <div class="solved-answer">
                <strong>Answer:</strong> {clue.answer}
              </div>
              <div class="solved-type">{clue.type}</div>
            </div>
          {/each}
        </div>
        <div class="inventory-footer">
          <button class="clear-all-btn" on:click={clearAll}>
            🗑️ Clear All
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .inventory-container {
    position: relative;
    margin-bottom: 1rem;
  }

  .inventory-toggle {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  .inventory-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .inventory-panel {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    background: white;
    border: 2px solid #667eea;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-height: 500px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .inventory-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px 10px 0 0;
  }

  .inventory-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .empty-state {
    padding: 3rem 2rem;
    text-align: center;
    color: #6c757d;
  }

  .empty-state p {
    margin: 0.5rem 0;
  }

  .empty-state .hint {
    font-size: 0.9rem;
    color: #adb5bd;
  }

  .solved-list {
    overflow-y: auto;
    max-height: 400px;
    padding: 1rem;
  }

  .solved-item {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-left: 4px solid #667eea;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .solved-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .solved-header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
  }

  .solved-number {
    font-weight: 700;
    color: #667eea;
  }

  .solved-difficulty {
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  .solved-difficulty.easy {
    background: #d4edda;
    color: #155724;
  }

  .solved-difficulty.medium {
    background: #fff3cd;
    color: #856404;
  }

  .solved-difficulty.hard {
    background: #f8d7da;
    color: #721c24;
  }

  .solved-time {
    color: #6c757d;
    font-size: 0.8rem;
  }

  .delete-btn {
    margin-left: auto;
    background: white;
    border: 1px solid #dc3545;
    color: #dc3545;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    padding: 0;
  }

  .delete-btn:hover {
    background: #dc3545;
    color: white;
  }

  .solved-clue {
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .solved-answer {
    color: #28a745;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  .solved-type {
    font-size: 0.8rem;
    color: #6c757d;
    font-style: italic;
  }

  /* Scrollbar styling */
  .solved-list::-webkit-scrollbar {
    width: 8px;
  }

  .solved-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .solved-list::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 4px;
  }

  .solved-list::-webkit-scrollbar-thumb:hover {
    background: #5568d3;
  }

  .inventory-footer {
    padding: 0.75rem 1rem;
    border-top: 1px solid #dee2e6;
    background: white;
  }

  .clear-all-btn {
    width: 100%;
    padding: 0.6rem;
    background: white;
    border: 2px solid #dc3545;
    color: #dc3545;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .clear-all-btn:hover {
    background: #dc3545;
    color: white;
  }
</style>
