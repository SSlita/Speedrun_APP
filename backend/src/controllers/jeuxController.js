import Jeux from '../models/Jeux.js';
import Category from '../models/Categories.js';
import Guide from '../models/Guides.js';
import cloudinary from '../config/cloudinary.js';

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

            await Guide.deleteMany({ categoryId: { $in: categoryIds } });
            console.log(`Guides supprimés`);

            await Category.deleteMany({ gameId: req.params.id });
            console.log(`Catégories supprimées`);
        } catch (error) {
            console.log("Erreur suppression catégories/guides:", error);
        }

        if (jeu.coverImage.includes("cloudinary.com")) {
            const url = jeu.coverImage.split("/upload/")[1];
            const urlWithoutVersion = url.replace(/^v\d+\//, "");
            const gameFolder = urlWithoutVersion.split("/")[0];

            console.log(`Suppression du dossier Cloudinary: ${gameFolder}`);

            try {
                await cloudinary.api.delete_resources_by_prefix(`${gameFolder}/`, {
                    type: 'upload',
                    resource_type: 'image'
                });
                console.log("Images supprimées");
            } catch (error) {
                console.log("Erreur suppression images:", error.error?.message);
            }

            try {
                await cloudinary.api.delete_resources_by_prefix(`${gameFolder}/`, {
                    type: 'upload',
                    resource_type: 'video'
                });
                console.log("Vidéos supprimées");
            } catch (error) {
                console.log("Pas de vidéos");
            }

            try {
                const folders = await cloudinary.api.sub_folders(gameFolder);

                for (const folder of folders.folders) {
                    try {
                        const subFolders = await cloudinary.api.sub_folders(`${gameFolder}/${folder.name}`);
                        for (const subFolder of subFolders.folders) {
                            await cloudinary.api.delete_folder(`${gameFolder}/${folder.name}/${subFolder.name}`);
                        }
                    } catch (err) { }

                    await cloudinary.api.delete_folder(`${gameFolder}/${folder.name}`);
                }

                await cloudinary.api.delete_folder(gameFolder);
                console.log("Dossiers supprimés");
            } catch (error) {
                console.log("Erreur suppression dossiers:", error.error?.message);
            }
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

        if (coverImage && coverImage !== game.coverImage) {
            console.log("Nouvelle image détectée, suppression de l'ancienne");
            
            if (game.coverImage.includes("cloudinary.com")) {
                try {
                    const oldUrl = game.coverImage.split("/upload/")[1];
                    const oldUrlWithoutVersion = oldUrl.replace(/^v\d+\//, "");
                    const publicId = oldUrlWithoutVersion.replace(/\.[^.]+$/, "");

                    await cloudinary.uploader.destroy(publicId);
                    console.log("Ancienne image supprimée:", publicId);
                } catch (error) {
                    console.log("Erreur suppression ancienne image:", error);
                }
            }

            game.coverImage = coverImage;
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