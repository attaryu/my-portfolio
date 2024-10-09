'use client';

import { Media, Project, ProjectPreview, Tech } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { addProject } from '@/app/api/project/action';
import { Button } from '@/components/shadcn-ui/button';
import { ToastAction } from '@/components/shadcn-ui/toast';
import Text from '@/components/Text';
import { useToast } from '@/hooks/use-toast';
import ProjectForm from '../ProjectForm';

type Props = {
  techData: Array<Tech & { media: Media }>;
  mediaData: Array<
    Media & {
      tech: Tech | null;
      projectPreview: ProjectPreview | null;
      project: Project | null;
    }
  >;
};

export default function Dump({ techData, mediaData }: Readonly<Props>) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formState, formAction] = useFormState(addProject, null);
  const { toast } = useToast();
  const router = useRouter();
  const id = 'project-add-form';

  useEffect(() => {
    if (formState) {
      if (formState.error) {
        toast({
          title: 'Error ❌',
          description: formState.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success ✅',
          description: 'Click view to see your new project',
          action: (
            <ToastAction
              altText="view"
              onClick={() =>
                router.push(
                  `/admin/contents/projects/${formState.payload!.project.id}`,
                )
              }
            >
              View
            </ToastAction>
          ),
        });

        formRef.current?.reset();
      }
    }
  }, [formState]);

  return (
    <main className="px-24">
      <header className="flex items-end justify-between">
        <Text tag="h1">Add Project</Text>

        <div className="space-x-4">
          <Button type="reset" form={id} variant="secondary">
            Reset
          </Button>

          <Button type="submit" form={id}>
            Save
          </Button>
        </div>
      </header>

      <ProjectForm
        id={id}
        techData={techData}
        mediaData={mediaData}
        action={formAction}
        ref={formRef}
      />
    </main>
  );
}
