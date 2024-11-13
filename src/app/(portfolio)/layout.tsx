import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import Lenis from './Lenis';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Readonly<Props>) {
  return (
    <div className="${fontVariables} mx-auto max-w-widhest">
      <Lenis>
        <Loading />

        {/* <div className="root-container relative" id="top"> */}
        <div className="root-container relative h-svh overflow-hidden bg-white" id="top">
          <Navbar />
          {children}
          <Footer />
        </div>
      </Lenis>

      <Cursor />
    </div>
  );
}
