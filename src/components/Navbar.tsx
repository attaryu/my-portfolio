export default function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex h-fit w-full max-w-widhest items-center justify-between px-8 py-2 md:px-20 md:py-4 md:text-xl lg:text-2xl xl:text-xl xl:py-2">
      <img
        src="/logo/ma-light.svg"
        alt=""
        className="size-11 md:size-12 lg:size-14"
      />

      <p className="hidden font-neue-montreal-medium md:block">
        M Attar
      </p>

      <button>[ Menu ]</button>
    </nav>
  );
}
