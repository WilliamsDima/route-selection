export const LOTTIE_ANIMATIONS = {
  loader: 'loder.json',
  notFound: '404.json',
  paws: 'paws.json',
} as const;

export type LottieAnimation = keyof typeof LOTTIE_ANIMATIONS;
