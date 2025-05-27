"use client";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between flex-wrap bg-slate-500 py-1 pt-[5px] lg:py-4 lg:px-12 shadow border-solid border-t-2 border-blue-900">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 pb-2 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <span className="font-semibold text-xl tracking-tight text-slate-200">
            Class-A-Camp-W
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            id="nav"
            className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700 lg:hidden"
            aria-label="Open Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8 ${
          menuOpen ? "block" : "hidden"
        } lg:block transition-all duration-200`}
      >
        <div className="text-md font-bold lg:flex-grow">
          <button
            type="button"
            className="block lg:inline-block mt-4 lg:mt-0 text-slate-800 px-4 py-2 rounded hover:text-white hover:bg-slate-950 mr-2"
          >
            Menu 1
          </button>
          <button
            type="button"
            className="block lg:inline-block mt-4 lg:mt-0 text-slate-800 px-4 py-2 rounded hover:text-white hover:bg-slate-950 mr-2"
          >
            Menu 2
          </button>
          <button
            type="button"
            className="block lg:inline-block mt-4 lg:mt-0 text-slate-800 px-4 py-2 rounded hover:text-white hover:bg-slate-950 mr-2"
          >
            Menu 3
          </button>
        </div>

        <div className="flex">
          <Link
            href="/register"
            className="block text-md px-4 py-2 rounded text-slate-200 ml-2 font-bold hover:bg-slate-950 mt-4 lg:mt-0"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="block text-md px-4 ml-2 py-2 rounded text-slate-200 font-bold hover:bg-slate-950 mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
