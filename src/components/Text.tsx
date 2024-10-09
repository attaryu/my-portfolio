import React from 'react';

type Type =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'label'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

type Props = {
  tag: Type;
  styling?: Type;
  children: any;
};

export default function Text({
  tag,
  styling = tag,
  children,
}: Readonly<Props>) {
  let Tag: React.ElementType = tag as React.ElementType;
  let className: string;

  switch (tag) {
    case 'large':
    case 'lead':
    case 'muted':
      Tag = 'p';
  }

  switch (styling) {
    case 'h1':
      className =
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';
      break;
    case 'h2':
      className =
        'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0';
      break;
    case 'h3':
      className = 'scroll-m-20 text-2xl font-semibold tracking-tight';
      break;
    case 'h4':
      className = 'scroll-m-20 text-xl font-semibold tracking-tight';
      break;
    case 'lead':
      className = 'text-xl text-muted-foreground';
      break;
    case 'large':
      className = 'text-lg font-semibold';
      break;
    case 'small':
      className = 'text-sm font-medium leading-none';
      break;
    case 'muted':
      className = 'text-sm opacity-70';
      break;
    default:
      className = 'leading-7';
  }

  return <Tag className={className}>{children}</Tag>;
}
