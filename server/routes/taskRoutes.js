import {
    Router
} from "express";
import {
    addNewTaskController,
    deleteTaskController,
    editTaskController,
    getTaskController,
    getTaskStatsController,
    updateTaskStatusController
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const taskRouter = Router();


taskRouter.get("/",authMiddleware, getTaskController);
taskRouter.get("/stats",authMiddleware, getTaskStatsController);
taskRouter.post("/",authMiddleware, addNewTaskController);
taskRouter.put("/:id",authMiddleware, updateTaskStatusController);
taskRouter.patch("/:id",authMiddleware, editTaskController);
taskRouter.delete("/:id",authMiddleware, deleteTaskController);

export default taskRouter;