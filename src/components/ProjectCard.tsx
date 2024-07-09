import React from "react";
import { MdArrowOutward, MdOpenInFull } from 'react-icons/md';
import Button from "./Button";

interface Prop {
  project: {
    title: string,
    description: string,
    image: string,
    url: string,
  },
  detailURL: string,
}

export default function ProjectCard({ project, detailURL }: Readonly<Prop>) {
  return (
    <div className="relative w-full aspect-[2/3] xl:aspect-[16/7.5] bg-zinc-300 flex flex-col rounded-3xl p-6 xl:p-8 overflow-hidden text-zinc-100">
      {/* background image */}
      <img src={project.image} alt="" className="w-full h-full absolute top-0 left-0 object-cover brightness-[0.3]" />

      <Button href={project.url} secondary className="self-end !p-3 z-10 !text-2xl !border-zinc-100">
        <MdArrowOutward />
      </Button>

      <div className="mt-auto flex flex-col xl:flex-row justify-between items-end gap-8 xl:gap-32 z-10">
        <div>
          <h3 className="font-tusker-grotesk-medium text-6xl">
            {project.title.toUpperCase()}
          </h3>

          <p className="xl:text-lg mt-3">{project.description}</p>
        </div>

        <Button href={detailURL} secondary className="!border-zinc-100 w-full xl:w-fit">
          Detail <MdOpenInFull />
        </Button>
      </div>
    </div>
  );
}
