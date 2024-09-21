"use client";

import MobileSideBar from "../sidebar/MobileSidBar";

const NavBar = () => {
  return (
    <nav className="w-full h-14 bg-indigo-600 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-white font-bold p-3 text-xl">TaskTrack</h1>
        <div className="lg:hidden">
          <MobileSideBar />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
 