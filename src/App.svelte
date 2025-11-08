<script>
  import CrypticTrainer from './lib/CrypticTrainer.svelte'
</script>

<main>
  <h1>🧩 Cryptic Crossword Trainer</h1>
  <p class="subtitle">Learn and practice cryptic crossword clues</p>
  <CrypticTrainer />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  main {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: white;
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
</style>
