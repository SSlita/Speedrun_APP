import Step from "../models/Step.js";

export async function getStepBySectionId(req, res) {
    try {
        const steps = await Step.find({ sectionId: req.params.sectionId });
        res.status(200).json(steps);
    } catch (error) {
        console.log("Erreur dans getStepBySectionId", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function createStep(req, res) {
    try {
        const { sectionId, order, content, mediaType, mediaUrl } = req.body;

        const step = new Step({
            sectionId,
            order,
            content,
            mediaType: mediaType || 'none',
            mediaUrl: mediaUrl || ''
        });

        const savedStep = await step.save();
        res.status(201).json(savedStep);
    } catch (error) {
        console.log("Erreur dans createStep", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function updateStep(req, res) {
    try {
        const updatedStep = await Step.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedStep) {
            return res.status(400).json({ message: "Etape introuvable" });
        }
        res.status(200).json(updatedStep);
    } catch (error) {
        console.error("Erreur dans updateStep", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function deleteStep(req, res) {
    try {
        const deletedStep = await Step.findByIdAndDelete(req.params.id);

        if (!deletedStep) {
            return res.status(400).json({ message: "Etape introuvable" });
        }

        res.status(200).json({ message: "Etape supprimé avec succès" });
    } catch (error) {
        console.error("Erreur dans deleteStep", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}