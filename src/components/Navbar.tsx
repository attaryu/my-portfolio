export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-1 px-20 fixed top-0 inset-y-0 max-w-widhest w-full h-fit z-10">
      <img src="/logo/ma-light.svg" alt="" className="size-12" />

      <p className="font-neue-montreal-medium">M Attar</p>

      <button>[ Menu ]</button>
    </nav>
  );
}
