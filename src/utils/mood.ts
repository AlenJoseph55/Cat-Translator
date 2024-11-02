export type CatMood = 'happy' | 'curious' | 'sassy' | 'sleepy' | 'excited';

export const getRandomMood = (): CatMood => {
  const moods: CatMood[] = ['happy', 'curious', 'sassy', 'sleepy', 'excited'];
  return moods[Math.floor(Math.random() * moods.length)];
};