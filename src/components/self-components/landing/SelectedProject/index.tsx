'use client';

import { useGSAP } from '@gsap/react';
import { Link, Media, Project, ProjectLink } from '@prisma/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import sequenceAnimation from '@/utils/text-animation/sequence';
import textSplitter from '@/utils/textSplitter';
import ProjectCard from './ProjectCard';

type Props = {
  data: Array<Project & {
    cover: Media;
    links: Array<ProjectLink & { link: Link }>
  }>;
};

gsap.registerPlugin(useGSAP);

export default function SelectedProject({ data }: Readonly<Props>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current) {
        const splittedText = textSplitter('.title', containerRef.current, {
          types: 'chars,lines',
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.title',
              start: 'top 90%',
              end: 'top bottom',
              toggleActions: 'play none none reverse',
            },
          })
          .add(sequenceAnimation(splittedText, { from: 'top' }).play());
      }
    },
    {
      scope: containerRef,
      dependencies: [],
    },
  );

  return (
    <section className="my-32 px-8 md:px-20" ref={containerRef}>
      <h2 className="title mx-auto w-fit font-neue-montreal-medium text-4xl *:pb-1 lg:text-5xl xl:text-6xl">
        There are my <br className="md:hidden" />
        selected project
      </h2>

      <ul className="mt-14 space-y-8 md:space-y-12 lg:mt-20 lg:space-y-16">
        {data.map((data) => (
          <li key={data.id}>
            <ProjectCard project={data} />
          </li>
        ))}
      </ul>
    </section>
  );
}
