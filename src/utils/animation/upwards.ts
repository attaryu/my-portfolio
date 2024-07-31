import gsap from 'gsap';
import SplitType from 'split-type';

export const charsUpwardsAnimationStyling = 'overflow-hidden';

export function upwardsAnimation(splittedText: SplitType) {
  gsap.set(splittedText.chars, { yPercent: 110 });

  return gsap.timeline({ paused: true }).to(splittedText.chars, {
    yPercent: 0,
    stagger: { amount: 0.3 },
  });
}