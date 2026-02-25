import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
	const now = new Date();

	return (
		<footer className="bg-zinc-950 text-zinc-100 mt-16">
			<div className="grid auto-rows-auto lg:place-items-center p-4 lg:grid-cols-4 lg:px-6 lg:py-0">
				<Image
					src="/logo/dark.svg"
					alt="Logo"
					width={80}
					height={80}
					className="lg:row-start-1 lg:size-40 lg:justify-self-start"
				/>

				<a
					href="mailto:mattarannaufal@gmail.com"
					className="row-start-2 col-span-2 mb-8 -mt-2 lg:col-start-4 lg:row-start-1 lg:justify-self-end lg:text-sm lg:mb-10"
				>
					mattarannaufal@gmail.com
				</a>

				<div className="row-start-3 space-y-2 lg:row-start-1 lg:flex lg:h-fit">
					<p className="font-unbounded">Navigation</p>

					<nav className="border-l border-l-zinc-100 pl-3 ml-3 lg:pl-6 lg:ml-6">
						<ul className="lg:space-y-1">
							<li>
								<Link
									href="/"
									className="font-unbounded text-sm lg:text-base font-medium"
								>
									/home
								</Link>
							</li>
							<li>
								<Link
									href="/my-works"
									className="font-unbounded text-sm lg:text-base font-medium"
								>
									/my-works
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="font-unbounded text-sm lg:text-base font-medium"
								>
									/contact-me
								</Link>
							</li>
						</ul>
					</nav>
				</div>

				<div className="row-start-3 space-y-2 lg:row-start-1 lg:flex lg:h-fit">
					<p className="font-unbounded">Social</p>

					<ul className="border-l border-l-zinc-100 pl-3 ml-3 lg:pl-6 lg:ml-6 lg:space-y-1">
						<li>
							<a
								href="/"
								className="font-unbounded text-sm lg:text-base font-medium"
							>
								LinkedIn
							</a>
						</li>
						<li>
							<a
								href="/"
								className="font-unbounded text-sm lg:text-base font-medium"
							>
								Github
							</a>
						</li>
						<li>
							<a
								href="/"
								className="font-unbounded text-sm lg:text-base font-medium"
							>
								Instagram
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="w-full overflow-hidden border-y border-y-zinc-100 mt-12 lg:mt-16 p-4 lg:py-8">
				<div className="flex items-center gap-4 w-fit">
					<p className="whitespace-nowrap font-unbounded font-bold text-5xl lg:text-[10rem]">
						BEYOND THE GRID
					</p>

					<div className="w-16 h-2 bg-zinc-100" />

					<p className="whitespace-nowrap font-unbounded font-bold text-5xl lg:text-[10rem]">
						BREAKING THE RULES
					</p>

					<div className="w-16 h-2 bg-zinc-100" />
				</div>
			</div>

			<div className="p-4 flex justify-between text-sm lg:text-base lg:px-6">
				<small>&copy; {now.getFullYear()} M Attar. All rights reserved.</small>

				<small>Powered by: myself</small>
			</div>
		</footer>
	);
}
