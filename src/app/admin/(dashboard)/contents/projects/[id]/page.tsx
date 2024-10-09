import _ from 'lodash';

import prisma from '@/app/api/database';
import Text from '@/components/Text';
import ProjectDetailDump from './Dump';

type Props = {
  params: {
    id: string;
  };
};

export default async function ProjectDetail({ params }: Readonly<Props>) {
  const media = await prisma.media
    .findMany({ include: { tech: true, projectPreview: true, project: true } })
    .then((media) =>
      media.filter(
        (media) => !(media.tech || media.projectPreview || media.project),
      ),
    );

  const tech = await prisma.tech.findMany({
    include: { media: true },
  });

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      cover: true,
      previews: { include: { image: true } },
      links: { include: { link: true } },
      techStacks: { include: { media: true } },
    },
  });

  if (!project) {
    return (
      <main className="space-y-2">
        <Text tag="h1">404 not found</Text>
        <Text tag="p">Tech with id {params.id} not found</Text>
      </main>
    );
  }

  const combinedMedia = _.uniqBy(
    [
      ...media,
      {
        ...project.cover,
        tech: null,
        projectPreview: null,
        project: null,
      },
      ...project.previews.map(({ image }) => ({
        ...image,
        tech: null,
        projectPreview: null,
        project: null,
      })),
    ],
    'id',
  );

  return (
    <ProjectDetailDump
      mediaData={combinedMedia}
      techData={tech}
      projectData={project}
    />
  );
}
