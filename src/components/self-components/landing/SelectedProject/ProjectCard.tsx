'use client';

import type { Link, Media, Project, ProjectLink } from '@prisma/client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { MdArrowOutward, MdOpenInFull } from 'react-icons/md';

import AnimatedLink from '@/components/AnimatedLink';
import Button from '@/components/Button';

interface Prop {
  project: Project & {
    cover: Media;
    links: Array<ProjectLink & { link: Link }>;
  };
}

gsap.registerPlugin(useGSAP);

export default function ProjectCard({ project }: Readonly<Prop>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(containerRef.current, {
      scale: 0.8,
      opacity: 0.5,
      filter: 'blur(10px)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      className="card relative flex aspect-[2/3] w-full flex-col overflow-hidden rounded-3xl bg-zinc-300 p-6 text-zinc-100 blur-0 md:aspect-[2/1.5] md:p-8 lg:aspect-[3/2] xl:aspect-[16/7.5] xl:p-10"
      ref={containerRef}
    >
      {/* background image */}
      <img
        src={project.cover.url}
        alt=""
        className="absolute left-0 top-0 h-full w-full object-cover brightness-[0.3]"
      />

      <Button
        className="z-10 self-end border-zinc-100"
        variant="secondary"
        size="icon"
        asChild
      >
        <a href={project.links[0].link.url} target="_blank">
          <MdArrowOutward />
        </a>
      </Button>

      <div className="z-10 mt-auto flex flex-col items-end justify-between gap-8 md:flex-row xl:gap-32">
        <div>
          <h3 className="font-tusker-grotesk-medium text-6xl lg:text-8xl">
            {project.title.toUpperCase()}
          </h3>

          <p className="mt-3 text-sm md:mt-2 md:text-lg lg:text-xl xl:mt-4">
            {project.subtitle}
          </p>
        </div>

        <AnimatedLink
          href={`/projects/${project.id}`}
          className="flex h-fit w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-zinc-100 px-4 py-2 md:w-fit md:px-6 md:py-3 md:text-xl lg:text-2xl xl:gap-4"
        >
          Detail <MdOpenInFull />
        </AnimatedLink>
      </div>
    </div>
  );
}
