interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any,
  className?: string,
  href?: string,
  primary?: boolean,
  secondary?: boolean,
  target?: string,
}

export default function Button({
  children,
  className,
  primary,
  secondary,
  href,
  ...attribute
}: Props) {
  let baseStyling = 'py-3 px-6 h-fit flex items-center rounded-full gap-3 text-xl';

  if (primary) {
    baseStyling += ' bg-zinc-900 text-white'
  } else if (secondary) {
    baseStyling += ' border border-zinc-900'
  }

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyling} ${className ?? ''}`}
        {...attribute as React.AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {children}
      </a>
    );  
  }
  
  return (
    <button
      className={`${baseStyling} ${className ?? ''}`}
      {...attribute}
    >
      {children}
    </button>
  );
}