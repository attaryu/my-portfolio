'use client';

import type { Media, Project, ProjectPreview, Tech } from '@prisma/client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Button } from '@/components/shadcn-ui/button';
import * as Toast from '@/components/shadcn-ui/toast';
import Text from '@/components/Text';
import ProjectForm from '../ProjectForm';

import { addProject } from '@/app/api/project/action';
import { useToast } from '@/hooks/use-toast';

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
            <Toast.Action
              altText="view"
              onClick={() =>
                router.push(
                  `/admin/contents/projects/${formState.payload!.project.id}`,
                )
              }
            >
              View
            </Toast.Action>
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
