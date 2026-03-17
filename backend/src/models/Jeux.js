import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },   
}, { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;