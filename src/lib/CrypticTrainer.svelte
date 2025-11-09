<script>
  import { answerLength } from './stores/gameStore.js';
  import { resetAnswerState } from './utils/gameActions.js';
  import StatsDisplay from './components/StatsDisplay.svelte';
  import DifficultySelector from './components/DifficultySelector.svelte';
  import ClueCard from './components/ClueCard.svelte';
  import Navigation from './components/Navigation.svelte';
  import SolvedCluesInventory from './components/SolvedCluesInventory.svelte';
  
  // Initialize answer state when component mounts or when answer length changes
  $: if ($answerLength > 0) {
    resetAnswerState();
  }
</script>

<div class="trainer">
  <StatsDisplay />
  <DifficultySelector />
  <SolvedCluesInventory />
  <ClueCard />
  <Navigation />
</div>

<style>
  .trainer {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
</style>
