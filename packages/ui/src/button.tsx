"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    // <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
    //   {children}
    // </button>
    <button
    onClick={onClick}
    className="px-6 py-2 rounded-full cursor-pointer bg-gray-800 text-white shadow-md text-[15px] tracking-wider uppercase transition-all ease-linear duration-500 hover:tracking-widest hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-500 active:translate-y-2 active:shadow-none mb-2"
  >
    {children}
  </button>

  );
};
