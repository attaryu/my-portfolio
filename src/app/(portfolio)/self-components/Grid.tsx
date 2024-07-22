'use client';

import useEvent from '@/hooks/useEvent';
import useMatchMedia from '@/hooks/useMatchMedia';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { memo, useEffect, useState } from 'react';

gsap.registerPlugin(useGSAP);

export default function Grid() {
  // subsribe to loading timeline when done
  const { subscribe } = useEvent('timeline@loading');
  const [play, setPlay] = useState(false);
  const [totalBox, setTotalBox] = useState(0);
  const random = () => Math.floor(Math.random() * (totalBox * 0.6));
  const [boxIndex, setBoxIndex] = useState(random());

  useEffect(() => {
    if (screen) {
      setTotalBox(Math.round(screen.height * 1.5));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(() => setPlay(true));

    return unsubscribe(() => setPlay(false));
  }, []);

  useMatchMedia(
    ({ isSmall }) => {
      if (totalBox && play) {
        gsap.to('.grid-box', {
          borderColor: 'white',
          stagger: {
            from: boxIndex,
            grid: 'auto',
            amount: isSmall ? 2.5 : 1.5,
            yoyo: true,
            repeat: 1,
            repeatDelay: 1.5,
          },
          onComplete: () => {
            setTimeout(() => setBoxIndex(random()), 1500);
          },
        });
      }
    },
    {
      dependencies: [boxIndex, play],
      revert: true,
    },
  );

  return (
    <div className="after:contents-[''] sticky top-0 grid h-[120svh] max-h-highest w-full grid-cols-[repeat(auto-fit,_minmax(2rem,_1fr))] overflow-hidden after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-1/5 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent">
      {!!totalBox &&
        Array(totalBox)
          .fill(1)
          .map((box, i) => <Box key={box + i} />)}
    </div>
  );
}

const Box = memo(() => (
  <div className="grid-box w-full border border-b-zinc-50 border-l-zinc-50 pt-[100%]" />
));
