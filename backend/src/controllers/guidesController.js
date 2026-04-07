import Guides from '../models/Guides.js';
import Step from '../models/Step.js';
import Section from '../models/Sections.js';

export async function getGuideByCategoryId(req, res) {
  try {
    const guides = await Guides.find({ categoryId: req.params.categoryId });

    const guidesWithSections = await Promise.all(
      guides.map(async (guide) => {
        const sections = await Section.find({ guideId: guide._id }).sort({ order: 1 });

        const sectionsWithSteps = await Promise.all(
          sections.map(async (section) => {
            const steps = await Step.find({ sectionId: section._id }).sort({ order: 1 });
            return { ...section.toObject(), steps };
          })
        );

        return { ...guide.toObject(), sections: sectionsWithSteps };
      })
    );

    res.status(200).json(guidesWithSections);
  } catch (error) {
    console.log("Erreur dans getGuideByCategoryId", error);
    res.status(500).json({ message: "Problème serveur" });
  }
}

export async function getGuideById(req, res) {
  try {
    const guide = await Guides.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: "Guide introuvable" });
    }

    const sections = await Section.find({ guideId: guide._id }).sort({ order: 1 });

    const sectionsWithSteps = await Promise.all(
      sections.map(async (section) => {
        const steps = await Step.find({ sectionId: section._id }).sort({ order: 1 });
        return { ...section.toObject(), steps };
      })
    );

    res.status(200).json({ ...guide.toObject(), sections: sectionsWithSteps });
  } catch (error) {
    console.log("Erreur dans getGuideById", error);
    res.status(500).json({ message: "Problème serveur" });
  }
}

export async function createGuide(req, res) {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({ message: "categoryId est requis" });
    }
    const guide = new Guides({ categoryId });

    const savedGuide = await guide.save();

    res.status(201).json(savedGuide);
  } catch (error) {
    console.log("Erreur dans createGuide", error);
    res.status(500).json({ message: "Problème serveur" });
  }
}

export async function updateGuide(req, res) {
  try {
    const updatedGuide = await Guides.findByIdAndUpdate(req.params.id);

    if (!updatedGuide) {
      return res.status(404).json({ message: "Guide introuvable" });
    }

    res.status(200).json(updatedGuide);
  } catch (error) {
    console.error("Erreur dans updateGuide", error);
    res.status(500).json({ message: "Problème serveur" });
  }
}

export async function deleteGuide(req, res) {
  try {
    const guide = await Guides.findById(req.params.id);

    if (!guide) {
      return res.status(404).json({ message: "Guide introuvable" });
    }

    // Récupérer toutes les sections du guide
    const sections = await Section.find({ guideId: req.params.id });

    // Pour chaque section, supprimer ses steps et leurs médias
    for (const section of sections) {
      const steps = await Step.find({ sectionId: section._id });

      // Supprimer les médias Cloudinary de chaque step
      for (const step of steps) {
        if (step.mediaUrl && step.mediaUrl.includes("cloudinary.com")) {
          try {
            const urlParts = step.mediaUrl.split("/upload/")[1];
            const pathWithoutVersion = urlParts.replace(/^v\d+\//, "");
            const publicId = pathWithoutVersion.replace(/\.[^.]+$/, "");
            const isVideo = step.mediaUrl.includes("/video/upload/");

            await cloudinary.uploader.destroy(publicId, {
              resource_type: isVideo ? "video" : "image"
            });
          } catch (error) {
            console.log("Erreur suppression média:", error);
          }
        }
      }

      // Supprimer les steps de cette section
      await Step.deleteMany({ sectionId: section._id });
    }

    // Supprimer toutes les sections
    await Section.deleteMany({ guideId: req.params.id });

    // Supprimer le guide
    await Guides.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Guide supprimé avec succès" });
  } catch (error) {
    console.error("Erreur dans deleteGuide", error);
    res.status(500).json({ message: "Problème serveur" });
  }
}