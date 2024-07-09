import { MdArrowUpward, MdShare } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="w-full flex justify-between items-center p-5 xl:px-20 bg-zinc-900 text-zinc-100">
      <button className="flex items-center gap-2 text-lg">
        <span className="hidden xl:inline">Back to top</span>
        <MdArrowUpward />
      </button>

      <p className="text-sm">&copy;2024 All rights reserved.</p>

      <button className="flex items-center gap-2 text-lg">
        <span className="hidden xl:inline">Share</span>
        <MdShare />
      </button>
    </footer>
  );
}
