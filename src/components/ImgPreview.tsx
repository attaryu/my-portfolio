import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  message?: string;
  src: string;
  alt: string;
}

const ImgPreview = forwardRef<HTMLImageElement, Props>(
  ({ message, className, alt, ...props }, ref) => {
    return (
      <img
        data-error={message ?? 'The media was damaged :('}
        className={twMerge(
          'relative h-fit w-full rounded-lg border border-dashed border-zinc-600 p-1 before:absolute before:top-0 before:grid before:h-full before:w-full before:place-items-center before:bg-zinc-900 before:content-[attr(data-error)]',
          className,
        )}
        ref={ref}
        alt={alt}
        {...props}
      />
    );
  },
);

export default ImgPreview;
