import gsap from 'gsap';
import SplitType from 'split-type';

export default function wipeAnimation(splittedText: SplitType) {
  const className = [
    'line',
    'before:contents-[\'\']',
    'relative',
    'before:absolute',
    'before:left-[var(--left)]',
    'before:right-[var(--right)]',
    'before:top-0',
    'before:block',
    'before:h-full',
    'before:w-[var(--width)]',
    'before:bg-zinc-950',
    'text-transparent',
  ];

  splittedText.lines?.forEach((line) => line.classList.add(...className));
  
  const setupAnimation: GSAPTweenVars = {
    '--width': '0%',
    '--left': 0,
    '--right': 'auto',
    width: 'fit-content',
    display: 'inline-block',
  };

  const openingAnimation: GSAPTweenVars = {
    '--width': '100%',
    ease: 'power4.out',
  };

  const coloredText: GSAPTweenVars = { color: 'black' };

  const changeWiperDirection: GSAPTweenVars = { '--right': 0, '--left': 'auto' };

  const closingAnimation: GSAPTweenVars = {
    '--width': '0%',
    stagger: { amount: 0.3 },
    ease: 'power4.out',
  };

  return gsap
    .timeline({ paused: true })
    .set(splittedText.lines, setupAnimation)
    .to(splittedText.lines, { ...openingAnimation, stagger: { amount: 0.3 } })
    .set(splittedText.lines, coloredText)
    .set(splittedText.lines, changeWiperDirection)
    .to(splittedText.lines, { ...closingAnimation, stagger: { amount: 0.3 } });
}
