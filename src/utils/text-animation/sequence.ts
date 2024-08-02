import gsap from 'gsap';
import SplitType from 'split-type';

export default function sequenceAnimation(splittedText: SplitType, from: 'top' | 'bottom' = 'bottom') {
  const className = ['overflow-hidden', 'h-fit']

  splittedText.lines?.forEach((line) => line.classList.add(...className));

  return gsap
    .timeline({ paused: true })
    .from(splittedText.chars, {
      yPercent: from === 'top' ? -110 : 110,
      stagger: { amount: 0.3 },
    });
}