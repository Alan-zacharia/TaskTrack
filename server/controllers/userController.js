import {
    userModel
} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {
    jwtGenerateToken,
    jwtGenerateTokens,
    jwtVerifyToken
} from "../utils/jwtUtils.js";
import {
    setAuthTokenCookie
} from "../utils/cookieUtils.js";
import envConfiguredDatas from "../config/envConfig.js";

const loginUserController = async (req, res, next) => {
    console.log("Login user Controller.......")
    const {
        credentials
    } = req.body;
    try {
        const {
            email,
            password
        } = credentials;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields."
            })
        }
        const user = await userModel.findOne({
            email
        });
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }
        const {
            generatedAccessToken,
            generatedRefreshToken
        } = jwtGenerateTokens(user._id);
        setAuthTokenCookie(res, "refreshToken", generatedRefreshToken)
        return res.status(200).json({
            message: "Login successfull.",
            user: {
                email: user.email,
                name: user.name,
            },
            token: generatedAccessToken
        })
    } catch (error) {
        next(error)
    }
}
const registerUserController = async (req, res, next) => {
    const {
        credentials
    } = req.body;
    try {
        const {
            email,
            username,
            password
        } = credentials;
        if (!email || !username || !password) {
            return res.status(400).json({
                message: "Please fill in all feilds"
            });
        }
        const user = await userModel.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                message: "User already exists."
            })
        }
        const newUser = new userModel({
            username,
            email,
            password
        })
        await newUser.save();
        return res.status(201).json({
            message: "User Created successfully."
        })

    } catch (error) {
        next(error)
    }
}
const refreshTokenController = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(402).json({
            message: 'No refresh token provided'
        });
    }
    const decoded = jwtVerifyToken(refreshToken, envConfiguredDatas.JWT_REFRESH_SECRET_KEY);
    if (!decoded) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
    try {
        const accessToken = jwtGenerateToken(decoded.userId);
        return res.status(200).json({token : accessToken})
    } catch (error) {
        next(error)
    }
}

export {
    registerUserController,
    loginUserController,
    refreshTokenController
}