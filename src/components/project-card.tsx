interface Props {
	title: string;
	projectNumber: string;
}

export function ProjectCard({ title, projectNumber }: Props) {
	return (
		<li className="flex p-4 items-center gap-4 xl:flex-col bg-zinc-100 xl:w-20 hover:bg-zinc-900 hover:text-zinc-100 transition-colors duration-150">
			<p className="font-unbounded font-bold text-xs flex-1 xl:[writing-mode:vertical-rl] xl:[text-orientation:mixed]">
				{projectNumber}
			</p>

			<h3 className="font-unbounded text-end line-clamp-1 flex-2 truncate font-bold uppercase text-sm xl:[writing-mode:vertical-rl] xl:[text-orientation:mixed]">
				{title}
			</h3>
		</li>
	);
}
