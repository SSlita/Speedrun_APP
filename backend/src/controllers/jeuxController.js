import Jeux from '../models/Jeux.js';
import Category from '../models/Categories.js';
import Guide from '../models/Guides.js';
import Section from '../models/Sections.js';
import Step from '../models/Step.js';
import { deleteFolder, renameFolder, extractObjectName, deleteFile } from '../config/minio.js';

const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export async function getAllGames(_, res) {
    try {
        const jeux = await Jeux.find().sort({ createdAt: -1 });
        res.status(200).json(jeux);
    } catch (error) {
        console.log("Erreur dans getAllGame", error);
        res.status(500).json({ message: "Problème serveur " });
    }
}

export async function getGameById(req, res) {
    try {
        const findedGame = await Jeux.findById(req.params.id);
        if (!findedGame) {
            return res.status(404).json({ message: "Jeux introuvable" });
        }
        res.status(200).json(findedGame);
    } catch (error) {
        console.log("Erreur dans getGameById", error);
        res.status(500).json({ message: "Problème serveur " });
    }
}

export async function addGame(req, res) {
    try {
        const { title, coverImage } = req.body;
        const game = new Jeux({ title, coverImage });
        const savedGame = await game.save();
        res.status(201).json(savedGame);
    } catch (error) {
        console.log("Erreur dans addGame", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function deleteGame(req, res) {
    try {
        const jeu = await Jeux.findById(req.params.id);
        if (!jeu) {
            return res.status(404).json({ message: "Jeu introuvable" });
        }

        try {
            const categories = await Category.find({ gameId: req.params.id });
            const categoryIds = categories.map(c => c._id);

            for (const categoryId of categoryIds) {
                const guides = await Guide.find({ categoryId });
                for (const guide of guides) {
                    const sections = await Section.find({ guideId: guide._id });
                    for (const section of sections) {
                        await Step.deleteMany({ sectionId: section._id });
                    }
                    await Section.deleteMany({ guideId: guide._id });
                }
            }

            await Guide.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ gameId: req.params.id });
            console.log("Catégories, guides, sections et étapes supprimés");
        } catch (error) {
            console.log("Erreur suppression catégories/guides:", error);
        }

        try {
            const folderPrefix = `${sanitizeFolderName(jeu.title)}/`;
            await deleteFolder(folderPrefix);
            console.log(`Dossier MinIO supprimé: ${folderPrefix}`);
        } catch (error) {
            console.log("Erreur suppression dossier MinIO:", error.message);
        }

        await Jeux.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Jeu et données associées supprimés avec succès" });
    } catch (error) {
        console.log("Erreur dans deleteGame", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function updateGame(req, res) {
    try {
        const { title, coverImage } = req.body;
        const game = await Jeux.findById(req.params.id);

        if (!game) {
            return res.status(404).json({ message: "Jeu introuvable" });
        }

        const oldTitle = game.title;
        const titleChanged = title && title !== oldTitle;

        if (coverImage && coverImage !== game.coverImage) {
            console.log("Nouvelle image détectée, suppression de l'ancienne");
            const oldObjectName = extractObjectName(game.coverImage);
            if (oldObjectName) {
                await deleteFile(oldObjectName);
                console.log("Ancienne image supprimée:", oldObjectName);
            }
            game.coverImage = coverImage;
        }

        if (titleChanged) {
            const oldPrefix = `${sanitizeFolderName(oldTitle)}/`;
            const newPrefix = `${sanitizeFolderName(title)}/`;
            try {
                await renameFolder(oldPrefix, newPrefix);
                console.log(`Dossier MinIO renommé: ${oldPrefix} -> ${newPrefix}`);

                if (game.coverImage.includes(oldPrefix)) {
                    game.coverImage = game.coverImage.replace(oldPrefix, newPrefix);
                }

                const categories = await Category.find({ gameId: req.params.id });
                for (const category of categories) {
                    const guides = await Guide.find({ categoryId: category._id });
                    for (const guide of guides) {
                        const sections = await Section.find({ guideId: guide._id });
                        for (const section of sections) {
                            const steps = await Step.find({ sectionId: section._id });
                            for (const step of steps) {
                                if (step.mediaUrl && step.mediaUrl.includes(oldPrefix)) {
                                    step.mediaUrl = step.mediaUrl.replace(oldPrefix, newPrefix);
                                    await step.save();
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.log("Erreur renommage dossier MinIO:", error.message);
            }
        }

        game.title = title;
        const updatedGame = await game.save();

        console.log("Jeu sauvegardé:", updatedGame);
        res.status(200).json({ message: "Jeu modifié avec succès", game: updatedGame });
    } catch (error) {
        console.error("Erreur dans updateGame", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}
