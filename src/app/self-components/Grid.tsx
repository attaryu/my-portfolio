'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { memo, useEffect, useState } from 'react';

import useMatchMedia from '@/hooks/useMatchMedia';

gsap.registerPlugin(useGSAP);

function Grid() {
  const [totalBox, setTotalBox] = useState(0);
  const random = () => Math.floor(Math.random() * (totalBox * 0.6));
  const [boxIndex, setBoxIndex] = useState(random());

  useEffect(() => {
    if (screen) {
      setTotalBox(Math.round(screen.height * 1.5));
    }
  }, []);

  useMatchMedia(
    ({ isSmall }) => {
      if (totalBox) {
        gsap.to('.grid-box', {
          backgroundColor: 'white',
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
    [boxIndex, totalBox],
  );

  return (
    <div className="after:contents-[''] sticky left-0 top-0 grid h-[120svh] max-h-highest w-full grid-cols-[repeat(auto-fit,_minmax(2rem,_1fr))] overflow-hidden after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-1/5 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent">
      {!!totalBox && Array(totalBox)
        .fill(1)
        .map((box, i) => (
          <div
            key={box + i}
            className="grid-box w-full border border-b-zinc-50 border-l-zinc-50 pt-[100%]"
          />
        ))}
    </div>
  );
}

export default memo(Grid);
