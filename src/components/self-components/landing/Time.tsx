'use client';

import { useEffect, useRef } from 'react';

import useEvent from '@/hooks/useEvent';

export default function Time() {
  const { subscribe } = useEvent('cover-opening@end');
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

  return (
    <time className="time z-10" ref={timeRef}>
      x/xx/xxxx, xx:xx:xx AM
    </time>
  );
}
