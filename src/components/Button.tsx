import type { VariantProps } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariant = cva(
  'h-fit w-fit cursor-pointer rounded-full lg:text-2xl',
  {
    variants: {
      variant: {
        primary: 'bg-zinc-900 text-white',
        secondary: 'border border-zinc-900',
      },
      size: {
        normal:
          'flex items-center justify-center gap-3 px-4 py-2 md:px-6 md:py-3 md:text-xl lg:text-2xl xl:gap-4',
        icon: 'p-3.5 md:p-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'normal',
    },
  },
);

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariant> {
  asChild?: boolean;
  cursorHoverScale?: number;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { className, variant, size, asChild, cursorHoverScale, ...otherAttributes },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariant({ variant, size, className }))}
        ref={ref}
        data-hover
        data-hover-scale={cursorHoverScale ?? 3.2}
        {...otherAttributes}
      />
    );
  },
);

export default Button;
