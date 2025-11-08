<script>
  import { feedbackMessage, feedbackType } from '../stores/gameStore.js';
</script>

{#if $feedbackMessage}
  <div class="feedback {$feedbackType}">
    {$feedbackMessage}
  </div>
{/if}

<style>
  .feedback {
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
    animation: slideIn 0.3s ease-out;
  }

  .feedback.correct {
    background: #d4edda;
    color: #155724;
    border: 2px solid #28a745;
  }

  .feedback.incorrect {
    background: #f8d7da;
    color: #721c24;
    border: 2px solid #dc3545;
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
