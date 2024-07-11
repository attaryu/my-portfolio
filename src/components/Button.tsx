interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  className?: string;
  href?: string;
  primary?: boolean;
  secondary?: boolean;
  target?: string;
}

export default function Button({
  children,
  className,
  primary,
  secondary,
  href,
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
      <a
        className={styling}
        {...(otherAttributes as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={styling} {...otherAttributes}>
      {children}
    </button>
  );
}
