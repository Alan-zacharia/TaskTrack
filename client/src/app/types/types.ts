export interface UserCredentialType {
  username: string;
  email: string;
  password: string;
}

export interface TaskType {
  _id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  createdAt: string;
}

export interface getTaskApiType {
  tasks: TaskType[];
}
export interface TaskProps {
  tasks: TaskType[];
}
export interface TaskUpdateType {
  title: string;
  dueDate: string;
}
export interface UpdateTaskApiType {
  message: string;
}
export interface getTaskStatsApiType {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export interface StatisticsData {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}
