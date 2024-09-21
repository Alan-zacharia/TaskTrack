import {
    Router
} from "express";
import {
    addNewTaskController,
    deleteTaskController,
    editTaskController,
    getTaskController
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const taskRouter = Router();


taskRouter.get("/",authMiddleware, getTaskController);
taskRouter.post("/",authMiddleware, addNewTaskController);
taskRouter.patch("/:id",authMiddleware, editTaskController);
taskRouter.delete("/:id",authMiddleware, deleteTaskController);

export default taskRouter;