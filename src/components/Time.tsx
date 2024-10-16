import type React from 'react';

import dayjs from 'dayjs';

interface Props extends React.TimeHTMLAttributes<HTMLTimeElement> {
  value: string | number | Date;
}

export default function Time({ value, ...props }: Readonly<Props>) {
  return (
    <time dateTime={dayjs(value).toISOString()} {...props}>
      {dayjs(value).format('MMMM D, YYYY')}
    </time>
  );
}
