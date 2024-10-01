'use client';

import { Media, Tech } from '@prisma/client';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { Input } from '@/components/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import Text from '@/components/Text';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  techData?: Omit<
    Tech & { media: Media },
    'created_at' | 'logoId' | 'projects'
  >;
  mediaData: Media[];
  id: string;
  disabled?: boolean;
}

const TechForm = forwardRef<HTMLFormElement, Props>(
  ({ mediaData, techData, disabled, ...props }, ref) => {
    const [formState, setFormState] = useState({
      name: techData?.name ?? '',
      logoId: techData?.media.id.toString() ?? '',
      status: techData?.status ?? '',
    });

    const selectedLogoPreviewUrl = useMemo(() => {
      const logo = mediaData.find(
        ({ id }) => id === parseInt(formState.logoId),
      );

      if (logo) {
        return `/images/${logo.extension}/${logo.title}.${logo.extension}`;
      }

      return '#';
    }, [formState.logoId]);

    useEffect(() => {
      resetFormState();
    }, [disabled]);

    const changeFormState = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
      name?: string,
    ) => {
      console.log('formState: ', formState);

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
        status: techData?.status ?? '',
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
          <div className="w-full space-y-2">
            <Text tag="p" styling="lead">
              Status
            </Text>

            <Select
              value={formState.status}
              onValueChange={(value) => changeFormState(value, 'status')}
              name="status"
              required
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="draft">Drafted</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between gap-8">
          <div className="w-full space-y-2">
            <Text tag="p" styling="lead">
              Logo
            </Text>

            <Select
              value={formState.logoId}
              onValueChange={(value) => changeFormState(value, 'logoId')}
              name="logoId"
              disabled={disabled}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Logo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Logo</SelectLabel>
                  {mediaData.map((techData) => (
                    <SelectItem
                      key={techData.id}
                      value={techData.id.toString()}
                    >
                      {techData.title}.{techData.extension}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-2">
            <Text tag="p" styling="lead">
              Preview
            </Text>

            <img
              src={selectedLogoPreviewUrl}
              alt=""
              data-error="Select logo"
              className="relative h-fit w-full rounded-lg border border-dashed border-zinc-600 p-1 before:absolute before:top-0 before:grid before:h-full before:w-full before:place-items-center before:bg-zinc-900 before:content-[attr(data-error)]"
            />
          </div>
        </div>
      </form>
    );
  },
);

export default TechForm;
