'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Button } from '@/components/shadcn-ui/button';
import * as Toast from '@/components/shadcn-ui/toast';
import Text from '@/components/Text';
import { useToast } from '@/hooks/use-toast';
import MediaForm from '../MediaForm';

import { addMedia } from '@/app/api/media/action';

export default function Page() {
  const [formState, createMediaAction] = useFormState(addMedia, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const id = 'media-uploader-form';

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
              onClick={() => router.push(`/admin/media/${formState.id}`)}
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
        <Text tag="h1">Add Media</Text>

        <div className="space-x-4">
          <Button type="reset" form={id} variant="secondary">
            Reset
          </Button>

          <Button type="submit" form={id}>
            Save
          </Button>
        </div>
      </header>

      <MediaForm id={id} ref={formRef} action={createMediaAction} />
    </main>
  );
}
