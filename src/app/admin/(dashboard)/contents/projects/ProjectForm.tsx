'use client';

import type {
  Link,
  Media,
  Project,
  ProjectLink,
  ProjectPreview,
  Tech,
} from '@prisma/client';

import { ProjectLabel } from '@prisma/client';
import dayjs from 'dayjs';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';

import FormGrouping from '@/components/FormGrouping';
import ImgPreview from '@/components/ImgPreview';
import { Button } from '@/components/shadcn-ui/button';
import * as Dialog from '@/components/shadcn-ui/dialog';
import { Input } from '@/components/shadcn-ui/input';
import * as Select from '@/components/shadcn-ui/select';
import { Textarea } from '@/components/shadcn-ui/textarea';
import Text from '@/components/Text';

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean;
  techData: Array<Tech & { media: Media }>;
  mediaData: Array<
    Media & {
      tech: Tech | null;
      projectPreview: ProjectPreview | null;
      project: Project | null;
    }
  >;
  projectData?: Project & {
    cover: Media;
    previews: Array<ProjectPreview & { image: Media }>;
    links: Array<ProjectLink & { link: Link }>;
    techStacks: Array<Tech & { media: Media }>;
  };
}

type SelectedLink = Pick<Link, 'title' | 'subtitle' | 'url'>;

const ProjectForm = forwardRef<HTMLFormElement, Props>(
  ({ action, disabled, techData, mediaData, projectData, ...props }, ref) => {
    const [formState, setFormState] = useState({
      title: projectData?.title ?? '',
      subtitle: projectData?.subtitle ?? '',
      label: projectData?.label ?? '',
      status: projectData?.status ?? '',
      description: projectData?.description ?? '',
      finished_at: dayjs(projectData?.finished_at ?? Date.now()).format(
        'YYYY-MM-DD',
      ),
    });

    /* 
      Menambahkan data cover secara langsung dikarenakan fungsi onChangeValue shadcn ui ditrigger ketika rendering pertama yang dimana value awalnya adalah null. Menyebabkan nilai yang sudah ditambah melalui formResetHandler dioverride menjadi null kembali
    */
    const [coverId, setCoverId] = useState<number | null>(
      projectData?.cover.id ?? null,
    );

    const [links, setLinks] = useState<SelectedLink[]>([]);
    const [techIds, setTechIds] = useState<number[]>([]);
    const [previewIds, setPreviewIds] = useState<number[]>([]);

    const techs = useMemo(
      () => ({
        unselected: techData.filter(({ id }) => !techIds.includes(id)),
        selected: techData.filter(({ id }) => techIds.includes(id)),
      }),
      [techIds],
    );

    const previews = useMemo(
      () => ({
        unselected: mediaData.filter((media) => !previewIds.includes(media.id)),
        selected: mediaData.filter((media) => previewIds.includes(media.id)),
      }),
      [previewIds],
    );

    const coverUrl = useMemo(
      () => mediaData.find((media) => media.id === coverId)?.url ?? '#',
      [coverId],
    );

    useEffect(() => formResetHandler(), [projectData, disabled]);

    const formStateChange = (
      name:
        | string
        | React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >,
      value?: string,
    ) => {
      setFormState((previousValue) => {
        if (typeof name === 'string') {
          return {
            ...previousValue,
            [name]: value,
          };
        }

        const { target } = name;

        return {
          ...previousValue,
          [target.name]: target.value,
        };
      });
    };

    const formSubmitHandler = (form: FormData) => {
      form.set('links', JSON.stringify(links));
      form.set('techIds', JSON.stringify(techIds));
      form.set('previewIds', JSON.stringify(previewIds));

      if (typeof action === 'function') {
        action(form);
      }
    };

    const formResetHandler = () => {
      setFormState({
        title: projectData?.title ?? '',
        subtitle: projectData?.subtitle ?? '',
        label: projectData?.label ?? '',
        status: projectData?.status ?? '',
        description: projectData?.description ?? '',
        finished_at: dayjs(projectData?.finished_at ?? Date.now()).format(
          'YYYY-MM-DD',
        ),
      });

      setCoverId(projectData?.cover.id ?? null);

      setLinks(
        projectData?.links.map(({ link }) => ({
          title: link.title,
          subtitle: link.subtitle,
          url: link.url,
        })) ?? [],
      );

      setTechIds(projectData?.techStacks.map(({ id }) => id) ?? []);

      setPreviewIds(projectData?.previews.map(({ imageId }) => imageId) ?? []);
    };

    const addLink = (formData: FormData) => {
      const newLink: SelectedLink = {
        title: formData.get('linkTitle')?.toString() as string,
        subtitle: formData.get('linkSubtitle')?.toString() as string,
        url: formData.get('linkURL')?.toString() as string,
      };

      setLinks((previousState) => [...previousState, newLink]);
    };

    const deleteLink = (url: string) => {
      setLinks((previousData) =>
        previousData.filter((data) => data.url !== url),
      );
    };

    const addTech = (id: number) => {
      setTechIds((previousData) => [...previousData, id]);
    };

    const deleteTech = (id: number) => {
      setTechIds((previousData) => previousData.filter((_id) => _id !== id));
    };

    const addPreview = (id: number) => {
      setPreviewIds((previousData) => [...previousData, id]);
    };

    const deletePreview = (id: number) => {
      setPreviewIds((previousData) => previousData.filter((_id) => _id !== id));
    };

    return (
      <form
        className="mt-12 space-y-4"
        action={formSubmitHandler}
        onReset={formResetHandler}
        ref={ref}
        {...props}
      >
        {projectData && (
          <input type="hidden" value={projectData.id} name="id" />
        )}
        {/* title & finished date */}
        <div className="flex justify-between gap-8">
          <FormGrouping title="Title" required>
            <Input
              type="text"
              title="Title"
              placeholder="Title"
              name="title"
              disabled={disabled}
              required
              value={formState.title}
              onChange={formStateChange}
            />
          </FormGrouping>

          <FormGrouping title="Finished at">
            <Input
              type="date"
              title="Finished at"
              placeholder="Finished at"
              name="finished_at"
              disabled={disabled}
              value={formState.finished_at.toString()}
              onChange={formStateChange}
            />
          </FormGrouping>
        </div>

        {/* subtitle */}
        <FormGrouping title="Subtitle" required>
          <Input
            type="text"
            title="Subtitle"
            placeholder="Subtitle"
            name="subtitle"
            disabled={disabled}
            required
            value={formState.subtitle}
            onChange={formStateChange}
          />
        </FormGrouping>

        {/* label & status */}
        <div className="flex justify-between gap-8">
          <FormGrouping title="Label" required tag="div">
            <Select.Root
              name="label"
              required
              value={formState.label}
              onValueChange={(value) => formStateChange('label', value)}
              disabled={disabled}
            >
              <Select.Trigger>
                <Select.Value placeholder="Label" />
              </Select.Trigger>
              <Select.Content>
                {Object.keys(ProjectLabel).map((label) => (
                  <Select.Item key={label} value={label}>
                    {label.charAt(0).toUpperCase() + label.slice(1)} Project
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </FormGrouping>

          <FormGrouping title="Status" required tag="div">
            <Select.Root
              name="status"
              defaultValue="draft"
              required
              value={formState.status}
              onValueChange={(value) => formStateChange('status', value)}
              disabled={disabled}
            >
              <Select.Trigger>
                <Select.Value placeholder="Status" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="draft">Drafted</Select.Item>
                <Select.Item value="published">Published</Select.Item>
                <Select.Item value="archived">Archived</Select.Item>
              </Select.Content>
            </Select.Root>
          </FormGrouping>
        </div>

        {/* description */}
        <FormGrouping title="Description">
          <Textarea
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={formStateChange}
            disabled={disabled}
          />
        </FormGrouping>

        {/* links & tech */}
        <div className="flex justify-between gap-8">
          <FormGrouping title="Link" tag="div">
            {!!links.length && (
              <ul className="space-y-3 py-2">
                {links.map(({ title, subtitle, url }) => (
                  <li
                    key={url}
                    className="flex items-center rounded-lg border border-zinc-700 px-5 py-3"
                  >
                    <div className="flex w-full flex-col gap-0">
                      <div className="flex items-center gap-2">
                        <Text tag="p">{title}</Text>
                        <Text tag="muted">{subtitle}</Text>
                      </div>

                      <Button
                        variant="link"
                        className="h-fit w-fit p-0 text-sm opacity-70"
                        asChild
                      >
                        <a href={url} target="_blank">
                          {url}
                        </a>
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-fit w-fit p-1 disabled:invisible"
                      disabled={disabled}
                      onClick={() => deleteLink(url)}
                    >
                      <IoMdClose className="text-xl" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={disabled}
                >
                  <IoMdAdd className="mr-2 text-lg" />
                  Add
                </Button>
              </Dialog.Trigger>

              <Dialog.Content>
                <Dialog.Title hidden>Add link</Dialog.Title>
                <Dialog.Description hidden>
                  For add new link on project
                </Dialog.Description>

                <form className="space-y-4" action={addLink}>
                  <Dialog.Header>
                    <Text tag="h2">Add link</Text>
                  </Dialog.Header>

                  <div className="flex justify-between gap-8">
                    <FormGrouping title="Title" titleSize="sm" required>
                      <Input
                        type="text"
                        placeholder="Title"
                        name="linkTitle"
                        required
                      />
                    </FormGrouping>

                    <FormGrouping title="Subtitle" titleSize="sm" required>
                      <Input
                        type="text"
                        placeholder="Subtitle"
                        name="linkSubtitle"
                        required
                      />
                    </FormGrouping>
                  </div>

                  <FormGrouping title="URL" titleSize="sm" required>
                    <Input
                      type="text"
                      placeholder="URL"
                      name="linkURL"
                      required
                    />
                  </FormGrouping>

                  <Dialog.Footer>
                    <Dialog.Close asChild>
                      <Button variant="secondary" type="reset">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <Button type="submit">Add</Button>
                    </Dialog.Close>
                  </Dialog.Footer>
                </form>
              </Dialog.Content>
            </Dialog.Root>
          </FormGrouping>

          <FormGrouping title="Tech" tag="div" required>
            {!!techIds.length && (
              <ul className="flex flex-wrap gap-2 py-2">
                {techs.selected.map(({ id, media }) => (
                  <li
                    key={id}
                    className="group relative size-14 gap-6 overflow-hidden rounded-full bg-zinc-300 p-2"
                  >
                    <Button
                      type="button"
                      size="icon"
                      className="debug absolute left-0 top-0 z-10 h-full w-full opacity-0 transition-opacity duration-300 disabled:invisible group-hover:opacity-90"
                      disabled={disabled}
                      onClick={() => deleteTech(id)}
                    >
                      <IoMdClose className="text-3xl" />
                    </Button>

                    <img src={media.url} alt="" />
                  </li>
                ))}
              </ul>
            )}

            <Select.Root
              onValueChange={(value) => addTech(parseInt(value))}
              value=""
              disabled={disabled || Boolean(!techs.unselected.length)}
            >
              <Select.Trigger>Tech</Select.Trigger>
              <Select.Content>
                {techs.unselected.map((tech) => (
                  <Select.Item key={tech.id} value={tech.id.toString()}>
                    {tech.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </FormGrouping>
        </div>

        {/* cover */}
        <FormGrouping title="Cover" tag="div" required>
          <Select.Root
            name="coverId"
            onValueChange={(value) => setCoverId(parseInt(value))}
            value={coverId?.toString() ?? ''}
            disabled={disabled}
            required
          >
            <Select.Trigger>
              <Select.Value placeholder="Cover" />
            </Select.Trigger>

            <Select.Content>
              {mediaData.map((media) => (
                <Select.Item key={media.id} value={media.id.toString()}>
                  {media.title}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          {coverUrl && (
            <ImgPreview className="!mt-4 inline-block" src={coverUrl} alt="" />
          )}
        </FormGrouping>

        {/* preview */}
        <FormGrouping title="Preview" tag="div" required>
          <Select.Root
            onValueChange={(value) => addPreview(parseInt(value))}
            disabled={disabled}
            value=""
          >
            <Select.Trigger>
              <Select.Value placeholder="Preview" />
            </Select.Trigger>

            {!!previews.unselected.length && (
              <Select.Content>
                {previews.unselected.map((media) => (
                  <Select.Item key={media.id} value={media.id.toString()}>
                    {media.title}
                  </Select.Item>
                ))}
              </Select.Content>
            )}
          </Select.Root>

          {!!previews.selected.length && (
            <ul className="grid auto-rows-auto grid-cols-2 gap-4 py-2">
              {previews.selected.map((preview) => (
                <li key={preview.id} className="relative">
                  <button
                    className="absolute right-2 top-2 z-10 rounded-full p-1 text-2xl transition-colors duration-300 hover:bg-white hover:text-black disabled:invisible"
                    type="button"
                    onClick={() => deletePreview(preview.id)}
                    disabled={disabled}
                  >
                    <IoMdClose />
                  </button>

                  <ImgPreview src={preview.url} alt="" />
                </li>
              ))}
            </ul>
          )}
        </FormGrouping>
      </form>
    );
  },
);

export default ProjectForm;
