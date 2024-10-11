import { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return <Suspense>{children}</Suspense>;
}
