'use client';

import { MdNorthEast, MdOutlineFeedback, MdShare } from 'react-icons/md';

import ProjectLink from '@/components/ProjectLink';

type Props = {
  id: string;
  data: any;
};

export default function Dump({ data, id }: Readonly<Props>) {
  return (
    <main>
      <section className="detail-project-grid-template grid h-screen place-items-center gap-y-4 px-8 py-2 md:px-20 xl:gap-y-4 xl:py-6">
        <h1 className="col-span-2 font-tusker-grotesk-medium text-6xl md:col-span-1 md:row-span-2 md:justify-self-start md:text-8xl">
          {data.title.toUpperCase()}
        </h1>

        <img
          src={
            process.env.NEXT_PUBLIC_CMS_REQUEST_URL +
            data.cover.data.attributes.formats.large.url
          }
          className="col-span-2 h-full w-full overflow-hidden rounded-2xl object-cover"
          alt=""
        />
        <p className="col-span-2 justify-self-start text-xl md:col-span-1 md:col-start-2 md:row-start-2 md:self-start md:justify-self-end md:text-end md:text-lg lg:text-xl">
          {data.short_description}
        </p>

        <p className="w-fit self-start justify-self-start rounded-full border border-zinc-900 px-2.5 py-1.5 md:col-start-2 md:row-start-1 md:self-end md:justify-self-end lg:px-4 lg:text-lg">
          {data.label[0].toUpperCase() + data.label.slice(1)} Project
        </p>

        <div className="flex items-center justify-end gap-6 self-start justify-self-end md:col-start-2 md:self-center lg:gap-8">
          <a
            href={`/project/${id}`}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl"
          >
            <MdShare />
          </a>

          <a
            href={`/project/${id}`}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl"
          >
            <MdOutlineFeedback />
          </a>

          <a
            href={`/project/${id}`}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl"
          >
            <MdNorthEast />
          </a>
        </div>
      </section>

      <section className="space-y-4 px-8 md:mt-12 md:px-20 xl:space-y-6">
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
          {data.preview.data.map((img: any) => (
            <img
              key={img.id}
              src={
                process.env.NEXT_PUBLIC_CMS_REQUEST_URL +
                img.attributes.formats.large.url
              }
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
          {data.tech_stacks.data.map((tech: any) => (
            <li
              key={tech.id}
              className="flex items-center gap-2 rounded-full border border-zinc-900 px-2.5 py-1.5 md:gap-3 md:px-3 md:py-2"
            >
              <img
                src={
                  process.env.NEXT_PUBLIC_CMS_REQUEST_URL +
                  tech.attributes.icon.data.attributes.url
                }
                alt={`${tech.attributes.title}'s logo`}
                className="size-9 p-1 md:size-10"
              />
              <p className="inline-block font-neue-montreal-medium md:text-lg">
                {tech.attributes.title}
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
          {data.links.data.map((link: any) => (
            <li key={link.id} className="pt-2 md:pt-4">
              <ProjectLink
                title={link.attributes.title}
                url={link.attributes.link}
                urlTarget="_blank"
                subtitle={link.attributes.link_title}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
