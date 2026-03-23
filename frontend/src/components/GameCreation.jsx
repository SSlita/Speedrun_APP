import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const GameCreation = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!title.trim()) {
      toast.error("Tapez le titre du jeu avant de choisir une image");
      return;
    }

    const folderName = sanitizeFolderName(title);
    console.log("Dossier envoyé :", `${folderName}/covers`);

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const url = await uploadToCloudinary(file, folderName, "covers");
      setCoverImage(url);
      toast.success("Image chargée avec succès");
    } catch (error) {
      toast.error("Échec du chargement de l'image");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const uploadToCloudinary = async (file, gameName, subFolder, type = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `${gameName}/${subFolder}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type}/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || "Upload échoué");
    }

    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !coverImage) {
      toast.error("Tous les champs doivent être remplis");
      return;
    }

    setLoading(true);
    try {
      await api.post("/jeux", {
        title,
        coverImage,
      });
      toast.success("Jeu ajouté");
      navigate("/");
    } catch (error) {
      toast.error("Échec lors de la création du jeu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Créer un nouveau jeu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><span>Titre</span></label>
          <input
            type="text"
            placeholder="Titre du jeu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label><span>Image de couverture</span></label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
          {preview && (
            <img
              src={preview}
              alt="Aperçu"
              style={{ width: "150px", marginTop: "8px", borderRadius: "6px" }}
            />
          )}
        </div>

        <div>
          <button type="submit" disabled={loading || !coverImage}>
            {loading ? "En cours..." : "Créer le jeu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameCreation;