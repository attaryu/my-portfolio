import { MdArrowUpward, MdShare } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="w-full flex justify-between items-center py-5 px-8 md:px-20 bg-zinc-900 text-zinc-100">
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
