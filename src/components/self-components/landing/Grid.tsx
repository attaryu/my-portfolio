'use client';

import gsap from 'gsap';
import { memo, useEffect, useRef } from 'react';

import useEvent from '@/hooks/useEvent';
import useMatchMedia from '@/hooks/useMatchMedia';

export default function Grid() {
  // subsribe to loading timeline when done
  const { subscribe } = useEvent('timeline@loading');
  const totalBoxRef = useRef(0);

  useEffect(() => {
    if (screen) {
      totalBoxRef.current = Math.round(screen.height * 1.5);
    }
  }, []);

  useMatchMedia(({ isSmall }) => subscribe(() => playAnimation(isSmall)), {
    dependencies: [],
    revert: true,
  });

  function playAnimation(isSmall: boolean) {
    gsap.to('.grid-box', {
      borderColor: 'white',
      stagger: {
        from: Math.floor(Math.random() * (totalBoxRef.current * 0.6)),
        grid: 'auto',
        amount: isSmall ? 2.5 : 1.5,
        yoyo: true,
        repeat: 1,
        repeatDelay: 1.5,
      },
      onComplete: () => {
        setTimeout(() => playAnimation(isSmall), 1500);
      },
    });
  }

  return (
    <div className="after:contents-[''] sticky top-0 grid h-[120svh] max-h-highest w-full grid-cols-[repeat(auto-fit,_minmax(2rem,_1fr))] overflow-hidden after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-1/5 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent">
      {!!totalBoxRef.current &&
        Array(totalBoxRef.current)
          .fill(1)
          .map((box, i) => <Box key={box + i} />)}
    </div>
  );
}

const Box = memo(() => (
  <div className="grid-box w-full border border-b-zinc-200 border-l-zinc-200 pt-[100%]" />
));
