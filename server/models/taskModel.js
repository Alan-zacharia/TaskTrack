import mongoose, {
    model
} from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    },

}, {
    timestamps: true
});

export const taskModel = new model("tasks", taskSchema);