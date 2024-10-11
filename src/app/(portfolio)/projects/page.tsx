import { Link, Project, ProjectLink as ProjectLinkType } from '@prisma/client';

import prisma from '@/app/api/database';
import ProjectLink from '@/components/ProjectLink';

type ProjectRelation = Project & {
  links: Array<ProjectLinkType & { link: Link }>;
};

export default async function Page() {
  const data = await prisma.project
    .findMany({
      include: {
        links: {
          include: { link: true },
          where: { link: { title: 'Live Production' } },
        },
      },
    })
    .then((res) => projectsGrouping(res));

  // function for project grouping by month and year
  function projectsGrouping(projects: ProjectRelation[]) {
    const monthsName = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const groupBy: { date: string; projects: ProjectRelation[] }[] = [];

    projects.forEach((data) => {
      const date = new Date(data.finished_at);
      const format = `${monthsName[date.getMonth()]} ${date.getFullYear()}`;

      const groupIndex = groupBy.findIndex((group) => group.date === format);

      if (groupIndex < 0) {
        groupBy.push({
          date: format,
          projects: [data],
        });
      } else {
        groupBy[groupIndex].projects.push(data);
      }
    });

    return groupBy.reverse();
  }

  return (
    <main className="min-h-svh px-8 md:px-16 xl:px-20">
      <h1 className="py-14 text-center font-tusker-grotesk-semibold text-6xl md:py-20 md:text-[8rem] xl:text-[16rem]">
        MY ALL PROJECTS
      </h1>

      <div className="flex">
        <div className="w-[1px] rounded-full bg-zinc-900 md:w-[2px]" />

        <ol className="w-full">
          {data.map((data) => (
            <li key={data.date} className="pb-8 md:pb-10">
              <h2 className="flex items-center gap-1 text-sm md:gap-3 md:text-lg">
                <span className="inline-block h-[1px] w-3 rounded-full bg-zinc-900 md:h-[2px] md:w-7" />
                {data.date}
              </h2>

              {/* project list */}
              <ul className="pl-4 md:pl-9">
                {data.projects.map((project) => (
                  <li key={project.id} className="pt-2 md:pt-4">
                    <ProjectLink
                      title={project.title}
                      url={`/projects/${project.id}`}
                      subtitle={project.links[0].link.title}
                      subtitleUrl={project.links[0].link.url}
                      subtitleUrlTarget="_blank"
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
