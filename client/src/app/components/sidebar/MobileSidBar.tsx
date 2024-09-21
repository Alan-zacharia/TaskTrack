"use client";

import { SIDEBAR_NAVIGATIONS } from "@/app/constants/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { IoLogOut } from "react-icons/io5";

const MobileSideBar = () => {
  const pathname = usePathname();

  return (
    <section>
      <Sheet key={"right"}>
        <SheetTrigger asChild>
          <button className="lg:hidden ">
            <GiHamburgerMenu />
          </button>
        </SheetTrigger>

        <SheetContent className="w-[250px] h-full bg-white text-black shadow-lg p-5 pt-16" side={"left"}>
          <ul className="text-black p-4 flex flex-col gap-4">
            {SIDEBAR_NAVIGATIONS.map((item, index) => (
              <li
                key={index}
                className={`mb-4 hover:text-indigo-700 font-semibold cursor-pointer ${
                  pathname === item.path ? "text-indigo-700" : ""
                }`}
              >
                <div className="flex gap-2 items-center">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[15px]">{item.title}</span>
                </div>
              </li>
            ))}
            <li className="mb-4 hover:text-red-700 font-semibold cursor-pointer">
              <div className="flex gap-2 items-center">
                <span className="text-xl"><IoLogOut /></span>
                <span className="text-[15px]">Logout</span>
              </div>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileSideBar;
