import { ThemeProvider } from '@/components/shadcn-ui/ThemeProvider'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>
  )
}