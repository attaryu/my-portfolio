'use client';

import { Media } from '@prisma/client';
import { forwardRef, useEffect, useState } from 'react';

import { Input } from '@/components/shadcn-ui/input';
import Text from '@/components/Text';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  id: string;
  data?: Media;
  disabled?: boolean;
}

const MediaForm = forwardRef<HTMLFormElement, Props>(
  ({ data, disabled, ...props }, ref) => {
    const [formState, setFormState] = useState({ title: '', media: '' });

    useEffect(() => resetFormState(), [disabled, data]);

    function resetFormState() {
      setFormState({
        title: data?.title ?? '',
        media: data
          ? `/images/${data.extension}/${data.title}.${data.extension}`
          : '',
      });
    }

    function changeFormState(
      e: React.ChangeEvent<HTMLInputElement>,
      value?: string,
    ) {
      setFormState((previousState) => ({
        ...previousState,
        [e.target.name]: value ?? e.target.value,
      }));
    }

    function setPreviewUploadedMedia(e: React.ChangeEvent<HTMLInputElement>) {
      const fileReader = new FileReader();
      const file = e.target.files![0];

      fileReader.onload = (event) =>
        changeFormState(e, event.target!.result as string);
      fileReader.readAsDataURL(file);
    }

    return (
      <form
        className="mt-12 space-y-4"
        onReset={resetFormState}
        ref={ref}
        {...props}
      >
        {data && <input type="hidden" name="id" value={data.id} />}

        <div className="space-y-2">
          <Text tag="label" styling="lead">
            Title
          </Text>

          <Input
            type="text"
            placeholder="Title"
            required={!data}
            name="title"
            value={formState.title}
            onChange={changeFormState}
            disabled={disabled}
          />
        </div>

        <div className="flex justify-between gap-8">
          <div className="w-full space-y-2">
            <Text tag="p" styling="lead">
              Preview
            </Text>

            <img
              src={formState.media}
              alt=""
              data-error="Upload something from there 👉"
              className="relative h-fit w-full rounded-lg border border-dashed border-zinc-600 p-1 before:absolute before:top-0 before:grid before:h-full before:w-full before:place-items-center before:bg-zinc-900 before:content-[attr(data-error)]"
            />
          </div>

          <div className="w-full space-y-2">
            <Text tag="label" styling="lead">
              Media
            </Text>

            <Input
              type="file"
              accept=".jpg,.png,.svg,.jpeg"
              required={!data}
              onChange={setPreviewUploadedMedia}
              name="media"
              disabled={disabled}
            />
          </div>
        </div>
      </form>
    );
  },
);

export default MediaForm;
