import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    guideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide',
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    order: {
        type: Number,
        require: true,
    },
    stepsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Step',
        require: true,
    }]
}, { timestamps: true })

const Section = mongoose.model("Section", sectionSchema);

export default Section;