import { describe, it, expect } from '@jest/globals';

describe('Environment', () => {
  it('should be test environment', () => {
    expect(process.env.NODE_ENV === 'test').toBe(true);
  });
});
