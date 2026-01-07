// Generate deterministic hash from style content
// Replaces random ID generation for consistent class names
// Note: input is always an object (baseStyle) from styleItem.js
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
