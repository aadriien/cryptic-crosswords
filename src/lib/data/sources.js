import { crypticClues as regularClues } from './clues.js';
import { crypticClues as nytimesClues } from './NYTimes-clues.js';
import { crypticClues as newyorkerClues } from './NewYorker-clues.js';
import { crypticClues as nationalpostClues } from './NationalPost-clues.js';

// Centralized source configuration
// To add a new source:
// 1. Import the clues from the data file
// 2. Add a new entry to this array with a unique id and label
export const sources = [
  {
    id: 'regular',
    label: 'Regular',
    clues: regularClues
  },
  {
    id: 'nytimes',
    label: 'NY Times',
    clues: nytimesClues
  },
  {
    id: 'newyorker',
    label: 'New Yorker',
    clues: newyorkerClues
  },
  {
    id: 'nationalpost',
    label: 'National Post',
    clues: nationalpostClues
  }
];

// Helper to get clues for a specific source
export function getCluesForSource(sourceId) {
  const source = sources.find(s => s.id === sourceId);
  return source ? source.clues : regularClues;
}
