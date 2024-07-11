import { MdArrowOutward, MdOpenInFull } from 'react-icons/md';

import Button from './Button';

interface Prop {
  project: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  detailURL: string;
}

export default function ProjectCard({ project, detailURL }: Readonly<Prop>) {
  return (
    <div className="relative flex aspect-[2/3] w-full flex-col overflow-hidden rounded-3xl bg-zinc-300 p-6 text-zinc-100 md:aspect-[2/1.5] md:p-8 lg:aspect-[3/2] xl:aspect-[16/7.5] xl:p-10">
      {/* background image */}
      <img
        src={project.image}
        alt=""
        className="absolute left-0 top-0 h-full w-full object-cover brightness-[0.3]"
      />

      <Button
        href={project.url}
        secondary
        className="z-10 self-end !border-zinc-100 !p-3 !text-2xl lg:!text-3xl"
      >
        <MdArrowOutward />
      </Button>

      <div className="z-10 mt-auto flex flex-col items-end justify-between gap-8 md:flex-row xl:gap-32">
        <div>
          <h3 className="font-tusker-grotesk-medium text-6xl lg:text-8xl">
            {project.title.toUpperCase()}
          </h3>

          <p className="mt-3 text-sm md:mt-2 md:text-lg lg:text-xl xl:mt-4">
            {project.description}
          </p>
        </div>

        <Button
          href={detailURL}
          secondary
          className="w-full !border-zinc-100 md:w-fit"
        >
          Detail <MdOpenInFull />
        </Button>
      </div>
    </div>
  );
}
