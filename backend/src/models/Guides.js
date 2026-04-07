import mongoose from "mongoose";

const guideSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, { timestamps: true });

const Guide = mongoose.model("Guide", guideSchema);

export default Guide;