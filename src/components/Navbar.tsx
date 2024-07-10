export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-2 md:py-4 px-8 fixed top-0 max-w-widhest w-full h-fit z-10 md:px-20">
      <img src="/logo/ma-light.svg" alt="" className="size-11 md:size-12" />

      <p className="font-neue-montreal-medium hidden md:block md:text-xl">M Attar</p>

      <button className="md:text-xl">[ Menu ]</button>
    </nav>
  );
}
