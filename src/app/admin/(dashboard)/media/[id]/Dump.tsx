'use client';

import { Media } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { Button } from '@/components/shadcn-ui/button';
import Text from '@/components/Text';
import Time from '@/components/Time';
import MediaForm from '../MediaForm';

import { updateMedia } from '@/app/api/media/action';
import { ActionResponse } from '@/app/api/response-type';
import { useToast } from '@/hooks/use-toast';

type Props = {
  data: ActionResponse<{ media: Media }>;
};

export default function Dump({ data }: Readonly<Props>) {
  const [formState, formAction] = useFormState(updateMedia, null);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();

  const id = 'media-editor-form';

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

  const changeMode = () => setIsEdit((isEdit) => !isEdit);

  return (
    <main className="px-24">
      <header className="flex items-end justify-between">
        <Text tag="h1">Detail Media</Text>

        <div className="flex items-center gap-4">
          {data.payload && (
            <div className="*:text-end">
              <Text tag="p" styling="small">
                Last update at
              </Text>
              <Time value={data.payload.media.updated_at} />
            </div>
          )}

          {isEdit && (
            <Button type="submit" form={id}>
              Save
            </Button>
          )}

          {data.payload && (
            <Button variant="secondary" onClick={changeMode}>
              {isEdit ? 'Cancel' : 'Edit'}
            </Button>
          )}
        </div>
      </header>

      {data.payload ? (
        <MediaForm
          id={id}
          data={data.payload.media}
          disabled={!isEdit}
          action={formAction}
        />
      ) : (
        <div className="mt-8">
          <Text tag="h2">Error</Text>
          <Text tag="p">{data.message}</Text>
        </div>
      )}
    </main>
  );
}
