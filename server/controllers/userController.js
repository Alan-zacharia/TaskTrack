import {
    userModel
} from "../models/userModel.js";
import bcrypt from "bcryptjs";

const loginUserController = async (req, res, next) => {
    console.log("Login user Controller.......")
    const {
        credentials
    } = req.body;
    try {
        const {email , password} = credentials;
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
        return res.status(200).json({
            message: "Login successfull.",
            user: {
                email: user.email,
                name: user.name,
            }
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
        const {email , username , password} = credentials;
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

export {
    registerUserController,
    loginUserController,
}