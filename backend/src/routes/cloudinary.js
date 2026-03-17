// routes/cloudinary.js (nouveau fichier)
import express from "express";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post("/delete", async (req, res) => {
  try {
    const { publicId, resourceType = "image" } = req.body;

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    res.status(200).json({ message: "Média supprimé" });
  } catch (error) {
    console.error("Erreur suppression Cloudinary:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;