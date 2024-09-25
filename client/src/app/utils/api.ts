import axios from "axios";
import {
  getTaskApiType,
  getTaskStatsApiType,
  TaskType,
  TaskUpdateType,
  UpdateTaskApiType,
  UserCredentialType,
} from "../types/types";
import axiosInstance from "../api/axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.withCredentials = true;

export const loginUserApi = async (
  credentials: Partial<UserCredentialType>
): Promise<{token : string}> => {
  try {
    console.log(API_URL)
    const response = await axios.post(`${API_URL}/api/login`, {
      credentials,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const registerUserApi = async (
  credentials: UserCredentialType
): Promise<{message : string}> => {
  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      credentials,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTaskApi = async (
  taskData: Partial<TaskType>
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post("/api/tasks", { taskData });
    return response.data;
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const getTaskApi = async (): Promise<getTaskApiType> => {
  try {
    const response = await axiosInstance.get("/api/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTaskApi = async (
  taskId: string,
  taskDatas: TaskUpdateType
): Promise<UpdateTaskApiType> => {
  try {
    const response = await axiosInstance.patch(`/api/tasks/${taskId}`, {
      taskDatas,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskApi = async (
  taskId: string
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCompleteTaskApi = async (
  taskId: string
): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.put(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTaskStatsApi = async (): Promise<getTaskStatsApiType> => {
  try {
    const response = await axiosInstance.get(`/api/tasks/stats`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
