'use client';

import useEvent from '@/hooks/useEvent';
import { useEffect, useRef } from 'react';

export default function Time() {
  const { subscribe } = useEvent('timeline@cover-opening');
  const timeRef = useRef<HTMLTimeElement | null>(null);

  const updateTime = () => {
    if (timeRef.current) {
      const now = new Date();

      timeRef.current.innerHTML = now.toLocaleString();
      timeRef.current.setAttribute('datetime', now.toISOString());
    }
  };

  useEffect(() => {
    let updateDateInterval: NodeJS.Timeout;

    const unsubscribe = subscribe(() => {
      updateTime();
      updateDateInterval = setInterval(updateTime, 1000);
    });

    return () => {
      unsubscribe();
      clearInterval(updateDateInterval);
    };
  }, []);

  return <time className="time" ref={timeRef}>x/xx/xxxx, xx:xx:xx AM</time>;
}
