"use client";
import SideBar from "./components/sidebar/Sidebar";
import NavBar from "./components/shared/NavBar";
import Tasks from "./components/task/Tasks";
import { useEffect, useState } from "react";
import withAuth from "./hooks/withAuth";
import useAuth from "./utils/useAuth";
import Loading from "./components/shared/Loading";
import { io } from "socket.io-client";
import { StatisticsData, TaskType } from "./types/types";
import { getTaskApi, getTaskStatsApi } from "./utils/api";
import TaskStatistics from "./components/stats/Statistic";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [view, setView] = useState<"dashboard" | "statistics">("dashboard");
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTaskApi();
        setTasks(res.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await getTaskStatsApi();
        setStatistics(res);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL);
    socketInstance.on("taskAdded", (data) => {
      setTasks((prevData) => [...prevData, data.newTask]);
      setStatistics(data.stats);
    });
    socketInstance.on("taskDeleted", (data) => {
      setTasks((prevTask) =>
        prevTask.filter((prev) => prev._id !== data.task._id)
      );
      setStatistics(data.stats);
    });
    socketInstance.on("taskUpdated", (data) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === data.updatedTask._id ? data.updatedTask : task
        )
      );
      setStatistics(data.stats);
    });
    return () => {
      socketInstance.off("taskAdded");
      socketInstance.off("taskDeleted");
      socketInstance.off("taskUpdated");
      socketInstance.disconnect();
    };
  }, []);

  const handleViewChange = (newView: "dashboard" | "statistics") => {
    setView(newView);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative overflow-auto lg:overflow-hidden h-screen">
      <NavBar onViewChange={handleViewChange} view={view}/>
      <div className="flex flex-col md:flex-row h-full">
        <SideBar onViewChange={handleViewChange} view={view} />
        <section className="mt-4 mb-20 mx-4 flex-1 p-4 md:p-10 bg-white">
          {view === "dashboard" ? (
            <Tasks tasks={tasks} />
          ) : (
            <TaskStatistics statistics={statistics} />
          )}
        </section>
      </div>
    </main>
  );
};
export default withAuth(Home);
