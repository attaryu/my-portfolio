'use client';

import type { Media, Tech } from '@prisma/client';

import { forwardRef, useEffect, useMemo, useState } from 'react';

import FormGrouping from '@/components/FormGrouping';
import ImgPreview from '@/components/ImgPreview';
import { Input } from '@/components/shadcn-ui/input';
import * as Select from '@/components/shadcn-ui/select';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  techData?: Tech & { media: Media };
  mediaData: Media[];
  id: string;
  disabled?: boolean;
}

const TechForm = forwardRef<HTMLFormElement, Props>(
  ({ mediaData, techData, disabled, ...props }, ref) => {
    const [formState, setFormState] = useState({
      name: techData?.name ?? '',
      logoId: techData?.media.id.toString() ?? '',
    });

    const selectedLogoPreviewUrl = useMemo(
      () =>
        mediaData.find(({ id }) => id === parseInt(formState.logoId))?.url ??
        '#',
      [formState.logoId],
    );

    useEffect(() => resetFormState(), [disabled]);

    const changeFormState = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
      name?: string,
    ) => {
      if (typeof e === 'string') {
        return setFormState((previousState) => ({
          ...previousState,
          [name!]: e,
        }));
      }

      setFormState((previousState) => ({
        ...previousState,
        [e.target.name]: e.target.value,
      }));
    };

    const resetFormState = () => {
      setFormState({
        name: techData?.name ?? '',
        logoId: techData?.media.id.toString() ?? '',
      });
    };

    return (
      <form
        className="mt-12 space-y-4"
        onReset={resetFormState}
        ref={ref}
        {...props}
      >
        {techData && <input type="hidden" name="id" value={techData.id} />}

        <FormGrouping title="Name">
          <Input
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={changeFormState}
            required
            disabled={disabled}
          />
        </FormGrouping>

        <div className="flex justify-between gap-8">
          <FormGrouping title="Logo" required>
            <Select.Root
              value={formState.logoId}
              onValueChange={(value) => changeFormState(value, 'logoId')}
              name="logoId"
              disabled={disabled}
              required
            >
              <Select.Trigger>
                <Select.Value placeholder="Logo" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Logo</Select.Label>
                  {mediaData.map((techData) => (
                    <Select.Item
                      key={techData.id}
                      value={techData.id.toString()}
                    >
                      {techData.title}.{techData.extension}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </FormGrouping>

          <FormGrouping title="Preview">
            <ImgPreview
              src={selectedLogoPreviewUrl}
              alt=""
              message="Select logo"
            />
          </FormGrouping>
        </div>
      </form>
    );
  },
);

export default TechForm;
