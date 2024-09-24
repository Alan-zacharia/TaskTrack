import { TaskProps } from "@/app/types/types";
import {
  addTaskApi,
  deleteTaskApi,
  updateCompleteTaskApi,
  updateTaskApi,
} from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditTaskModal from "./EditTaskModal";
import DeleteConfirmationModal from "./DeleteTaskModal";
import { toast } from "sonner";
import { getDateFunction, getTodayDate } from "@/app/utils/DateFunctions";
import { RiArrowDropDownLine } from "react-icons/ri";

const Tasks: React.FC<TaskProps> = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<{
    id: string;
    title: string;
    dueDate: string;
  } | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showOverdue, setShowOverdue] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const today = new Date().setHours(0, 0, 0, 0);

  const overdueTasks =
    tasks &&
    tasks
      .filter(
        (task) => new Date(task.dueDate).getTime() < today && !task.completed
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );

  const normalTasks =
    tasks &&
    tasks
      .filter(
        (task) => new Date(task.dueDate).getTime() >= today && !task.completed
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );

  const completedTasks =
    tasks &&
    tasks
      .filter((task) => task.completed)
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );

  const handleTaskEdit = (taskId: string) => {
    const taskToEdit = tasks && tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
      setCurrentTask({
        id: taskToEdit._id,
        title: taskToEdit.title,
        dueDate: taskToEdit.dueDate,
      });
      setIsModalOpen(true);
    }
  };

  const handleUpdateTask = async (updatedTask: {
    id: string;
    title: string;
    dueDate: string;
  }) => {
    try {
      await updateTaskApi(updatedTask.id, updatedTask);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleTaskDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
        await deleteTaskApi(taskToDelete);
        toast.success("Task deleted successfully.");
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleAddTask = async () => {
    setError(null);
    if (!newTaskTitle.trim()) {
      setError("Please add a task title.");
      return;
    }
    if (!newTaskDueDate) {
      setError("Please select a due date.");
      return;
    }
    try {
      const newTask = { title: newTaskTitle, dueDate: newTaskDueDate };
      const res = await addTaskApi(newTask);
      toast.success(res.message);
      setNewTaskTitle("");
      setNewTaskDueDate("");
    } catch (error) {
      console.log(error)
      setError("Failed to add task. Please try again.");
    }
  };

  const handleCheckboxChange = async (taskId: string) => {
    try {
      const res = await updateCompleteTaskApi(taskId);
      toast.success(res.message);
    } catch (error) {
      console.log(error)
      toast.error("Failed to update task status. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full text-black">
      <div className="flex md:flex-row items-center mb-5">
        <Input
          type="text"
          value={newTaskTitle}
          onChange={(e) => {
            setError("");
            setNewTaskTitle(e.target.value);
          }}
          placeholder="Task Title"
          className="mr-6 mt-2 md:mt-0 md:mr-5 text-black mb-2 md:mb-0"
        />
        <Input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => {
            setError("");
            setNewTaskDueDate(e.target.value);
          }}
          min={getTodayDate()}
          className="hidden lg:flex mr-6 mt-2 md:mt-0 md:mr-5 mb-2 md:mb-0 w-36"
        />
        <Button
          onClick={handleAddTask}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
        >
          Add Task
        </Button>
      </div>
      <Input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => {
            setError("");
            setNewTaskDueDate(e.target.value);
          }}
          min={getTodayDate()}
          className=" mr-6 mt-2 md:mt-0 md:mr-5 mb-2 md:mb-0 w-36"
        />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5">
        Tasks
      </h1>
      <div className="overflow-x-auto">
        <table className="table text-black mb-5 border-collapse">
          <thead>
            <tr className="text-base font-bold text-black border-gray-300">
              <th></th>
              <th>Task</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks && tasks.length < 1 && (
              <tr className="text-base text-gray-500 border-gray-300">
                <td colSpan={4} className="text-center">
                  No tasks available
                </td>
              </tr>
            )}

            {overdueTasks && overdueTasks.length > 0 && (
              <tr className="border-gray-200">
                <td
                  colSpan={2}
                  className="text-sm font-bold text-gray-600 gap-2 flex pt-6 pb-3"
                >
                  Overdue{" "}
                  <span className="text-gray-500">{overdueTasks.length}</span>
                  <RiArrowDropDownLine
                    size={25}
                    onClick={() => setShowOverdue(!showOverdue)}
                    style={{
                      transform: showOverdue
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            )}
            {showOverdue &&
              overdueTasks.map((item) => (
                <tr className="bg-red-50 border-gray-300" key={item._id}>
                  <td>
                    <Checkbox
                      onCheckedChange={() => handleCheckboxChange(item._id)}
                      checked={item.completed}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.title}
                      className="w-full bg-white text-black outline-none"
                      readOnly
                    />
                  </td>
                  <td>
                    <span
                      style={{ color: getDateFunction(item.dueDate).color }}
                      className="font-bold"
                    >
                      {getDateFunction(item.dueDate).displayDate}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-blue-500"
                      onClick={() => handleTaskEdit(item._id)}
                    >
                      <MdEdit size={22} />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleTaskDelete(item._id)}
                    >
                      <MdDelete size={22} />
                    </button>
                  </td>
                </tr>
              ))}

            {normalTasks.map((item) => (
              <tr key={item._id} className="bg-white border-gray-200">
                <td>
                  <Checkbox
                    onCheckedChange={() => handleCheckboxChange(item._id)}
                    checked={item.completed}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.title}
                    className="w-full bg-white text-black outline-none font-bold"
                    readOnly
                  />
                </td>
                <td>
                  <span
                    style={{ color: getDateFunction(item.dueDate).color }}
                    className="font-bold"
                  >
                    {getDateFunction(item.dueDate).displayDate}
                  </span>
                </td>
                <td>
                  <button
                    className="text-blue-500"
                    onClick={() => handleTaskEdit(item._id)}
                  >
                    <MdEdit size={22} />
                  </button>
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleTaskDelete(item._id)}
                  >
                    <MdDelete size={22} />
                  </button>
                </td>
              </tr>
            ))}
            {overdueTasks && overdueTasks.length > 0 && (
              <tr className="border-gray-200">
                <td
                  colSpan={2}
                  className="text-sm font-bold text-gray-600 gap-2 flex pt-6 pb-3"
                >
                  Completed{" "}
                  <span className="text-gray-500">{completedTasks.length}</span>
                  <RiArrowDropDownLine
                    size={25}
                    onClick={() => setShowCompleted(!showCompleted)}
                    style={{
                      transform: showCompleted
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            )}
            {showCompleted &&
              completedTasks.map((item) => (
                <tr
                  className="bg-gray-300 border-gray-300"
                  key={item._id}
                  style={{ opacity: 0.5 }}
                >
                  <td>
                    <Checkbox
                      onCheckedChange={() => handleCheckboxChange(item._id)}
                      checked={item.completed}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.title}
                      className="w-full bg-white text-black outline-none"
                      readOnly
                    />
                  </td>
                  <td>
                    <span
                      style={{ color: getDateFunction(item.dueDate).color }}
                      className="font-bold"
                    >
                      {getDateFunction(item.dueDate).displayDate}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => handleTaskDelete(item._id)}
                    >
                      <MdDelete size={22} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateTask}
        task={currentTask}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Tasks;
