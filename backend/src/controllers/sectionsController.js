import Section from "../models/Sections.js";
import Step from "../models/Step.js";

export async function getSectionsByGuideId(req, res) {
    try {
        const sections = await Section.find({ guideId: req.params.guideId });

        const sectionsWIthSteos = await Promise.all(
            sections.map(async (section) => {
                const steps = await Step.find({ sectionId: section._id }).sort({ order: 1 });
                return {
                    ...section.toObject(),
                    steps
                };
            })
        );
        res.status(200).json(sectionsWIthSteos);
    } catch (error) {
        console.log("Erreur dans getSectionsByGuideId", error);
        res.status(500).json({ message: "Problème serveur" });
    }
}

export async function createSection(req, res) {
    try {
        const { guideId, title, order } = req.body;
        if (!guideId) {
            return res.status(400).json({ message: "guideId est requis" });
        }

        const section = new Section({ guideId, title, order });

        const savedSection = await section.save();

        res.status(201).json(savedSection);

    } catch (error) {
        console.log("Erreur dans createSection");
        res.status(500).json({ messsage: "Problème serveur" });
    }
}

export async function updateSection(req, res) {
    try {
        const { title, order } = req.body;

        const updatedSection = await Section.findByIdAndUpdate(
            req.params.id,
            { title, order },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(400).json({ messsage: "Section introuvable" });
        }

        return res.status(201).json(updatedSection);
    } catch (error) {
        console.log("Erreir dans updateSsection", error);
        res.status(500).json({ message: "Problème serveur" });
    }
};

export async function deleteSection(req, res) {
    try {
        const deletedSection = await Section.findById(req.params.id);

        if (!deletedSection) {
            return res.status(404).json({ message: "Section introuvable" });
        }

        await Step.delateMany(deletedSection._id);

        await Section.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Section effacé avec ssuccès" });
    } catch (error) {
        console.log("Erreur dans deleteSection", erreur);
        res.status(500).json({ message: "Problème serveur" });
    }
}