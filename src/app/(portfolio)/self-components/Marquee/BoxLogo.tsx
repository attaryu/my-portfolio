import { memo } from 'react';

interface Props extends React.HTMLAttributes<HTMLImageElement> {
  url: string;
  name: string;
}

function BoxLogo({ url, name, ...attributes }: Readonly<Props>) {
  return (
    <li>
      <img
        src={process.env.NEXT_PUBLIC_CMS_REQUEST_URL + url}
        alt={`${name} logo`}
        className="size-20 rounded-lg border border-zinc-900 p-4 md:size-28 lg:size-32 lg:rounded-xl lg:p-6 xl:size-40 xl:p-8"
        {...attributes}
      />
    </li>
  );
}

export default memo(BoxLogo)
