import { differenceInYears } from 'date-fns';
import { ArrowUpRight, Share2 } from 'lucide-react';
import Image from 'next/image';

import { ProjectCard } from '@/components/project-card';

export default function Home() {
	return (
		<main>
			{/* hero image */}
			<section>
				<h1 className="text-5xl text-start lg:text-7xl xl:text-8xl font-unbounded font-black md:text-center p-4 py-6">
					THIS IS MY STYLE
				</h1>

				<div className="relative h-[80vh] md:h-[90vh] max-h-155 border-y border-y-zinc-900">
					<Image
						src="/images/statue-2.jpg"
						alt="Statue"
						fill
						className="saturate-0 brightness-80 object-cover object-top"
					/>
				</div>
			</section>

			{/* mini intro */}
			<section className="grid auto-rows-auto lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-4">
				<ul className="flex flex-col xl:gap-2 items-end lg:items-start bg-zinc-950 px-4 py-6 lg:px-6 lg:py-12 xl:py-24 font-unbounded font-bold text-xl lg:text-xl xl:text-3xl text-zinc-200">
					<li>I'M ATTAR</li>
					<li>FRONTEND DEVELOPER</li>
					<li>BACKEND DEVELOPER</li>
					<li>UI/UX DESIGNER</li>
				</ul>

				<div className="space-y-2 lg:space-y-3 px-4 lg:self-center lg:px-6">
					<h2 className="text-2xl lg:text-3xl font-unbounded font-bold">
						AT A GLANCE
					</h2>

					<p className="text-sm xl:text-base">
						A {differenceInYears(new Date(), new Date(2004, 10, 25))}
						-year-old man, with almost 4 years of in-depth experience in web
						development. My work ethic remains rooted in upholding best
						practices, consistency, and high attention to detail. My expertise
						leans more towards the frontend, as I have website design skills and
						a bit of a good sense of design. But I also have experience in
						backend development.
					</p>
				</div>
			</section>

			<section className="mt-14 lg:mt-0 ">
				<h2 className="text-2xl py-4 lg:py-6 lg:text-4xl font-unbounded font-bold text-center xl:text-end px-4 border-y border-y-zinc-900">
					MY RECENT WORKS
				</h2>

				<ul className="grid xl:grid-cols-[1fr_auto_auto] xl:h-[80vh]  max-h-155  auto-rows-auto grid-cols-1 gap-px bg-zinc-900 border-b border-b-zinc-900 xl:row-start-2 xl:col-span-2">
					{/* project card */}
					<li className=" flex flex-col gap-px bg-zinc-900">
						{/* project header */}
						<div className="flex items-center bg-zinc-100">
							<p className="font-unbounded font-bold text-sm flex-1 px-4">
								PROJECT XII
							</p>

							<button
								type="button"
								className="size-12 grid place-items-center border-l border-l-zinc-900"
							>
								<Share2 size={20} />
							</button>

							<button
								type="button"
								className="size-12 grid place-items-center border-l border-l-zinc-900"
							>
								<ArrowUpRight size={20} />
							</button>
						</div>

						{/* project image */}
						<div className="relative h-[50vh] xl:h-auto xl:flex-1">
							<Image
								src="/images/building-2.jpg"
								alt="Building"
								fill
								className="saturate-0 brightness-80 object-cover"
							/>
						</div>

						{/* project description */}
						<div className="flex flex-col xl:flex-row bg-zinc-100">
							<div className="p-4 flex flex-col gap-6 xl:flex-1 xl:flex-row xl:items-end">
								<div className="space-y-1">
									<h3 className="font-unbounded font-bold uppercase">Noto</h3>

									<p className="text-sm">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Reprehenderit in minus tenetur aspernatur nulla hic
										distinctio magnam quia.
									</p>
								</div>

								<time dateTime="2025-06-08" className="text-xs ml-auto">
									08 June 2025
								</time>
							</div>

							<button
								type="button"
								className="bg-zinc-900 text-zinc-100 px-6 py-4 font-unbounded font-bold text-sm w-full text-center xl:basis-0 whitespace-nowrap"
							>
								READ MORE
							</button>
						</div>
					</li>

					<ProjectCard
						title="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
						projectNumber="PROJECT XI"
					/>

					<ProjectCard title="Lorem, ipsum dolor." projectNumber="PROJECT X" />
				</ul>

				<button
					type="button"
					className="px-6 py-4 text-zinc-900 font-unbounded font-bold text-sm w-full text-center"
				>
					SEE MORE
				</button>
			</section>
		</main>
	);
}
