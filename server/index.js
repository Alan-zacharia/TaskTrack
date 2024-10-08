import express from "express";
import dbConfig from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import envConfiguredDatas from "./config/envConfig.js";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
app.use("/api/", userRouter);
app.use("/api/tasks", taskRouter);

app.use(errorHandler)
dbConfig();

app.listen(envConfiguredDatas.SERVER_PORT, () => {
    console.log(`Server running on port ${envConfiguredDatas.SERVER_PORT}!`)
})