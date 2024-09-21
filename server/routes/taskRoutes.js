import {
    Router
} from "express";
import {
    addNewTaskController,
    deleteTaskController,
    editTaskController,
    getTaskController
} from "../controllers/taskController.js";

const taskRouter = Router();


taskRouter.get("/", getTaskController);
taskRouter.post("/", addNewTaskController);
taskRouter.patch("/:id", editTaskController);
taskRouter.delete("/:id", deleteTaskController);

export default taskRouter;