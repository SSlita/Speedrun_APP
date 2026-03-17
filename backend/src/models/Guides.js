import mongoose from "mongoose";

const stepSchema = mongoose.Schema({
    order: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video', 'none'],
        default: 'none',
    },
    mediaUrl: {
        type: String,
        default: '',
    },
});

const guideSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    steps: [stepSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Guide = mongoose.model("Guide", guideSchema);

export default Guide;