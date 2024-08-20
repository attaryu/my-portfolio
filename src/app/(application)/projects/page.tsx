import Link from 'next/link';
import { MdNorthEast } from 'react-icons/md';

type Project = {
  id: string;
  title: string;
  linkTitle: string;
  link: string;
  finishedDate: string;
};

type ProjectGrouping = {
  date: string;
  projects: Project[];
};

export default function Page() {
  const projects: Project[] = [
    {
      id: '1404',
      title: 'uBook',
      linkTitle: 'ubook.app',
      link: '/#',
      finishedDate: '2024-08-16T07:16:53.000Z',
    },
    {
      id: '1715',
      title: 'Noto',
      linkTitle: 'noto.so',
      link: '/#',
      finishedDate: '2024-08-02T07:16:53.000Z',
    },
    {
      id: '1195',
      title: "O'Chat",
      linkTitle: 'ochat.com',
      link: '/#',
      finishedDate: '2024-07-25T07:16:53.000Z',
    },
    {
      id: '1708',
      title: 'Gimly',
      linkTitle: 'gimly.org',
      link: '/#',
      finishedDate: '2024-07-09T07:16:53.000Z',
    },
    {
      id: '1575',
      title: 'Supa Star',
      linkTitle: 'supastar.id',
      link: '/#',
      finishedDate: '2024-07-01T07:16:53.000Z',
    },
    {
      id: '1154',
      title: 'COULUMN',
      linkTitle: 'coulumn.dev',
      link: '/#',
      finishedDate: '2024-06-25T07:16:53.000Z',
    },
  ];

  // function for project grouping by month and year
  function projectsGrouping(projects: Project[]) {
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

    const groupBy: ProjectGrouping[] = [];

    projects.forEach((data) => {
      const date = new Date(data.finishedDate);
      const format = `${monthsName[date.getMonth()]} ${date.getFullYear()}`;

      const groupIndex = groupBy.findIndex((group) => group.date === format);

      if (groupIndex < 0) {
        groupBy.push({ date: format, projects: [data] });
      } else {
        groupBy[groupIndex].projects.push(data);
      }
    });

    return groupBy;
  }

  return (
    <main className="min-h-svh px-8 md:px-16 xl:px-20">
      <h1 className="py-14 text-center font-tusker-grotesk-semibold text-6xl md:text-[8rem] md:py-20 xl:text-[16rem]">
        MY ALL PROJECTS
      </h1>

      <div className="flex">
        <div className="w-[1px] rounded-full bg-zinc-900 md:w-[2px]" />

        <ol className="w-full">
          {/* grouping list */}
          {projectsGrouping(projects).map((data) => (
            <li key={data.date} className="pb-8 md:pb-10">
              <h2 className="flex items-center gap-2 text-sm md:text-lg md:gap-3">
                <span className="inline-block h-[1px] w-5 rounded-full bg-zinc-900 md:h-[2px] md:w-7" />
                {data.date}
              </h2>

              {/* project list */}
              <ul className="pl-7 md:pl-9">
                {data.projects.map((project) => (
                  <li key={project.id} className="pt-2 md:pt-4">
                    <div className="flex items-end justify-between py-2 md:py-3">
                      <Link
                        href={`/projects/${project.id}`}
                        className="font-tusker-grotesk-medium text-4xl md:text-5xl lg:text-6xl"
                      >
                        {project.title.toUpperCase()}
                      </Link>

                      <Link
                        href={project.link}
                        className="flex items-center gap-2 opacity-50 md:text-xl md:opacity-70"
                      >
                        <span>{project.linkTitle}</span>
                        <MdNorthEast />
                      </Link>
                    </div>
                    <div className="h-[1px] w-full bg-zinc-900" />
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
