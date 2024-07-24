'use client';

import { useEffect, useRef } from 'react';

export default function Time() {
  const timeRef = useRef<HTMLTimeElement | null>(null);

  useEffect(() => {
    if (window) {
      const updateDateInterval = setInterval(() => {        
        if (timeRef.current) {
          const now = new Date();

          timeRef.current.innerHTML = now.toLocaleString();
          timeRef.current.setAttribute('datetime', now.toISOString());
        }
      }, 1000);

      return () => clearInterval(updateDateInterval);
    }
  }, []);

  return <time ref={timeRef}>x/xx/xxxx, xx:xx:xx AM</time>;
}
