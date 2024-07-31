import gsap from 'gsap';
import SplitType from 'split-type';

export const lineWipeAnimationStyling = "line before:contents-[''] relative before:absolute before:left-[var(--left)] before:right-[var(--right)] before:top-0 before:block before:h-full before:w-[var(--width)] before:bg-zinc-950 text-transparent";

export function wipeAnimation(splittedText: SplitType | SplitType['lines']) {
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

  if (splittedText instanceof SplitType) {
    gsap.set(splittedText.lines, { color: 'transparent' });

    return gsap
      .timeline({ paused: true })
      .set(splittedText.lines, setupAnimation)
      .to(splittedText.lines, { ...openingAnimation, stagger: { amount: 0.3 } })
      .set(splittedText.lines, coloredText)
      .set(splittedText.lines, changeWiperDirection)
      .to(splittedText.lines, { ...closingAnimation, stagger: { amount: 0.3 } });
  } else {
    gsap.set(splittedText, { color: 'transparent' });

    return gsap
      .timeline({ paused: true })
      .set(splittedText, setupAnimation)
      .to(splittedText, { ...openingAnimation, stagger: { amount: 0.3 } })
      .set(splittedText, coloredText)
      .set(splittedText, changeWiperDirection)
      .to(splittedText, { ...closingAnimation, stagger: { amount: 0.3 } });
  }
}
