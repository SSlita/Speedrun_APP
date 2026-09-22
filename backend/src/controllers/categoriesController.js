import Categories from '../models/Categories.js';
import Jeux from '../models/Jeux.js';
import Guide from '../models/Guides.js';
import Section from '../models/Sections.js';
import Step from '../models/Step.js';
import { deleteFolder, renameFolder } from '../config/minio.js';

const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export async function getAllCategories(req, res) {
    try {
        const categories = await Categories.find({ gameId: req.params.gameId });
        res.status(200).json(categories);
    } catch (error) {
        console.log("Erreur dans getAllCategories", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function getCategoryById(req, res) {
    try {
        const findedCategory = await Categories.findById(req.params.id);
        if (!findedCategory) {
            return res.status(404).json({ message: "Impossible de trouver cette catégorie" });
        }
        res.status(200).json(findedCategory);
    } catch (error) {
        console.log("Erreur dans getCategoryById", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function addCategory(req, res) {
    try {
        const { name, gameId } = req.body;
        const category = new Categories({ name, gameId });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.log("Erreur dans addCategory", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function deleteCategory(req, res) {
    try {
        const category = await Categories.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Impossible de trouver cette catégorie" });
        }

        const game = await Jeux.findById(category.gameId);

        try {
            const guides = await Guide.find({ categoryId: category._id });
            for (const guide of guides) {
                const sections = await Section.find({ guideId: guide._id });
                for (const section of sections) {
                    await Step.deleteMany({ sectionId: section._id });
                }
                await Section.deleteMany({ guideId: guide._id });
            }
            await Guide.deleteMany({ categoryId: category._id });
            console.log("Guides, sections et étapes supprimés");
        } catch (error) {
            console.log("Erreur suppression guides/sections:", error);
        }

        if (game) {
            try {
                const folderPrefix = `${sanitizeFolderName(game.title)}/${sanitizeFolderName(category.name)}/`;
                await deleteFolder(folderPrefix);
                console.log(`Dossier MinIO supprimé: ${folderPrefix}`);
            } catch (error) {
                console.log("Erreur suppression dossier MinIO:", error.message);
            }
        }

        await Categories.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        console.log("Erreur dans deleteCategory", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function updateCategory(req, res) {
    try {
        const { name } = req.body;
        const category = await Categories.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Problème lors de l'update de la catégorie" });
        }

        const oldName = category.name;
        const nameChanged = name && name !== oldName;

        if (nameChanged) {
            const game = await Jeux.findById(category.gameId);
            if (game) {
                const oldPrefix = `${sanitizeFolderName(game.title)}/${sanitizeFolderName(oldName)}/`;
                const newPrefix = `${sanitizeFolderName(game.title)}/${sanitizeFolderName(name)}/`;
                try {
                    await renameFolder(oldPrefix, newPrefix);
                    console.log(`Dossier MinIO renommé: ${oldPrefix} -> ${newPrefix}`);

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
                } catch (error) {
                    console.log("Erreur renommage dossier MinIO:", error.message);
                }
            }
        }

        category.name = name;
        const updatedCategory = await category.save();

        res.status(200).json({ message: "Catégorie modifiée avec succès", category: updatedCategory });
    } catch (error) {
        console.error("Erreur dans updateCategory", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}
