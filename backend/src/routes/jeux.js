import express from "express";
import { getAllGames, getGameById, addGame, deleteGame, updateGame } from "../controllers/jeuxController.js";

const router = express.Router();

router.get("/", getAllGames);

router.get("/:id", getGameById);

router.post("/", addGame);

router.delete("/:id", deleteGame);

router.put("/:id", updateGame);

export default router;