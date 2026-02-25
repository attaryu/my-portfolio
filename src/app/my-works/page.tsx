import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const dummy = [
	{
		title: 'Lorem ipsum dolor sit.',
		date: '15 January 2026',
		isOpen: false,
		image: '/images/statue-1.jpg',
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		title: 'Lorem, ipsum.',
		date: '10 December 2025',
		isOpen: true,
		image: '/images/monument.jpg',
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		title: 'Lorem, ipsum dolor.',
		date: '5 November 2025',
		isOpen: false,
		image: '/images/statue-3.jpg',
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		title: 'Lorem.',
		date: '1 October 2025',
		isOpen: false,
		image: '/images/statue-1.jpg',
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		title: 'Lorem ipsum dolor sit.',
		date: '20 September 2025',
		isOpen: false,
		image: '/images/monument.jpg',
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		title: 'Lorem, ipsum dolor.',
		date: '15 August 2025',
		isOpen: false,
		image: '/images/statue-3.jpg',
		techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		shortDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
];

export default function MyWorksPage() {
	return (
		<main>
			<h1 className="text-5xl text-start lg:text-7xl xl:text-8xl font-unbounded font-black md:text-center p-4 py-6">
				MY WORKS
			</h1>

			<section>
				<div className="grid grid-cols-[3fr_1fr] lg:grid-cols-[1fr_1.5fr_0.5fr] font-unbounded font-bold bg-zinc-300 border-y border-zinc-950 p-4 text-sm">
					<p>Title</p>
					<p className="hidden lg:block">At glance</p>
					<p className="justify-self-end">Date</p>
				</div>

				<ul>
					{dummy.map((data) => (
						<li
							key={data.date}
							className={` border-b border-zinc-950 ${data.isOpen ? '' : 'hover:bg-zinc-200 cursor-pointer'}`}
						>
							<div className=" grid grid-cols-[3fr_1fr] lg:grid-cols-[1fr_1.5fr_0.5fr] items-center w-full gap-4">
								<h2 className="font-unbounded font-bold uppercase truncate py-4 pl-4">
									{data.title}
								</h2>

								{!data.isOpen && (
									<p className="hidden lg:block font-neue-montreal text-sm text-zinc-700 truncate">
										{data.shortDescription}
									</p>
								)}

								<div className="flex justify-end items-center lg:col-start-3">
									<time
										dateTime={data.date}
										className="justify-self-end text-xs font-neue-montreal font-medium whitespace-nowrap pr-4"
									>
										{data.date}
									</time>

									{data.isOpen && (
										<button
											type="button"
											className="border-l border-zinc-950 size-14 shrink-0 grid place-items-center cursor-pointer"
										>
											<ArrowUpRight />
										</button>
									)}
								</div>
							</div>

							{data.isOpen && (
								<div>
									<div className="h-[50vh] lg:h-[55vh] max-h-155 relative border-y border-zinc-950">
										<Image
											src={data.image}
											alt={data.title}
											fill
											className="object-cover saturate-0"
										/>
									</div>

									<div className="lg:flex">
										<div className="p-4 space-y-2 w-full">
											<p className="font-neue-montreal">{data.description}</p>

											<ul className="flex gap-1 flex-wrap font-medium text-sm font-neue-montreal">
												{data.techStack.map((tech) => (
													<li key={tech}>{tech},</li>
												))}
											</ul>
										</div>

										<button
											type="button"
											className="bg-zinc-950 text-white uppercase whitespace-nowrap font-unbounded font-bold p-4 w-full lg:w-fit cursor-pointer"
										>
											Read More
										</button>
									</div>
								</div>
							)}
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
