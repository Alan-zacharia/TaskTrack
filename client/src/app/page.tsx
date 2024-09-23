"use client";
import SideBar from "./components/sidebar/Sidebar";

import NavBar from "./components/shared/NavBar";
import Tasks from "./components/task/Tasks";
import { useEffect, useState } from "react";
import axiosInstance from "./api/axios";
import withAuth from "./hooks/withAuth";
import useAuth from "./utils/useAuth";
import { useRouter } from "next/navigation";
import Loading from "./components/shared/Loading";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {

      axiosInstance
      .get("http://localhost:4000/api/tasks")
      .then(() => {})
      .catch((error) => {
        console.log("Error in get ", error);
      });

  }, []);

  if (loading) {
    return <Loading />;
  }

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
};
export default withAuth(Home);
