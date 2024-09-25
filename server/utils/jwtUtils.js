import jwt from "jsonwebtoken";
import envConfiguredDatas from "../config/envConfig.js";

export const jwtGenerateToken =  (userId) => {
    const payload = {
        userId: userId
    }
    return jwt.sign(payload, envConfiguredDatas.JWT_SECRET_KEY, {
        expiresIn: "1h"
    })
}
export const jwtGenerateRefreshToken = (userId) => {
    const payload = {
        userId: userId
    }
    return jwt.sign(payload, envConfiguredDatas.JWT_REFRESH_SECRET_KEY, {
        expiresIn: "7d"
    })
}
export const jwtVerifyToken = (token, secretKey) => {
    try {
        const decode = jwt.verify(token, secretKey);
        return {
            message: "Verified successfully",
            decode
        }
    } catch (error) {
        return {
            message: "Invalid token",
            decode: null
        }
    }
}

export const jwtGenerateTokens = (userId) => {
    const generatedAccessToken = jwtGenerateToken(userId);
    const generatedRefreshToken = jwtGenerateRefreshToken(userId);
    return {
        generatedAccessToken,
        generatedRefreshToken
    }
}