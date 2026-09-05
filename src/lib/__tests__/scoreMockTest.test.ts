import { describe, it, expect } from 'vitest';
import { scoreMockTest } from '../scoreMockTest';

describe('scoreMockTest', () => {
  it('scores all correct answers with no penalty', () => {
    const result = scoreMockTest(
      [
        { topicId: 'quant', correctIndex: 1, pickedIndex: 1 },
        { topicId: 'quant', correctIndex: 0, pickedIndex: 0 },
      ],
      0.5
    );
    expect(result.score).toBe(2);
  });

  it('applies negative marking for wrong answers', () => {
    const result = scoreMockTest(
      [{ topicId: 'quant', correctIndex: 1, pickedIndex: 0 }],
      0.5
    );
    expect(result.score).toBe(-0.5);
  });

  it('does not penalize skipped questions', () => {
    const result = scoreMockTest(
      [{ topicId: 'quant', correctIndex: 1, pickedIndex: undefined }],
      0.5
    );
    expect(result.score).toBe(0);
    expect(result.breakdown[0].skipped).toBe(1);
  });

  it('groups results by topic', () => {
    const result = scoreMockTest(
      [
        { topicId: 'quant', correctIndex: 1, pickedIndex: 1 },
        { topicId: 'english', correctIndex: 0, pickedIndex: 1 },
      ],
      0.5
    );
    expect(result.breakdown).toHaveLength(2);
  });
});
