import express from "express";
import { getGuideByCategoryId, createGuide, updateGuide, getGuideById, deleteGuide } from '../controllers/guidesController.js';

const router = express.Router();

router.get("/category/:categoryId", getGuideByCategoryId);

router.get("/:id", getGuideById);

router.post("/", createGuide);

router.put("/:id", updateGuide);

router.delete("/:id", deleteGuide);

export default router;