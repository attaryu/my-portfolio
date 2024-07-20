'use client';

import { useGSAP } from '@gsap/react';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import useEvent from '@/hooks/useEvent';
import MainPage from './MainPage';

gsap.registerPlugin(useGSAP);

export default function Page() {
  const { publish } = useEvent('timeline@loading');
  const [loadingTitle, setLoadingTitle] = useState('Keep focus...');
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [lottieRef, setLottieRef] = useState<DotLottie | null>(null);

  function updateLoading() {
    setLoadingPercentage((lastPercentage) => {
      const leftPercentage = 100 - lastPercentage;

      if (leftPercentage <= 10) {
        return lastPercentage + leftPercentage;
      } else {
        return lastPercentage + Math.floor(Math.random() * 10) + 1;
      }
    });
  }

  useEffect(() => {
    if (window) {
      // ? check loading percentage to prevent double triggering
      if (loadingPercentage) {
        setTimeout(
          () => {
            if (loadingPercentage <= 100) {
              updateLoading();
            }
          },
          Math.floor(Math.random() * 600) + 1,
        );
      } else {
        updateLoading();
      }
    }

    if (loadingPercentage >= 50 && loadingPercentage !== 100) {
      setLoadingTitle('Pretend to loading....');
    }
  }, [loadingPercentage]);

  useGSAP(() => {
    if (loadingPercentage === 100 && lottieRef) {
      setLoadingTitle("Let's go!");
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
            .add(() => {
              publish();
            }, '<')
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
    }

    return () => lottieRef?.removeEventListener('complete');
  }, [loadingPercentage]);

  return (
    <div className="root-container relative mx-auto h-svh max-w-widhest overflow-hidden">
      {/* loading layer */}
      <div className="loading-container fixed left-0 top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-zinc-950 text-white">
        <div className="logo-container w-[40%] md:w-1/4 xl:w-1/6 2xl:w-[10%]">
          {/* animation logo */}
          <DotLottieReact
            src="/animated_logo/ma-logo.json"
            speed={0.9}
            dotLottieRefCallback={(e) => setLottieRef(e)}
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
          <p>{loadingTitle}</p>
          <p>
            <span>{loadingPercentage}</span>
            <span>%</span>
          </p>
        </div>
      </div>

      <Navbar />
      <MainPage />
      <Footer />
    </div>
  );
}
