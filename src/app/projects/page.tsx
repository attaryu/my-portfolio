import ProjectLink from '@/components/ProjectLink';
import fetcher from '@/utils/fetcher';

export default async function Page() {
  const data = await fetcher(
    '/links?filters[title]=Live Production&populate[project][fields][0]=title&populate[project][fields][1]=finish_at&fields[0]=link_title&fields[1]=link',
  ).then((res) => projectsGrouping(res.data));

  // function for project grouping by month and year
  function projectsGrouping(projects: any) {
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

    const groupBy: any[] = [];

    projects.forEach((data: any) => {
      const date = new Date(data.attributes.project.data.attributes.finish_at);
      const format = `${monthsName[date.getMonth()]} ${date.getFullYear()}`;

      const groupIndex = groupBy.findIndex((group) => group.date === format);

      if (groupIndex < 0) {
        groupBy.push({
          date: format,
          projects: [
            {
              ...data.attributes.project.data.attributes,
              id: data.attributes.project.data.id,
              link: data.attributes.link,
              link_title: data.attributes.link_title,
            },
          ],
        });
      } else {
        groupBy[groupIndex].projects.push({
          ...data.attributes.project.data.attributes,
          id: data.attributes.project.data.id,
          link: data.attributes.link,
          link_title: data.attributes.link_title,
        });
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
          {data.map((data: any) => (
            <li key={data.date} className="pb-8 md:pb-10">
              <h2 className="flex items-center gap-1 text-sm md:gap-3 md:text-lg">
                <span className="inline-block h-[1px] w-3 rounded-full bg-zinc-900 md:h-[2px] md:w-7" />
                {data.date}
              </h2>

              {/* project list */}
              <ul className="pl-4 md:pl-9">
                {data.projects.map((project: any) => (
                  <li key={project.id} className="pt-2 md:pt-4">
                    <ProjectLink
                      title={project.title}
                      url={`/projects/${project.id}`}
                      subtitle={project.link_title}
                      subtitleUrl={project.link}
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
