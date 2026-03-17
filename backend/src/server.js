import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import gameRoute from './routes/jeux.js';
import categoryRoute from './routes/categories.js';
import guideRoute from './routes/guides.js';
import cloudinaryRoute from './routes/cloudinary.js';

import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "http://localhost:5173",
}));



app.use(express.json());

app.use("/covers", express.static("src/upload/covers"));
app.use("/guideImg", express.static("src/upload/guideImg"));
app.use("/videos", express.static("src/upload/videos"));

app.use("/api/jeux", gameRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/guides", guideRoute);

app.use("/api/cloudinary", cloudinaryRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("ça marche sur le port: ", PORT);
    });
});