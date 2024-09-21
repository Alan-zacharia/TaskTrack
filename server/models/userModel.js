import mongoose from "mongoose";
import  bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps : true});

userSchema.pre("save",  function (next){
    try {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    } catch (error) {
        next(error)
    }
})
export const userModel = mongoose.model("users", userSchema);
