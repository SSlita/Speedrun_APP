import Categories from '../models/Categories.js';

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

        if(!findedCategory) {
            return res.status(404).json({ message: "Impossible de trouver cette catégorie"});
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
        const deletedGame = await Categories.findByIdAndDelete(req.params.id);

        if(!deletedGame) {
            return res.status(404).json({ message: "Impossible de trouver cette catégorie"});
        }

        res.status(200).json({ message: "Catégorie supprimé avec succès"});
    } catch (error) {
        console.log("Erreur dans deleteCategory", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function updateCategory(req, res) {
    try {
        const { name } = req.body;
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            { name },
            {
                new: true,
            }
        );

        if(!updatedCategory) {
            return res.status(404).json({ message: "Problème lors de l'update de la catégorie"});
        }
        res.status(200).json("Catégorie modifiée avec succès");
    } catch (error) {
        console.error("Erreur dans updateCategory", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}