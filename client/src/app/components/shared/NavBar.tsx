"use client";

import React from "react";
import MobileSideBar from "../sidebar/MobileSidBar";

interface NavBarProps {
  onViewChange : (newView: "dashboard" | "statistics")=> void;
  view : "dashboard" | "statistics"
}
const NavBar : React.FC<NavBarProps>= ({onViewChange , view}) => {
  return (
    <nav className="w-full h-14 bg-indigo-600 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-white font-bold p-3 text-xl">TaskTrack</h1>
        <div className="lg:hidden">
          <MobileSideBar onViewChange={onViewChange} view={view}/>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
 