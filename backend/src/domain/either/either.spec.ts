import { Left } from './Left';
import { Right } from './Right';

describe('Either', () => {
  describe('Left', () => {
    it('should create a Left instance', () => {
      const left = new Left<string, number>('Error');
      expect(left.isLeft()).toBe(true);
      expect(left.isRight()).toBe(false);
      expect(left.value).toBe('Error');
    });
  });

  describe('Right', () => {
    it('should create a Right instance', () => {
      const right = new Right<string, number>(42);
      expect(right.isLeft()).toBe(false);
      expect(right.isRight()).toBe(true);
      expect(right.value).toBe(42);
    });
  });
});
