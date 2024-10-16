'use client';

import { Media } from '@prisma/client';
import { forwardRef, useEffect, useState } from 'react';

import FormGrouping from '@/components/FormGrouping';
import ImgPreview from '@/components/ImgPreview';
import { Input } from '@/components/shadcn-ui/input';

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
        media: data?.url ?? '',
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

        <FormGrouping title="Title" required={!data}>
          <Input
            type="text"
            placeholder="Title"
            required={!data}
            name="title"
            value={formState.title}
            onChange={changeFormState}
            disabled={disabled}
          />
        </FormGrouping>

        <div className="flex justify-between gap-8">
          <FormGrouping title="Preview">
            <ImgPreview
              src={formState.media}
              alt=""
              message="Upload something from there 👉"
            />
          </FormGrouping>

          <FormGrouping title="Media" required={!data}>
            <Input
              type="file"
              accept=".jpg,.png,.svg,.jpeg"
              required={!data}
              onChange={setPreviewUploadedMedia}
              name="media"
              disabled={disabled}
            />
          </FormGrouping>
        </div>
      </form>
    );
  },
);

export default MediaForm;
