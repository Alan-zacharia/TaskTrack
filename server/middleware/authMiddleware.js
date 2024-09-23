import envConfiguredDatas from "../config/envConfig.js";
import {
    userModel
} from "../models/userModel.js";
import {
    jwtVerifyToken
} from "../utils/jwtUtils.js";

const authMiddleware = async (req, res, next) => {
    const autheHeader = req.headers.authorization;
    if (autheHeader) {
        const token = autheHeader.split(" ")[1];
        const {
            decode,
            message
        } = jwtVerifyToken(token, envConfiguredDatas.JWT_SECRET_KEY);
        if (decode) {
            try {
                const user = await userModel.findById(decode.userId);
                if (user) {
                    req.userId = user._id
                    next()
                }
            } catch (error) {
                console.log("Error fetching user:", error.message);
                res.status(404).json({
                    message: "User not found."
                })
            }
        } else {
            console.log("JWT Verification Error:", message);
            return res.status(401).json({
                message
            });
        }
    } else {
        return res
            .status(401)
            .json({
                message: "You are not authenticated!"
            });
    }

}
export default authMiddleware;