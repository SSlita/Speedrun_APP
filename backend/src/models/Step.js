import mongoose from "mongoose";

const stepSchema = mongoose.Schema({
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        require: true,
    },
    order: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        default: '',
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
}, { timestamps: true })

const Step = mongoose.model("Step", stepSchema);

export default Step;