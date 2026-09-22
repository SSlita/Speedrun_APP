import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import gameRoute from './routes/jeux.js';
import categoryRoute from './routes/categories.js';
import guideRoute from './routes/guides.js';
import sectionRoute from './routes/sections.js';
import stepRoute from './routes/steps.js';

import cloudinaryRoute from './routes/cloudinary.js';

import { connectDB } from './config/db.js';
import uploadRoute from './routes/upload.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "*",
}));



app.use(express.json());

app.use("/covers", express.static("src/upload/covers"));
app.use("/guideImg", express.static("src/upload/guideImg"));
app.use("/videos", express.static("src/upload/videos"));

app.use("/api/jeux", gameRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/guides", guideRoute);
app.use("/api/sections", sectionRoute);
app.use("/api/steps", stepRoute);

app.use("/api/cloudinary", cloudinaryRoute);
app.use("/api/upload", uploadRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("ça marche sur le port: ", PORT);
    });
});
