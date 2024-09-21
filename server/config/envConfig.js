import dotenv from "dotenv";
dotenv.config();

const envConfiguredDatas = {
    SERVER_PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY : process.env.JWT_REFRESH_SECRET_KEY,
    ORIGIN_URL : process.env.ORIGIN_URL
}

export default envConfiguredDatas;