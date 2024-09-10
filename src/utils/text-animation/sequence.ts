import gsap from 'gsap';
import SplitType from 'split-type';

export default function sequenceAnimation(
  splittedText: SplitType,
  settings: { from?: 'top' | 'bottom', animatedType?: 'words' | 'chars' } = { from: 'bottom', animatedType: 'chars' },
) {
  const className = ['overflow-hidden', 'h-fit', '!w-fit'];

  splittedText.lines?.forEach((line) => line.classList.add(...className));

  return gsap.timeline({ paused: true })
    .from(
      settings.animatedType === 'words' ? splittedText.words : splittedText.chars,
      {
        yPercent: settings.from === 'top' ? -110 : 110,
        stagger: { amount: 0.3 },
      }
    );
}
