'use client';

import { useEffect, useState } from 'react';

export default function Time() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (window) {
      const updateDateInterval = setInterval(() => {
        setDate(new Date());
      }, 1000);

      return () => clearInterval(updateDateInterval);
    }
  }, []);

  if (!date) {
    return <time dateTime="">x/xx/xxxx, xx:xx:xx AM</time>;
  }

  return <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>;
}
