'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

import useMatchMedia from '@/hooks/useMatchMedia';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const navigationRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isAnimateDone, setIsAnimateDone] = useState(true);
  const [splitedText, setSplitedText] = useState<SplitType | null>(null);
  const links = [
    {
      id: 1,
      link: '/',
      title: 'Home',
    },
    {
      id: 2,
      link: '/projects',
      title: 'Projects',
    },
    {
      id: 3,
      link: '/#',
      title: 'Products',
    },
    {
      id: 4,
      link: '/#',
      title: 'Labolatory',
    },
  ];

  function setMenu() {
    setOpen((lastState) => !lastState);
  }

  useEffect(() => {
    if (window) {
      setSplitedText(new SplitType('.menu-link'));
    }
  }, []);

  useMatchMedia(
    ({ isExtraLarge }) => {
      if (splitedText) {
        const menuStateBefore: GSAPTweenVars = {
          bottom: '-100%',
          borderTopLeftRadius: isExtraLarge ? '1000px' : '500px',
          borderTopRightRadius: isExtraLarge ? '1000px' : '500px',
          duration: 0.6,
          ease: 'power4.in',
        };

        const splitTextStateBefore: GSAPTweenVars = {
          yPercent: 100,
          ease: 'power4.in',
          stagger: {
            amount: 0.3,
          },
        };

        const closeIconState: GSAPTweenVars = {
          ease: 'power4.out',
          stagger: {
            amount: 0.1,
          },
        };

        const timeline = gsap.timeline().call(() => setIsAnimateDone(false));

        if (open) {
          timeline
            // menu background animation
            .fromTo('.menu', menuStateBefore, {
              ...menuStateBefore,
              bottom: '0%',
              borderTopLeftRadius: isExtraLarge ? '0px' : '40px',
              borderTopRightRadius: isExtraLarge ? '0px' : '40px',
              ease: 'power4.out',
            })
            // text link animation
            .fromTo(
              splitedText.chars,
              splitTextStateBefore,
              {
                ...splitTextStateBefore,
                ease: 'power4.out',
                yPercent: 0,
              },
              '<50%',
            )
            // close icon animation
            .to('.close-icon', { ...closeIconState, width: '100%' }, '<45%');
        } else {
          timeline
            // close icon animation
            .to('.close-icon', { ...closeIconState, width: '0%' })
            // text link animation
            .to(splitedText.chars, splitTextStateBefore, '<')
            // menu background animation
            .to('.menu', menuStateBefore, '<50%');
        }

        timeline.call(() => setIsAnimateDone(true));
      }
    },
    [open],
  );

  // change navbar background on scroll
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrolledNavbarStyle = [
      'backdrop-blur-sm',
      'bg-white',
      'bg-opacity-80',
      '!border-b-zinc-900',
    ];

    ScrollTrigger.create({
      trigger: navigationRef.current,
      start: 'center top',
      end: 'bottom 10%',
      onEnter: () =>
        scrolledNavbarStyle.forEach((style) =>
          navigationRef.current!.classList.add(style),
        ),
      onLeaveBack: () =>
        scrolledNavbarStyle.forEach((style) =>
          navigationRef.current!.classList.remove(style),
        ),
    });
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 z-20 flex h-fit w-full max-w-widhest items-center justify-between border border-transparent px-8 py-1 transition-all duration-300 md:px-20 md:text-xl lg:text-2xl xl:py-0 xl:text-xl"
        ref={navigationRef}
      >
        <div className="w-full">
          <img
            src="/logo/ma.svg"
            alt=""
            className="size-10 md:size-12 lg:size-14"
          />
        </div>

        <p className="hidden w-full text-center font-neue-montreal-medium md:block">
          M Attar
        </p>

        <div className="flex w-full justify-end">
          <button
            className="group z-20 flex items-center text-sm md:text-lg"
            onClick={setMenu}
            disabled={!isAnimateDone}
          >
            [
            <div className="h-[1.5px] w-0 bg-zinc-900 transition-all duration-300 group-hover:xl:w-8" />
            <div className="w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:xl:w-16 group-hover:xl:px-2">
              Open
            </div>
            Menu]
          </button>
        </div>
      </nav>

      {/* menu */}
      <div className="menu fixed -bottom-full left-0 z-50 flex h-[70dvh] w-full flex-col items-end bg-white p-8 outline outline-2 outline-zinc-900 md:p-20 xl:h-dvh">
        <button
          onClick={setMenu}
          className="relative flex size-8 items-center justify-center md:size-12 lg:size-14 xl:size-10"
          disabled={!isAnimateDone}
        >
          <span className="close-icon absolute block h-1 rotate-45 rounded-full bg-zinc-900 md:h-2 xl:h-1.5" />
          <span className="close-icon absolute block h-1 -rotate-45 rounded-full bg-zinc-900 md:h-2 xl:h-1.5" />
        </button>

        <ul className="mt-12 h-full w-full space-y-4 md:space-y-6 xl:mt-0">
          {links.map(({ id, link, title }) => (
            <li key={id}>
              <Link
                href={link}
                className="menu-link block w-fit overflow-hidden text-5xl font-semibold leading-tight md:text-6xl md:leading-snug lg:text-7xl lg:leading-normal xl:text-6xl xl:leading-snug"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
