'use client';

import gsap from 'gsap';
import ReactLenis from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
}

export default function Lenis({ children }: Readonly<Props>) {
  const lenisRef = useRef<any>()
  
  useEffect(() => {
    function update(time: number) {
      console.log('time:', time);
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => {
      gsap.ticker.remove(update)
    }
  })
  
  return (
    <ReactLenis ref={lenisRef} autoRaf={false} root>
      {children}
    </ReactLenis>
  )
}
