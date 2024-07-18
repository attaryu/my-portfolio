type Props = {
  children: React.ReactNode
}

export default function layout({ children }: Readonly<Props>) {
  return (
    <>{children}</>
  )
}