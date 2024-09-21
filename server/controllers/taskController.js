import {
    taskModel
} from "../models/taskModel.js"

const getTaskController = async (req, res, next) => {
    const userId = req.user ? req.user.id : null;
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
        taskDatas
    } = req.body;
    try {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required."
            })
        };
        const newTask = await taskModel.create({
            userId,
            taskDatas
        });
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
    try {
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(400).json({
                message: "Task ID is required."
            })
        };
        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId, {
                taskDatas
            }, {
                new: true
            });
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found."
            });
        }
        return res.status(200).json({
            message: "Task udated successfully",
            task: updatedTask
        });
    } catch (error) {
        next(error)
    }
}
const deleteTaskController = async (req, res, next) => {
    const taskId = req.params.id;
    try {
        const task = await taskModel.findByIdAndDelete(
            taskId
        );
        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }
        return res.status(200).json({
            message: "Task deleted successfully",
            task
        });
    } catch (error) {
        next(error)
    }
}


export {
    addNewTaskController,
    getTaskController,
    editTaskController,
    deleteTaskController
}