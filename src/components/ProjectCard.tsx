import { MdArrowOutward, MdOpenInFull } from 'react-icons/md';

import Button from './Button';

interface Prop {
  project: {
    title: string;
    short_description: string;
    cover: any;
    links: any;
  };
  detailURL: string;
}

export default function ProjectCard({ project, detailURL }: Readonly<Prop>) {  
  return (
    <div className="relative flex aspect-[2/3] w-full flex-col overflow-hidden rounded-3xl bg-zinc-300 p-6 text-zinc-100 md:aspect-[2/1.5] md:p-8 lg:aspect-[3/2] xl:aspect-[16/7.5] xl:p-10">
      {/* background image */}
      <img
        src={process.env.NEXT_PUBLIC_CMS_REQUEST_URL + project.cover.data.attributes.formats.medium.url}
        alt=""
        className="absolute left-0 top-0 h-full w-full object-cover brightness-[0.3]"
      />

      <Button
        href={project.links.data.find((link: any) => link.attributes.title === 'Live Production').attributes.link}
        secondary
        target="_blank"
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
            {project.short_description}
          </p>
        </div>

        <Button
          href={`/projects/${detailURL}`}
          secondary
          className="w-full !border-zinc-100 md:w-fit"
        >
          Detail <MdOpenInFull />
        </Button>
      </div>
    </div>
  );
}
