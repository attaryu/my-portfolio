'use client';

import type {
  Link,
  Media,
  Project,
  ProjectLink,
  ProjectPreview,
  Tech,
} from '@prisma/client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';
import Time from '@/components/Time';
import ProjectForm from '../ProjectForm';

import { updateProject } from '@/app/api/project/action';
import { useToast } from '@/hooks/use-toast';

type Props = {
  mediaData: Array<
    Media & {
      tech: null | Tech;
      projectPreview: null | ProjectPreview;
      project: null | Project;
    }
  >;
  techData: Array<Tech & { media: Media }>;
  projectData: Project & {
    cover: Media;
    previews: Array<ProjectPreview & { image: Media }>;
    links: Array<ProjectLink & { link: Link }>;
    techStacks: Array<Tech & { media: Media }>;
  };
};

export default function ProjectDetailDump({
  techData,
  mediaData,
  projectData,
}: Readonly<Props>) {
  const [formState, formAction] = useFormState(updateProject, null);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();
  const id = 'tech-editor-form';

  useEffect(() => {
    if (formState) {
      if (formState.error) {
        toast({
          title: 'Error ❌',
          description: formState.message,
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success ✅' });
        changeMode();
      }
    }
  }, [formState]);

  const changeMode = () => setIsEdit((previousValue) => !previousValue);

  return (
    <main className="px-24">
      <header className="flex items-end justify-between">
        <Text tag="h1">Detail Project</Text>

        <div className="flex items-center gap-4">
          <div className="*:text-end">
            <Text tag="p" styling="small">
              Last update at
            </Text>
            <Time value={projectData.updated_at} />
          </div>

          {isEdit && (
            <Button type="submit" form={id}>
              Save
            </Button>
          )}

          <Button variant="secondary" onClick={changeMode}>
            {isEdit ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </header>

      <ProjectForm
        id={id}
        mediaData={mediaData}
        techData={techData}
        projectData={projectData}
        action={formAction}
        disabled={!isEdit}
      />
    </main>
  );
}
