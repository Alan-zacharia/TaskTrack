import dotenv from "dotenv";
dotenv.config();

const envConfiguredDatas = {
    SERVER_PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST,
}

export default envConfiguredDatas;