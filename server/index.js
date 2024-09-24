import express from "express";
import http from "http";
import dbConfig from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import envConfiguredDatas from "./config/envConfig.js";
import cors from "cors";
import errorHandler from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import {
    Server
} from "socket.io";
import socketConfig from "./config/socketConfig.js";
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: `${envConfiguredDatas.ORIGIN_URL}`,
        methods: ["GET", "POST"],
    }
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: envConfiguredDatas.ORIGIN_URL,
    credentials: true
}));
app.use("/api/", userRouter);
app.use("/api/tasks", taskRouter);

app.use(errorHandler)
dbConfig();
socketConfig(io);

export const emitTasks = (event, task) => {
    io.emit(event, task);
}

server.listen(envConfiguredDatas.SERVER_PORT, () => {
    console.log(`Server running on port ${envConfiguredDatas.SERVER_PORT}!`);
})