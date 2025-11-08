<script>
  import { score, attempted, currentClueIndex, filteredClues } from '../stores/gameStore.js';
</script>

<div class="stats">
  <span>Score: {$score}/{$attempted}</span>
  <span>Cryptic {$currentClueIndex + 1} of {$filteredClues.length}</span>
</div>

<style>
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
</style>
