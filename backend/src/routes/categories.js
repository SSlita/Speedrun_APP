import express from "express";
import { getAllCategories, getCategoryById, addCategory, deleteCategory, updateCategory } from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/game/:gameId", getAllCategories);

router.get("/:id", getCategoryById);

router.post("/", addCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

export default router;