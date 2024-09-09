'use client';

import useEvent from '@/hooks/useEvent';
import useMatchMedia from '@/hooks/useMatchMedia';
import textSplitter from '@/utils/textSplitter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

export default function AboutMe() {
  const { subscribe } = useEvent('loadingAnimation@end');
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // start spliting text when loading timeline done for avoiding wrong split text size
  useEffect(() => subscribe(() => setLoading(false)), []);

  useMatchMedia(
    ({ isLarge, isDoubleExtraLarge }) => {
      gsap.registerPlugin(ScrollTrigger);

      if (!loading) {
        const text = textSplitter('p', containerRef.current!, {
          types: 'words,lines',
          lineClass: 'overflow-hidden',
        });

        let scrollerStart = '75%';
        let scrollerEnd = '-15%';

        if (isDoubleExtraLarge) {
          scrollerStart = '80%';
          scrollerEnd = '20%';
        } else if (isLarge) {
          scrollerStart = '80%';
          scrollerEnd = '-10%';
        }

        gsap.from(text.words, {
          opacity: 0,
          yPercent: -100,
          stagger: 0.05,
          scrollTrigger: {
            trigger: 'p',
            start: `top ${scrollerStart}`,
            end: `top ${scrollerEnd}`,
            scrub: true,
          },
        });
      }
    },
    { dependencies: [loading], scope: containerRef },
  );

  return (
    <section
      className="grid place-items-center px-8 py-44 md:px-20"
      ref={containerRef}
    >
      <p className="text-3xl font-medium !leading-snug md:text-5xl lg:text-6xl">
        I'm 19 years old, with almost 3 years of in-depth experience in web
        development field. While I haven't stepped into the professional world
        yet, I've honed my skills through a variety of online courses,
        collaborative projects, solo projects, and even hackathons. Whether
        collaborating on a team or venturing solo, my ethos remains rooted in
        upholding best practices and ensuring precision.
      </p>
    </section>
  );
}
