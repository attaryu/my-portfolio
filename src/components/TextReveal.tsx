'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MutableRefObject, useRef } from 'react';
import SplitType, { TargetElement } from 'split-type';

interface Props {
  children: React.ReactNode;
  className?: string;
  type: 'slider' | 'upwards';
  timelineRef?:
    | MutableRefObject<GSAPTimeline | undefined>
    | ((timeline: GSAPTimeline) => void);
}

gsap.registerPlugin(useGSAP);

export default function TextReveal({
  children,
  className = '',
  type,
  timelineRef,
}: Readonly<Props>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const timeline = gsap.timeline({ paused: true });

      if (type === 'slider') {
        const splittedText = new SplitType(
          containerRef.current.firstChild as TargetElement,
          {
            tagName: 'span',
            lineClass:
              "line before:contents-[''] relative before:absolute before:left-[var(--left)] before:right-[var(--right)] before:top-0 before:block before:h-full before:w-[var(--width)] before:bg-zinc-950 text-transparent",
          },
        );

        gsap.set(splittedText.chars, { color: 'transparent' });

        timeline
          .set(splittedText.lines, {
            '--width': '0%',
            '--left': 0,
            '--right': 'auto',
            width: 'fit-content',
            display: 'inline-block',
          })
          .to(splittedText.lines, {
            '--width': '100%',
            stagger: { amount: 0.3 },
            ease: 'power4.out',
          })
          .set(splittedText.chars, { color: 'black' })
          .set(splittedText.lines, { '--right': 0, '--left': 'auto' })
          .to(splittedText.lines, {
            '--width': '0%',
            stagger: { amount: 0.3 },
            ease: 'power4.out',
          });
      } else {
        const splittedText = new SplitType(
          containerRef.current.firstChild as TargetElement,
          {
            tagName: 'span',
            lineClass: 'overflow-hidden',
          },
        );

        gsap.set(splittedText.chars, { yPercent: 110 });

        timeline.to(splittedText.chars, {
          yPercent: 0,
          stagger: { amount: 0.3 },
        });
      }

      if (typeof timelineRef === 'object') {
        timelineRef.current = timeline;
      } else if (typeof timelineRef === 'function') {
        timelineRef(timeline);
      }
    }
  }, []);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}
