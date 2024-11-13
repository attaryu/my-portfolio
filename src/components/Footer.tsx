'use client';

import { MdArrowUpward, MdShare } from 'react-icons/md';
import { useLenis } from 'lenis/react';

export default function Footer() {
  const lenis = useLenis();
  
  const scrollToTop = () => lenis?.scrollTo('#top');
  
  return (
    <footer className="flex w-full items-center justify-between bg-zinc-900 px-8 py-5 text-zinc-100 md:px-20 xl:py-4">
      <button className="flex items-center gap-2 text-lg lg:text-xl xl:text-lg" onClick={scrollToTop} data-hover>
        <span className="hidden md:inline">Back to top</span>
        <MdArrowUpward />
      </button>

      <p className="text-sm lg:text-base">Since 2021 until present</p>

      <button className="flex items-center gap-2 text-lg lg:text-xl xl:text-lg" data-hover>
        <span className="hidden md:inline">Share</span>
        <MdShare />
      </button>
    </footer>
  );
}
