'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import SplitType from 'split-type';

import debounce from '@/utils/debounce';
import AnimatedLink from './AnimatedLink';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const navigationRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useRef(0);
  const scrollDirection = useRef<'down' | 'up'>('up');
  const [isAnimate, setIsAnimate] = useState(false);

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

  const animation = {
    menuStateBefore: {
      right: '-100%',
      duration: 0.6,
      ease: 'power3.in',
    },
    splitTextStateBefore: {
      yPercent: 100,
      ease: 'power3.in',
      stagger: {
        amount: 0.3,
      },
    },
    closeIconState: {
      ease: 'power3.out',
      stagger: {
        amount: 0.1,
      },
    },
  };

  useGSAP(() => {
    function navbarScroll() {
      const { scrollY } = window;

      if (
        scrollY >= scrollProgress.current &&
        scrollDirection.current === 'up'
      ) {
        gsap.fromTo(
          navigationRef.current,
          { yPercent: 0 },
          { yPercent: -100, duration: 0.3, ease: 'none' },
        );

        scrollDirection.current = 'down';
      } else if (
        scrollY < scrollProgress.current &&
        scrollDirection.current === 'down'
      ) {
        gsap.fromTo(
          navigationRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.3, ease: 'none' },
        );

        scrollDirection.current = 'up';
      }
      
      scrollProgress.current = scrollY;
    }

    window.addEventListener('scroll', navbarScroll);

    return () => window.removeEventListener('scroll', navbarScroll);
  }, []);

  // change navbar background on scroll
  const { contextSafe } = useGSAP(() => {
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

  const setMenu = contextSafe(
    debounce((state: boolean) => {
      if (!isAnimate) {
        setIsAnimate(true);

        const splitedText = new SplitType('.navbar__link', {
          types: 'chars',
          tagName: 'span',
        });

        const timeline = gsap.timeline();

        if (state) {
          openMenu(timeline, splitedText);
        } else {
          closeMenu(timeline, splitedText);
        }

        timeline.call(setIsAnimate, [false]);
      }
    }, 200),
  );

  const openMenu = contextSafe(
    (timeline: GSAPTimeline, splitedText: SplitType) => {
      timeline
        // menu background animation
        .fromTo('.menu', animation.menuStateBefore, {
          ...animation.menuStateBefore,
          right: '0%',
          ease: 'power3.out',
        })
        // text link animation
        .fromTo(
          splitedText.chars,
          animation.splitTextStateBefore,
          {
            ...animation.splitTextStateBefore,
            ease: 'power3.out',
            yPercent: 0,
          },
          '<50%',
        )
        // close icon animation
        .to(
          '.close-icon',
          { ...animation.closeIconState, width: '100%' },
          '<45%',
        );
    },
  );

  const closeMenu = contextSafe(
    (timeline: GSAPTimeline, splitedText: SplitType) => {
      timeline
        // close icon animation
        .to('.close-icon', { ...animation.closeIconState, width: '0%' })
        // text link animation
        .to(splitedText.chars, animation.splitTextStateBefore, '<')
        // menu background animation
        .to('.menu', animation.menuStateBefore, '<50%');
    },
  );

  return (
    <>
      <nav
        className="fixed top-0 z-20 flex h-fit w-full max-w-widhest items-center justify-between border border-transparent px-8 py-1 transition-all duration-300 md:px-20 xl:py-0"
        ref={navigationRef}
      >
        <div className="w-full">
          <img
            src="/logo/ma.svg"
            alt=""
            className="size-9 md:size-11 lg:size-14 xl:size-12"
          />
        </div>

        <p className="hidden w-full text-center font-neue-montreal-medium md:block xl:text-base">
          M Attar
        </p>

        <div className="flex w-full justify-end">
          <button
            className="group z-20 flex items-center text-sm md:text-lg xl:text-base"
            onClick={() => setMenu(true)}
            disabled={isAnimate}
            data-hover
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
      <div className="menu fixed -right-full top-0 z-40 flex h-dvh w-full flex-col items-end bg-white p-8 outline outline-2 outline-zinc-900 md:p-20">
        <button
          onClick={() => setMenu(false)}
          className="relative flex size-8 items-center justify-center md:size-12 lg:size-14 xl:size-10"
          disabled={isAnimate}
          data-hover
          data-hover-scale="3.5"
        >
          <span className="close-icon absolute block h-1 rotate-45 rounded-full bg-zinc-900 md:h-2 xl:h-1.5" />
          <span className="close-icon absolute block h-1 -rotate-45 rounded-full bg-zinc-900 md:h-2 xl:h-1.5" />
        </button>

        <ul className="mt-12 h-full w-full space-y-4 md:space-y-6 xl:mt-0">
          {links.map(({ id, link, title }) => (
            <li key={id}>
              <AnimatedLink
                href={link}
                className="navbar__link block w-fit overflow-hidden text-5xl font-semibold leading-tight md:text-6xl md:leading-snug lg:text-7xl lg:leading-normal xl:text-6xl xl:leading-snug"
                onClick={() => setMenu(false)}
                disabled={isAnimate}
                data-hover-scale={6}
              >
                {title}
              </AnimatedLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
