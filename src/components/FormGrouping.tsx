import React from 'react';
import Text from './Text';

interface Props {
  title: string;
  tag?: 'label' | 'div';
  titleSize?: 'base' | 'sm';
  required?: boolean;
  children: React.ReactNode;
}

export default function FormGrouping({
  title,
  tag = 'label',
  titleSize = 'base',
  children,
  required,
}: Readonly<Props>) {
  const Tag: React.ElementType = tag
  
  return (
    <Tag className="inline-block w-full space-y-2">
      <Text tag="p" styling={titleSize === 'base' ? 'lead' : 'p'}>
        {title} {required && <span className="text-red-400">*</span>}
      </Text>

      {children}
    </Tag>
  );
}
