import { MdDashboard } from "react-icons/md";
import { IoStatsChartSharp  } from "react-icons/io5";

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
];