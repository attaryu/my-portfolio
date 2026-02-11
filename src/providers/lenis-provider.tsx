'use client';

import { ReactLenis } from 'lenis/react';

type Props = {
	children: React.ReactNode;
};

export function LenisProvider({ children }: Props) {
	return <ReactLenis root>{children}</ReactLenis>;
}
