import {
    emitTasks
} from "../index.js";
import {
    taskModel
} from "../models/taskModel.js"

const getTaskController = async (req, res, next) => {
    console.log("Get tasks...")
    const userId = req.userId ? req.userId : null;
    try {

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required."
            })
        }
        const tasks = await taskModel.find({
            userId
        });
        return res.status(200).json({
            tasks: tasks.length > 0 ? tasks : []
        })
    } catch (error) {
        next(error)
    }
};

const addNewTaskController = async (req, res, next) => {
    const {
        taskData
    } = req.body;
    try {
        const {
            title,
            dueDate
        } = taskData
        const userId = req.userId ? req.userId : null;
        if (!userId) {
            return res.status(400).json({
                message: "User is required."
            })
        };
        const newTask = await taskModel.create({
            userId,
            title,
            dueDate
        });
        const stats = await statusCalculator(userId);
        emitTasks("taskAdded", {
            newTask,
            stats
        })
        return res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });
    } catch (error) {
        next(error)
    }
}
const editTaskController = async (req, res, next) => {
    const {
        taskDatas
    } = req.body;
    const userId = req.userId;
    try {
        const {
            title,
            dueDate
        } = taskDatas;
        const taskId = req.params.id;
        if (!taskId || !userId) {
            return res.status(400).json({
                message: "ID is required."
            })
        };
        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId, {
                title,
                dueDate
            }, {
                new: true
            });
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found."
            });
        }
        const stats = await statusCalculator(userId);
        emitTasks("taskUpdated", {
            updatedTask,
            stats
        });
        return res.status(200).json({
            message: "Task udated successfully",
            task: updatedTask
        });
    } catch (error) {
        next(error)
    }
}
const deleteTaskController = async (req, res, next) => {
    console.log("Delete task....")
    const taskId = req.params.id;
    const userId = req.userId;
    try {
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized."
            })
        }
        const task = await taskModel.findByIdAndDelete(
            taskId
        );
        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }
        const stats = await statusCalculator(userId);
        emitTasks("taskDeleted", {
            task,
            stats
        });
        return res.status(200).json({
            message: "Task deleted successfully",
            task
        });
    } catch (error) {
        next(error)
    }
}
const updateTaskStatusController = async (req, res, next) => {
    const taskId = req.params.id;
    const userId = req.userId;
    try {
        if (!taskId || !userId) {
            return res.status(400).json({
                message: "Id is required."
            })
        }
        const task = await taskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }
        task.completed = !task.completed
        const updatedTask = await task.save();
        const stats = await statusCalculator(userId);
        emitTasks("taskUpdated", {
            updatedTask,
            stats
        });
        return res.status(200).json({
            message: "Task updated..",
            task
        });
    } catch (error) {
        next(error)
    }
}
const getTaskStatsController = async (req, res, next) => {
    const userId = req.userId;
    try {
        if (!userId) {
            return res.status(400).json({
                message: "Task id is required."
            })
        }
        const {
            overdueTasks,
            completedTasks,
            totalTasks
        } = await statusCalculator(userId);
        return res.status(200).json({
            message: "Task updated..",
            overdueTasks,
            completedTasks,
            totalTasks
        });
    } catch (error) {
        next(error)
    }
}

const statusCalculator = async (userId) => {
    try {
        const tasks = await taskModel.find({
            userId
        });
        const completedTasks = tasks.filter(task => task.completed);
        const totalTasks = tasks.length;

        const currentDate = new Date();
        const overdueTasks = tasks.filter(task => task.dueDate && new Date(task.dueDate) < currentDate);

        return {
            totalTasks,
            completedTasks: completedTasks.length,
            overdueTasks: overdueTasks.length
        };
    } catch (error) {
        throw error;
    }
};


export {
    addNewTaskController,
    getTaskController,
    editTaskController,
    deleteTaskController,
    updateTaskStatusController,
    getTaskStatsController
}