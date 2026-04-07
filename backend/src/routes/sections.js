import express from "express"
import { getSectionsByGuideId, createSection, updateSection, deleteSection } from "../controllers/sectionsController.js";

const router = express.Router()

router.get("/guide/:guideId", getSectionsByGuideId);

router.post("/", createSection);

router.put("/:id", updateSection);

router.delete("/:id", deleteSection);

export default router;