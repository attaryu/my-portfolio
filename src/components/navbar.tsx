'use client';

import { useMobile } from '@/hooks/use-mobile';
import { useGSAP } from '@gsap/react';
import { format } from 'date-fns';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, Flip);

export function Navbar() {
	const isMobile = useMobile();
	const containerRef = useRef<HTMLElement>(null);

	const now = new Date();

	const { contextSafe } = useGSAP(
		() => {
			if (!isMobile) {
				gsap.set(containerRef.current, { clearProps: 'all' });
			}
		},
		{ dependencies: [isMobile], scope: containerRef },
	);

	const openMenu = contextSafe(() => {
		gsap.set(containerRef.current, { right: '-120%', skewX: 12 });

		const state = Flip.getState(containerRef.current);

		gsap.set(containerRef.current, { right: '0%', skewX: 0 });

		Flip.from(state, {
			duration: 1,
			ease: 'power3.inOut',
		});
	});

	const closeMenu = contextSafe(() => {
		if (isMobile) {
			const state = Flip.getState(containerRef.current);

			gsap.set(containerRef.current, { right: '-120%', skewX: -12 });

			Flip.from(state, {
				duration: 1,
				ease: 'power3.inOut',
				onComplete: () => {
					gsap.set(containerRef.current, { skewX: 12 });
				},
			});
		}
	});

	return (
		<header className="fixed top-0 z-50 inset-x-0">
			<div className="flex bg-zinc-100 border-b border-b-zinc-900 2xl:max-w-384 2xl:border-x 2xl:border-zinc-950 mx-auto">
				<div className="flex flex-1 py-1 px-4 xl:px-6 items-center">
					<Image src="/logo/light.svg" width={48} height={48} alt="" />

					<time
						dateTime={now.toISOString()}
						className="flex flex-col items-end ml-auto text-xs gap-1"
						suppressHydrationWarning
					>
						<span>{format(now, 'dd MMMM y')}</span>
						<span>{format(now, 'hh:mm a')}</span>
					</time>
				</div>

				<button
					type="button"
					className="size-14 md:hidden bg-zinc-900 text-zinc-300 grid place-items-center rounded-none"
					onClick={openMenu}
				>
					<Menu />
				</button>

				<nav
					ref={containerRef}
					className="fixed md:static flex-1 top-0 -right-[120%] h-screen w-screen md:h-auto md:w-auto bg-zinc-900 md:bg-transparent backdrop-blur-md p-4 md:p-0 skew-x-12 md:skew-0"
				>
					<button
						type="button"
						className="p-1 absolute top-4 right-4 md:hidden"
						onClick={closeMenu}
					>
						<X size={32} className="text-zinc-100" />
					</button>

					<ul className="md:border-l md:border-l-zinc-900 flex flex-col md:flex-row gap-8 text-2xl md:text-xs font-unbounded font-bold py-1 px-6 md:justify-evenly items-center h-full justify-center text-zinc-100 md:text-black">
						<li>
							<Link href="/" onClick={closeMenu}>
								/HOME
							</Link>
						</li>
						<li>
							<Link href="/my-works" onClick={closeMenu}>
								/MY-WORKS
							</Link>
						</li>
						<li>
							<Link href="/contact-me" onClick={closeMenu}>
								/CONTACT-ME
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
