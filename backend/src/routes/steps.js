import express from "express"
import { createStep, deleteStep, getStepBySectionId, updateStep } from "../controllers/stepsController.js";

const router = express.Router();

router.get("/section/:sectionId", getStepBySectionId);

router.post("/", createStep);

router.put("/:id", updateStep);

router.delete("/:id", deleteStep);

export default router;