import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/shadcn-ui/toaster';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="w-full p-8">{children}</div>
      </div>

      <Toaster />
    </>
  );
}
