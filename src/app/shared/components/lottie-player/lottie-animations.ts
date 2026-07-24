export const LOTTIE_ANIMATIONS = {
  loader: 'loader.json',
  notFound: '404.json',
  paws: 'paws.json',
  congratulations: 'congratulations.json',
  cats: 'cats.json',
  pawsBg: 'paws-bg.json',
} as const;

export type LottieAnimation = keyof typeof LOTTIE_ANIMATIONS;
