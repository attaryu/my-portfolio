'use client';

import type { Media, Tech } from '@prisma/client';

import { forwardRef, useEffect, useMemo, useState } from 'react';

import ImgPreview from '@/components/ImgPreview';
import { Input } from '@/components/shadcn-ui/input';
import * as Select from '@/components/shadcn-ui/select';
import Text from '@/components/Text';

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

        <div className="flex justify-between gap-8">
          <div className="w-full space-y-2">
            <Text tag="p" styling="lead">
              Name
            </Text>

            <Input
              name="name"
              placeholder="Name"
              value={formState.name}
              onChange={changeFormState}
              required
              disabled={disabled}
            />
          </div>
        </div>

        <div className="flex justify-between gap-8">
          <div className="w-full space-y-2">
            <Text tag="p" styling="lead">
              Logo
            </Text>

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
          </div>

          <div className="w-full space-y-2">
            <Text tag="p" styling="lead">
              Preview
            </Text>

            <ImgPreview
              src={selectedLogoPreviewUrl}
              alt=""
              message="Select logo"
            />
          </div>
        </div>
      </form>
    );
  },
);

export default TechForm;
