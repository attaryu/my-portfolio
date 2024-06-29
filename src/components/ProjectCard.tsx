import React from "react";
import { MdNorthEast, MdOpenInFull } from 'react-icons/md';

export default function ProjectCard() {
  return (
    <div className="relative w-full aspect-[16/7.5] bg-zinc-300 flex flex-col rounded-3xl p-8 overflow-hidden text-zinc-100">
      {/* background image */}
      <img src="https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full absolute top-0 left-0 object-cover brightness-[0.3]" />

      <button className="self-end p-3 border border-zinc-100 rounded-full text-2xl z-10">
        <MdNorthEast />
      </button>

      <div className="mt-auto flex justify-between items-end gap-32 z-10">
        <div>
          <h3 className="font-tusker-grotesk-medium text-6xl">UBOOK</h3>
          <p className="text-lg mt-3">Bookmarking your real life books, or digital books</p>
        </div>

        <button className="py-3 px-6 h-fit border border-zinc-100 flex items-center rounded-full gap-3 text-xl">
          Detail <MdOpenInFull />
        </button>
      </div>
    </div>
  );
}
