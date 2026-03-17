import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
    },
}, { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;