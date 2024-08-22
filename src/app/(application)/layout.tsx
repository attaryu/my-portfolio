import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

type Props = {
  children: React.ReactNode
}

export default function layout({ children }: Readonly<Props>) {
  return (
    <>
      <Navbar />

      <div className="pt-14">
        {children}
      </div>

      <Footer />
    </>
  )
}