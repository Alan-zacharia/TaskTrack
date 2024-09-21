import { MdDashboard } from "react-icons/md";
import { IoStatsChartSharp , IoSettingsSharp } from "react-icons/io5";

export const SIDEBAR_NAVIGATIONS = [
    {
        title : "Dashboard",
        icon : <MdDashboard/>,
        path : "/",
    },
    {
        title : "Statistics",
        icon : <IoStatsChartSharp/>,
        path : "/statistics",
    },
    {
        title : "Settings",
        icon : <IoSettingsSharp/>,
        path : "/settings",
    },
];