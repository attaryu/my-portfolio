'use client';

import type { Media } from '@prisma/client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Button } from '@/components/shadcn-ui/button';
import * as Toast from '@/components/shadcn-ui/toast';
import Text from '@/components/Text';
import TechForm from '../TechForm';

import { addTech } from '@/app/api/tech/action';
import { useToast } from '@/hooks/use-toast';

type Props = {
  mediaData: Media[];
};

export default function Dump({ mediaData }: Readonly<Props>) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formState, formAction] = useFormState(addTech, null);
  const router = useRouter();
  const { toast } = useToast();
  const id = 'tech-add-form';

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
          description: 'Click view to see your new media',
          action: (
            <Toast.Action
              altText="view"
              onClick={() =>
                router.push(
                  `/admin/contents/techs/${formState.payload!.tech.id}`,
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
        <Text tag="h1">Add Tech</Text>

        <div className="space-x-4">
          <Button type="reset" form={id} variant="secondary">
            Reset
          </Button>

          <Button type="submit" form={id}>
            Save
          </Button>
        </div>
      </header>

      <TechForm
        id={id}
        mediaData={mediaData}
        action={formAction}
        ref={formRef}
      />
    </main>
  );
}
