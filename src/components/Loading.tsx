'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLottie } from 'lottie-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import useEvent from '@/hooks/useEvent';

import OutLogo from '../../public/logo/ma-logo-reverse.json';
import InLogo from '../../public/logo/ma-logo.json';

gsap.registerPlugin(useGSAP);

export default function Loading() {
  const pathname = usePathname();
  const loadingOut = useEvent('loading@out');
  const loadingAnimationEnd = useEvent('loadingAnimation@end');
  const [loading, setLoading] = useState<'in' | 'out'>('in');
  const isLoading = useRef(false);

  const InLogoAnimation = useLottie({
    animationData: InLogo,
    onComplete: () => inAnimation(),
    className: 'in-animated-logo',
    loop: false,
    autoplay: false,
  });

  const OutLogoAnimation = useLottie({
    animationData: OutLogo,
    className: 'out-animated-logo hidden',
    onComplete: () => {
      switchLoadingProgress(false);
      loadingAnimationEnd.publish();
    },
    loop: false,
    autoplay: false,
  });

  useEffect(() => setLoading('in'), [pathname]);
  useEffect(() => loadingOut.subscribe(() => setLoading('out')), []);

  const switchLoadingProgress = (value: boolean) => {
    isLoading.current = value;
  };

  const { contextSafe } = useGSAP(() => {
    if (!isLoading.current) {
      if (loading === 'in') {
        switchLoadingProgress(true);

        setTimeout(() => {
          gsap.set('.out-animated-logo', { display: 'none' });
          gsap.set('.in-animated-logo', { display: 'block' });

          InLogoAnimation.goToAndPlay(0, true);
        }, 1000);
      } else {
        switchLoadingProgress(true);
        outAnimation();
      }
    }
  }, [loading]);

  const inAnimation = contextSafe(() => {
    gsap
      .timeline()
      .set('.in-animated-logo', { display: 'none' })
      .set('.static-logo', { display: 'block' }, '<')
      .to('.logo-container', {
        width: '720%',
        duration: 1,
        ease: 'power2.inOut',
      })
      .to('.loading-container', { autoAlpha: 0, duration: 0.8 }, '>-0.1s')
      .set('.root-container', { height: 'auto', overflow: 'visible' }, '<-0.5s')
      .call(switchLoadingProgress, [false], '<')
      .call(loadingAnimationEnd.publish, undefined, '<');
  });

  const outAnimation = contextSafe(() => {
    gsap
      .timeline()
      .fromTo(
        '.loading-container',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 },
      )
      .fromTo(
        '.logo-container',
        { width: '720%' },
        {
          width: '25%',
          duration: 1,
          ease: 'power2.inOut',
        },
      )
      .set('.root-container', { height: '100vh', overflow: 'hidden' })
      .set('.static-logo', { display: 'none' }, '<')
      .set('.in-animated-logo', { display: 'none' }, '<')
      .set('.out-animated-logo', { display: 'block' }, '<')
      .call(OutLogoAnimation.goToAndPlay, [0, true], '<');
  });

  return (
    <div className="loading-container fixed left-0 top-0 z-30 flex h-screen w-screen flex-col items-center justify-center bg-zinc-950">
      <div className="logo-container aspect-[2/1] w-[25%] *:aspect-[2/1] xl:pr-9">
        {InLogoAnimation.View}
        {OutLogoAnimation.View}

        <img
          src="/logo/ma-logo.svg"
          alt=""
          className="static-logo hidden w-full"
        />
      </div>
    </div>
  );
}
