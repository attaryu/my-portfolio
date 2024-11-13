'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { Button } from '../shadcn-ui/button';

type Props = {
  title: string;
  link: string | Props[];
  icon?: JSX.Element;
};

export default function LinkItem({ title, icon, link }: Readonly<Props>) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (typeof link === 'string') {
    return (
      <li key={title}>
        <Button
          className="w-full p-0"
          variant={pathname === link ? 'default' : 'ghost'}
        >
          <Link
            href={link}
            className="inline-flex h-full w-full items-center justify-start gap-3 p-3"
          >
            {icon && <span className="text-lg">{icon}</span>}
            {title}
          </Link>
        </Button>
      </li>
    );
  }

  return (
    <li key={title}>
      <Button
        className="w-full p-0"
        variant="ghost"
        onClick={() => setOpen(!open)}
      >
        <div className="inline-flex h-full w-full items-center justify-start gap-3 p-3">
          {icon && <span className="text-lg">{icon}</span>}

          {title}

          <IoIosArrowDown className={`ml-auto ${open && 'rotate-180'}`} />
        </div>
      </Button>

      {open && (
        <div className="flex gap-2.5 pl-5">
          <div className="w-0.5 rounded-full bg-zinc-800" />

          <ul className="w-full">
            {link.map((sublink) => (
              <LinkItem
                key={sublink.title}
                title={sublink.title}
                link={sublink.link}
                icon={sublink.icon}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
