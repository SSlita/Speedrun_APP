import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI );
        console.log("Accès à la BDD");
    } catch (error) {
        console.log("Erreur lors de la conenxion à la BDD", error);
        process.exit(1); // 1 pour le fail et 0 pour réussite
    }
}