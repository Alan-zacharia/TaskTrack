"use client";
import { Input } from "@/components/ui/input";
import SideBar from "./components/sidebar/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import NavBar from "./components/shared/NavBar";
import Tasks from "./components/task/Tasks";

export default function Home() {
  return (
    <main className="relative overflow-auto lg:overflow-hidden h-screen">
      <NavBar />
      <div className="flex flex-col md:flex-row h-full">
        <SideBar />
        <section className="mt-4 mb-20 mx-4 flex-1 p-4 md:p-10 bg-white">
          <Tasks />
        </section>
      </div>
    </main>
  );
}
