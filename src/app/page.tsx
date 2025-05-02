"use client"


import { DropdownSelector } from "./components/dropdown-selector";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[8px] row-start-2 items-center sm:items-start" id="main-page">
        <h2 className="text-purple-900 font-extrabold text-xl"> Morteza Hosseini </h2>
        <p className=" text-lg"> Front-End Developer </p>
        <p className="pb-2">mortezahosseini901@gmail.com</p>
        
        <DropdownSelector />
      </main>
    </div>
  );
}
