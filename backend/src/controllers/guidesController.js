import Guides from '../models/Guides.js';

export async function getGuideByCategoryId(req, res) {
    try {
        const guides = await Guides.find({ categoryId: req.params.categoryId });
        res.status(200).json(guides);
    } catch (error) {
        console.log("Erreur dans getGuideByCategoryId", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function getGuideById(req, res) {
    try {
        const guide = await Guides.findById(req.params.id);
        res.status(200).json(guide);
    } catch (error) {
        console.log("Erreur dans getGuideById", error);
        res.status(500).json({ message: "Problème serveur"});
    }
}

export async function createGuide(req, res) {
    try {
        const { categoryId, steps }  = req.body;
        if (!categoryId) {
            return res.status(400).json({ message: "categoryId est requis" });
        }
        const guide = new Guides({ categoryId, steps });

        const savedGuide = await guide.save();

        res.status(201).json(savedGuide);
    } catch (error) {
        console.log("Erreur dans createGuide", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function updateGuide(req, res) {
    try {
        const { steps } = req.body;

        const updatedSteps = await Guides.findByIdAndUpdate(
            req.params.id,
            { steps }, 
            {
                new: true,
            }
        );

        if(!updatedSteps) {
            return res.status(404).json({ message: "Etape du guide introuvable"});
        }

        res.status(200).json(updatedSteps);
    } catch (error) {
        console.error("Erreur dans updateGuide", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function deleteGuide(req, res) {
    try {
        const deletedGame = await Guides.findByIdAndDelete(req.params.id);

        if(!deletedGame) {
            return res.status(404).json({ message: "Guide introuvable" });
        }

        res.status(200).json({ message: "Guide effacé avec succès" });
    } catch (error) {
        console.log("Erreur dans deleteGuide", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}