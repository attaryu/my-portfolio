'use client';

import {
  Link,
  Media,
  Project,
  ProjectLink as ProjectLinkType,
  ProjectPreview,
  Tech,
} from '@prisma/client';

import ProjectLink from '@/components/ProjectLink';
import dayjs from 'dayjs';

type Props = {
  id: string;
  data: Project & {
    cover: Media;
    techStacks: Array<Tech & { media: Media }>;
    previews: Array<ProjectPreview & { image: Media }>;
    links: Array<ProjectLinkType & { link: Link }>;
  };
};

export default function Dump({ data }: Readonly<Props>) {
  return (
    <main>
      <section className="flex h-[90vh] flex-col gap-6 px-8 py-4 xl:gap-4 md:px-20">
        <h1 className="font-tusker-grotesk-medium text-6xl md:text-8xl">
          {data.title.toUpperCase()}
        </h1>

        <img
          src={data.cover.url}
          className="grow overflow-hidden rounded-2xl object-cover"
          alt=""
        />

        <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
          <p className="text-xl md:self-start md:text-end md:text-lg lg:text-xl">
            {data.subtitle}
          </p>

          <div className="flex items-center gap-6 xl:flex-row-reverse xl:items-start">
            <p className="w-fit rounded-full border border-zinc-900 px-2.5 py-1.5 lg:px-4 lg:text-lg">
              {data.label[0].toUpperCase() + data.label.slice(1)} Project
            </p>

            <p className="text-sm">
              Launched {dayjs(data.finished_at).format('MMMM D, YYYY')}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-4 px-8 md:mt-12 md:px-20 xl:space-y-6">
        <h2 className="font-neue-montreal-medium text-3xl md:text-4xl">
          What it is?
        </h2>

        <p className="text-justify !leading-relaxed md:text-lg xl:text-xl">
          {data.description}
        </p>
      </section>

      <section className="mt-12 space-y-6 xl:mt-20 xl:space-y-8">
        <h2 className="px-8 font-neue-montreal-medium text-3xl md:px-20 md:text-4xl">
          Preview
        </h2>

        <div className="flex gap-8 overflow-x-auto px-8 md:px-20">
          {data.previews.map((preview) => (
            <img
              key={preview.id}
              src={preview.image.url}
              alt=""
              className="aspect-[1/1.2] w-64 rounded-xl object-cover shadow-lg md:w-[30rem] xl:aspect-[2/1] xl:w-[75rem] xl:rounded-2xl"
            />
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6 xl:mt-20 xl:space-y-8">
        <h2 className="px-8 font-neue-montreal-medium text-3xl md:px-20 md:text-4xl">
          Tech Stack
        </h2>

        <ul className="flex flex-wrap gap-4 overflow-x-auto px-8 md:px-20">
          {data.techStacks.map((tech) => (
            <li
              key={tech.id}
              className="flex items-center gap-2 rounded-full border border-zinc-900 px-2.5 py-1.5 md:gap-3 md:px-3 md:py-2"
            >
              <img
                src={tech.media.url}
                alt={`${tech.name}'s logo`}
                className="size-9 p-1 md:size-10"
              />
              <p className="inline-block font-neue-montreal-medium md:text-lg">
                {tech.name}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16 mt-12 space-y-4 px-8 md:mt-12 md:px-20 xl:mt-20 xl:space-y-6">
        <h2 className="font-neue-montreal-medium text-3xl md:text-4xl">
          Additional Link
        </h2>

        <ul>
          {data.links.map(({ link }) => (
            <li key={link.id} className="pt-2 md:pt-4">
              <ProjectLink
                title={link.title}
                url={link.url}
                urlTarget="_blank"
                subtitle={link.subtitle}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
