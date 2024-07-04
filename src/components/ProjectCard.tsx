import React from "react";
import { MdArrowOutward, MdOpenInFull } from 'react-icons/md';

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
    <div className="relative w-full aspect-[16/7.5] bg-zinc-300 flex flex-col rounded-3xl p-8 overflow-hidden text-zinc-100">
      {/* background image */}
      <img src={project.image} alt="" className="w-full h-full absolute top-0 left-0 object-cover brightness-[0.3]" />

      <a href={project.url} className="self-end p-3 border border-zinc-100 rounded-full text-2xl z-10">
        <MdArrowOutward />
      </a>

      <div className="mt-auto flex justify-between items-end gap-32 z-10">
        <div>
          <h3 className="font-tusker-grotesk-medium text-6xl">{project.title.toUpperCase()}</h3>
          <p className="text-lg mt-3">{project.description}</p>
        </div>

        <a href={detailURL} className="py-3 px-6 h-fit border border-zinc-100 flex items-center rounded-full gap-3 text-xl">
          Detail <MdOpenInFull />
        </a>
      </div>
    </div>
  );
}
