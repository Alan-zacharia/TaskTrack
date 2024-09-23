"use client";

import { SIDEBAR_NAVIGATIONS } from "@/app/constants/navigation";
import useLogout from "@/app/hooks/useLogout";
import { usePathname } from "next/navigation";
import { RiLogoutBoxRFill } from "react-icons/ri";

const SideBar = () => {
  const pathname = usePathname();
  const logout = useLogout();
  const handleLogout = async () => {
    await logout("Logout successfull...");
  };
  return (
    <section>
      <div className="lg:flex lg:w-[250px] w-full h-full bg-white shadow-lg p-5 pt-16 hidden">
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
          <li
            className={"mb-4 hover:text-red-700 font-semibold cursor-pointer"}
          >
            <div className="flex gap-2 items-center" onClick={handleLogout}>
              <span className="text-xl">
                <RiLogoutBoxRFill />
              </span>
              <span className="text-[15px]">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
