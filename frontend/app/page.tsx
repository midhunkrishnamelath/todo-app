"use client"; // Add this to make the component a client component

import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full ">
      <Header />
      <div
        className={`flex w-full h-[43rem] text-gray-100 text-4xl font-poppins items-center justify-center`}
      >
        TODO App
      </div>
    </div>
  );
}
