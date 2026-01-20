import { format } from 'date-fns';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
	const now = new Date();

	return (
		<header className="flex fixed top-0 z-50 inset-x-0 bg-zinc-100 border-b border-b-zinc-900">
			<div className="flex flex-1 py-1 px-4 xl:px-6 items-center">
				<Image src="/logo/light.svg" width={48} height={48} alt="" />

				<time
					dateTime={now.toISOString()}
					className="flex flex-col items-end ml-auto text-xs gap-1"
				>
					<span>{format(now, 'MMMM, dd y')}</span>
					<span>{format(now, 'hh:mm a')}</span>
				</time>
			</div>

			<button
				type="button"
				className="size-14 lg:hidden bg-zinc-900 text-zinc-300 grid place-items-center rounded-none"
			>
				<Menu />
			</button>

			<nav className="hidden lg:block flex-1">
				<ul className="border-l border-l-zinc-900 flex gap-8 text-xs font-unbounded font-bold py-1 px-6 justify-evenly items-center h-full">
					<li>
						<Link href="#">/HOME</Link>
					</li>
					<li>
						<Link href="#">/ABOUT-ME</Link>
					</li>
					<li>
						<Link href="#">/CONTACT-ME</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
