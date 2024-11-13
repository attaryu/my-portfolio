import Link from 'next/link';
import { FaNewspaper } from 'react-icons/fa6';
import { MdPermMedia, MdSpaceDashboard } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';

import { Button } from '../shadcn-ui/button';
import LinkItem from './LinkItem';

export default function Sidebar() {
  const links = [
    {
      title: 'Home',
      link: '/admin',
      icon: <MdSpaceDashboard />,
    },
    {
      title: 'Content',
      icon: <FaNewspaper />,
      link: [
        {
          title: 'Tech',
          link: '/admin/contents/techs',
        },
        {
          title: 'Project',
          link: '/admin/contents/projects',
        },
        {
          title: 'Link',
          link: '/admin/contents/links',
        },
      ],
    },
    {
      title: 'Media',
      link: '/admin/media',
      icon: <MdPermMedia />,
    },
  ];

  return (
    <nav className="sticky top-0 flex h-dvh w-1/4 flex-col border-r border-r-zinc-800 p-6">
      <img
        src="/assets/ma.svg"
        alt=""
        className="size-12 rounded-md bg-white p-2"
      />

      <ul className="mt-8 space-y-3">
        {links.map(({ title, link, icon }) => (
          <LinkItem key={title} title={title} link={link} icon={icon} />
        ))}
      </ul>

      <Button className="mt-auto p-0" variant="secondary">
        <Link
          href="/admin/login?action=log_out"
          className="inline-flex items-center gap-2"
        >
          <PiSignOutBold /> Logout
        </Link>
      </Button>
    </nav>
  );
}
