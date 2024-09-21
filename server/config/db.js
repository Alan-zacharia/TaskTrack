import mongoose from "mongoose";
import envConfiguredDatas from "./envConfig.js";

const dbConfig = async () => {
    try {
        await mongoose.connect(envConfiguredDatas.DB_HOST);
        console.log("Database connected successfully...");
    } catch (error) {
        console.log("Database connection error:", error.message);
        process.exit(1);
    }
};

export default dbConfig;