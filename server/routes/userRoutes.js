import {
    Router
} from "express";
import {
    loginUserController,
    registerUserController,
    refreshTokenController
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUserController)
userRouter.post("/login", loginUserController)
userRouter.post("/auth/refresh",refreshTokenController)

export default userRouter;