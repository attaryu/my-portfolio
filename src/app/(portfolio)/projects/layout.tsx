type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return <div className="pt-14">{children}</div>;
}
