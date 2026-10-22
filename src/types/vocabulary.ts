import { TenseId } from './tense';

export interface FlashcardProgress {
  id: string;
  isBookmarked: boolean;
  isMemorized: boolean;
  lastReviewedDate?: string;
  reviewCount: number;
}
