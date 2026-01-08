import { describe, it, expect } from 'vitest';
import { calculateItemPosition } from './utils';

describe('calculateItemPosition', () => {
  it('should calculate center column, middle shelf position', () => {
    const result = calculateItemPosition({ x: 1, y: 2 });
    expect(result).toEqual([0, 1.475, 0]);
  });

  it('should calculate left column, bottom shelf position', () => {
    const result = calculateItemPosition({ x: 0, y: 1 });
    expect(result).toEqual([-0.65, 0.975, 0]);
  });

  it('should calculate right column, top shelf position', () => {
    const result = calculateItemPosition({ x: 2, y: 3 });
    expect(result).toEqual([0.65, 1.975, 0]);
  });

  it('should handle shelf 0 (rarely used)', () => {
    const result = calculateItemPosition({ x: 1, y: 0 });
    expect(result).toEqual([0, 0.475, 0]);
  });

  it('should default to shelf 1 height for invalid shelf number', () => {
    const result = calculateItemPosition({ x: 1, y: 99 });
    expect(result[1]).toBe(0.975); // Default shelf height
  });

  it('should always return z coordinate as 0', () => {
    const result = calculateItemPosition({ x: 0, y: 1 });
    expect(result[2]).toBe(0);
  });

  it('should handle all column positions (0, 1, 2)', () => {
    const left = calculateItemPosition({ x: 0, y: 1 });
    const center = calculateItemPosition({ x: 1, y: 1 });
    const right = calculateItemPosition({ x: 2, y: 1 });

    expect(left[0]).toBe(-0.65);
    expect(center[0]).toBe(0);
    expect(right[0]).toBe(0.65);
  });

  it('should handle all shelf positions (0, 1, 2, 3)', () => {
    const shelf0 = calculateItemPosition({ x: 1, y: 0 });
    const shelf1 = calculateItemPosition({ x: 1, y: 1 });
    const shelf2 = calculateItemPosition({ x: 1, y: 2 });
    const shelf3 = calculateItemPosition({ x: 1, y: 3 });

    expect(shelf0[1]).toBe(0.475);
    expect(shelf1[1]).toBe(0.975);
    expect(shelf2[1]).toBe(1.475);
    expect(shelf3[1]).toBe(1.975);
  });
});
