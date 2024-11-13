'use client';

import { useEffect } from 'react';

import Text from '@/components/Text';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorAdmin({ error }: Readonly<Props>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-4">
      <Text tag="h1">Ups, error...</Text>
      <Text tag="p">Pleas check the console or your log app</Text>
    </main>
  );
}
