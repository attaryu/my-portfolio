'use client';

import { Media, Tech } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { updateTech } from '@/app/api/tech/action';
import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';
import { useToast } from '@/hooks/use-toast';
import TechForm from '../TechForm';
import Time from '@/components/Time';

type Props = {
  techData: Omit<Tech & { media: Media }, 'created_at' | 'logoId' | 'projects'>;
  mediaData: Media[];
};

export default function TechDetailDump({
  techData,
  mediaData,
}: Readonly<Props>) {
  const [formState, formAction] = useFormState(updateTech, null);
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
        <Text tag="h1">Detail Tech</Text>

        <div className="flex items-center gap-4">
          <div className="*:text-end">
            <Text tag="p" styling="small">
              Last update at
            </Text>
            <Time value={techData.media.updated_at} />
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

      <TechForm
        id={id}
        mediaData={mediaData}
        techData={techData}
        action={formAction}
        disabled={!isEdit}
      />
    </main>
  );
}
