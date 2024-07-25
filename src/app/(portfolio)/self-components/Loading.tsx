'use client';

import { useGSAP } from '@gsap/react';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import useEvent from '@/hooks/useEvent';

export default function Loading() {
  const { publish } = useEvent('timeline@loading');
  const loadingInformationRef = useRef<HTMLParagraphElement | null>(null);
  const loadingPercentageRef = useRef<HTMLSpanElement | null>(null);
  const loadingPercentage = useRef(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const [lottieRef, setLottieRef] = useState<DotLottie | null>(null);

  function updateInformation(percentage: number) {
    if (loadingInformationRef.current) {
      if (percentage >= 100) {
        loadingInformationRef.current.innerText = 'Here we go!';
      } else if (percentage >= 50) {
        loadingInformationRef.current.innerText = 'Animation orchestration...';
      }
    }
  }

  function updatePercentage(percentage: number) {
    if (loadingPercentageRef.current) {
      loadingPercentageRef.current.innerText = percentage.toString();
    }
  }

  function updateProgress() {
    const leftPercentage = 100 - loadingPercentage.current;

    if (leftPercentage <= 10) {
      loadingPercentage.current += leftPercentage;
    } else {
      loadingPercentage.current += Math.floor(Math.random() * 10) + 1;
    }

    updatePercentage(loadingPercentage.current);
    updateInformation(loadingPercentage.current);

    if (loadingPercentage.current < 100) {
      setTimeout(updateProgress, Math.floor(Math.random() * 500) + 1);
    } else {
      setLoadingDone(true);
    }
  }

  useEffect(() => {
    if (window && !loadingPercentage.current) {
      updateProgress();
    }
  }, []);

  useGSAP(() => {
    if (lottieRef && loadingDone) {
      setTimeout(() => lottieRef.play(), 800);

      lottieRef.addEventListener('complete', () => {
        setTimeout(() => {
          gsap
            .timeline()
            .to('.animated-logo', { display: 'none', duration: 0 })
            .to('.static-logo', { display: 'block', duration: 0 })
            .to('.logo-container', {
              width: '750%',
              duration: 1.5,
              ease: 'power2.inOut',
            })
            .to('.text-container', { autoAlpha: 0, duration: 1 }, '<')
            .to('.loading-container', { autoAlpha: 0, duration: 0.8 }, '>+0.5s')
            .call(publish, undefined, '<-0.5s')
            // * refer to portfolio (main page) container
            .to(
              '.root-container',
              {
                height: 'auto',
                overflow: 'visible',
                duration: 0,
              },
              '<',
            )
            .to('.loading-container', { display: 'none', duration: 0 });
        }, 200);
      });

      return () => lottieRef.removeEventListener('complete');
    }
  }, [loadingDone]);

  return (
    <div className="loading-container fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <div className="logo-container w-[40%] md:w-1/4 xl:w-1/6 2xl:w-[10%]">
        {/* animation logo */}
        <DotLottieReact
          src="/animated_logo/ma-logo.json"
          speed={0.9}
          dotLottieRefCallback={setLottieRef}
          className="animated-logo"
        />

        {/* static logo */}
        <img
          src="/animated_logo/ma-logo.svg"
          alt=""
          className="static-logo hidden w-full"
        />
      </div>

      <div className="text-container mt-6 *:text-center *:md:text-lg *:lg:text-2xl xl:mt-8 xl:text-xl 2xl:mt-12 2xl:space-y-4 *:2xl:text-4xl">
        <p ref={loadingInformationRef}>Keep focus...</p>
        <p>
          <span ref={loadingPercentageRef}>0</span>
          <span>%</span>
        </p>
      </div>
    </div>
  );
}
