/**
 * @fileoverview Generates deterministic hash-based IDs for CSS class names.
 * Ensures consistent class names across server and client for SSR.
 * @module makeid
 */

/**
 * Generates a deterministic hash from style content for consistent class names.
 * Uses a simple hash algorithm to convert style objects to unique identifiers.
 * This ensures the same styles always produce the same class name,
 * which is critical for SSR hydration.
 * 
 * @param {Object} input - Style object to hash (always an object from styleItem.js)
 * @param {number} [size=10] - Desired length of the hash string
 * @returns {string} Base36 hash string of the specified size
 * @example
 * makeHash({ color: 'red', padding: 10 }) // Returns: '000abc1234'
 * makeHash({ color: 'red', padding: 10 }, 5) // Returns: '1234a'
 */
export default function makeHash(input, size = 10) {
  // Convert object to string - input is always an object from caller
  const str = JSON.stringify(input);

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert to base36 and pad/truncate to desired size
  const result = Math.abs(hash).toString(36);
  return result.padStart(size, '0').slice(0, size);
}
