import { unstable_cache } from 'next/cache';

import AboutMe from '@/components/self-components/landing/AboutMe';
import Collaboration from '@/components/self-components/landing/Collaboration';
import Cover from '@/components/self-components/landing/Cover';
import Grid from '@/components/self-components/landing/Grid';
import SelectedProject from '@/components/self-components/landing/SelectedProject';
import SocialMedia from '@/components/self-components/landing/SocialMedia';
import SomeWord from '@/components/self-components/landing/SomeWord';
import TechStack from '@/components/self-components/landing/TechStack';

import prisma from '../api/database';

const getData = unstable_cache(
  async () => {
    const techs = await prisma.tech.findMany({ include: { media: true } });
    const selectedProjects = await prisma.project.findMany({
      include: {
        cover: true,
        links: {
          include: { link: true },
          where: { link: { title: 'Live Production' } },
        },
      },
      orderBy: { created_at: 'desc' },
      take: 5,
    });

    return { techs, selectedProjects };
  },
  ['landing-data'],
  { tags: ['projects', 'medias', 'techs'] },
);

export default async function Page() {
  const { selectedProjects, techs } = await getData();

  return (
    <main>
      {/* grid area */}
      <div>
        {/* grid backgroud */}
        <div className="absolute top-0 h-[240vh] w-full">
          <Grid />
        </div>

        {/* cover */}
        <Cover />

        {/* about me */}
        <AboutMe />
      </div>

      {/* tech skill */}
      <TechStack icons={techs} />

      {/* some word */}
      <SomeWord />

      {/* showcase selected project */}
      <SelectedProject data={selectedProjects} />

      {/* offering project */}
      <Collaboration />

      {/* my social media and etc */}
      {/* BACKLOG: membuat link media sosial dari sisi admin, bukan static */}
      <SocialMedia />
    </main>
  );
}
