"use client";
import SideBar from "./components/sidebar/Sidebar";

import NavBar from "./components/shared/NavBar";
import Tasks from "./components/task/Tasks";
import { useEffect } from "react";
import axiosInstance from "./api/axios";

export default function Home() {
  useEffect(()=>{
    axiosInstance.get("http://localhost:4000/api/tasks").then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  },[]);
  
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
