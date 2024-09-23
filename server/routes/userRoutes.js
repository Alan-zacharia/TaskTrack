import {
    Router
} from "express";
import {
    loginUserController,
    registerUserController,
    refreshTokenController,
    logoutUserController
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUserController)
userRouter.post("/login", loginUserController)
userRouter.post("/auth/refresh",refreshTokenController)
userRouter.post("/auth/logout",logoutUserController)

export default userRouter;