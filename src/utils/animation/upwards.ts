import gsap from 'gsap';
import SplitType from 'split-type';

export const lineUpwardsAnimationStyling = 'overflow-hidden h-fit';

export function upwardsAnimation(splittedText: SplitType) {
  gsap.set(splittedText.chars, { yPercent: 110 });

  return gsap.timeline({ paused: true }).to(splittedText.chars, {
    yPercent: 0,
    stagger: { amount: 0.3 },
  });
}