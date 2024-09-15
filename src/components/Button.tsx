import Link from 'next/link';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  className?: string;
  href?: string;
  primary?: boolean;
  secondary?: boolean;
  target?: string;
  'data-hover-scale'?: number;
}

export default function Button({
  children,
  className,
  primary,
  secondary,
  href,
  target,
  ...otherAttributes
}: Readonly<Props>) {
  let styling =
    'flex h-fit cursor-pointer items-center justify-center gap-3 rounded-full px-4 py-2 md:px-6 md:py-3 md:text-xl lg:text-2xl xl:gap-4 ';

  if (primary) {
    styling += 'bg-zinc-900 text-white ';
  } else if (secondary) {
    styling += 'border border-zinc-900 ';
  }

  styling += className;

  if (href) {
    return (
      <Link
        className={styling}
        href={href}
        target={target}
        data-hover
        data-hover-scale={otherAttributes['data-hover-scale'] ?? 3.2}
        {...(otherAttributes as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styling}
      data-hover
      data-hover-scale={otherAttributes['data-hover-scale'] ?? 3.2}
      {...otherAttributes}
    >
      {children}
    </button>
  );
}
