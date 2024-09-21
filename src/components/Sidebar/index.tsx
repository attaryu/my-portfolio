import { FaNewspaper } from 'react-icons/fa6';
import { MdPermMedia, MdSpaceDashboard } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';

import Link from 'next/link';
import Button from '../shadcn-ui/Button';
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
          title: 'Project',
          link: '/admin/content/projects',
        },
        {
          title: 'Link',
          link: '/admin/content/links',
        },
        {
          title: 'Tech',
          link: '/admin/content/techs',
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
    <nav className="flex h-dvh w-1/4 flex-col border-r border-r-zinc-800 p-6">
      <img
        src="/logo/ma.svg"
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
