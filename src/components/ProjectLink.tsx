'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { MouseEvent, useRef } from 'react';
import { MdNorthEast } from 'react-icons/md';

import AnimatedLink from './AnimatedLink';

import textSplitter from '@/utils/textSplitter';

type Props = {
  title: string;
  subtitle: string;
  url: string;
  subtitleUrl?: string;
  urlTarget?: '_blank' | '_self' | '_parent' | '_top';
  subtitleUrlTarget?: Props['urlTarget'];
};

gsap.registerPlugin(useGSAP);

export default function ProjectLink({
  title,
  subtitle,
  url,
  subtitleUrl,
  urlTarget = '_self',
  subtitleUrlTarget,
}: Readonly<Props>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP();

  const animation: GSAPTweenVars = {
    yPercent: -100,
    ease: 'power2.out',
    stagger: { amount: 0.3 },
  };

  const onMouseOverHandler = contextSafe((e: MouseEvent<HTMLAnchorElement>) => {
    const firstText = textSplitter('.first-text', e.currentTarget);
    const secondText = textSplitter('.second-text', e.currentTarget);

    gsap.set(firstText.chars, { yPercent: 0 });
    gsap.set(secondText.chars, { yPercent: 0 });

    gsap.to(firstText.chars, animation);
    gsap.to(secondText.chars, animation);
  });

  const onMouseLeaveHandler = contextSafe(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const firstText = textSplitter('.first-text', e.currentTarget);
      const secondText = textSplitter('.second-text', e.currentTarget);

      gsap.set(firstText.chars, { yPercent: -100 });
      gsap.set(secondText.chars, { yPercent: -100 });

      gsap.to(firstText.chars, { ...animation, yPercent: 0 });
      gsap.to(secondText.chars, { ...animation, yPercent: 0 });
    },
  );

  return (
    <div
      className="group transition duration-150 hover:bg-zinc-900"
      ref={containerRef}
    >
      <div className="relative flex items-end justify-between">
        <AnimatedLink
          href={url}
          target={urlTarget}
          className="w-full truncate whitespace-nowrap px-3 py-2 font-tusker-grotesk-medium text-3xl !leading-tight transition duration-150 group-hover:text-white md:py-3 md:text-5xl lg:text-6xl"
          onMouseOver={onMouseOverHandler}
          onMouseLeave={onMouseLeaveHandler}
          data-hover-scale={6}
        >
          <span className="pointer-events-none relative block overflow-hidden">
            <span className="first-text">{title.toUpperCase()}</span>
            <span aria-hidden className="second-text absolute left-0 top-full">
              {title.toUpperCase()}
            </span>
          </span>
        </AnimatedLink>

        <Link
          href={subtitleUrl ?? url}
          target={subtitleUrlTarget ?? urlTarget}
          className="absolute bottom-2 right-3 flex items-center gap-2 opacity-50 transition duration-150 group-hover:text-white md:bottom-3 md:text-xl md:opacity-70"
          onMouseOver={onMouseOverHandler}
          onMouseLeave={onMouseLeaveHandler}
          data-hover
        >
          <span className="pointer-events-none relative block overflow-hidden">
            <span className="first-text">{subtitle}</span>
            <span aria-hidden className="second-text absolute left-0 top-full">
              {subtitle}
            </span>
          </span>

          <MdNorthEast />
        </Link>
      </div>

      <div className="h-[1px] w-full bg-zinc-900" />
    </div>
  );
}
