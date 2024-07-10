import { MdArrowUpward, MdShare } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between bg-zinc-900 px-8 py-5 text-zinc-100 md:px-20">
      <button className="flex items-center gap-2 text-lg lg:text-xl">
        <span className="hidden md:inline">Back to top</span>
        <MdArrowUpward />
      </button>

      <p className="text-sm lg:text-base">&copy;2024 All rights reserved.</p>

      <button className="flex items-center gap-2 text-lg lg:text-xl">
        <span className="hidden md:inline">Share</span>
        <MdShare />
      </button>
    </footer>
  );
}
