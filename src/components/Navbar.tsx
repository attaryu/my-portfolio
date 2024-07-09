export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-2 px-8 fixed top-0 max-w-widhest w-full h-fit z-10 sm:px-20">
      <img src="/logo/ma-light.svg" alt="" className="size-11" />

      <p className="font-neue-montreal-medium hidden sm:block">M Attar</p>

      <button>[ Menu ]</button>
    </nav>
  );
}
