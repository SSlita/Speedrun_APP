import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ImageIcon } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useQueryClient } from "@tanstack/react-query";
import {
  FormCard,
  FormHeader,
  FormTitle,
  FormBody,
  FormFooter,
  Field,
  Label,
  Input,
  FileLabel,
  Preview,
  SubmitButton,
} from '../styles/GameCreation.styles';

const uploadToMinio = async (file, folder) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  
  const res = await fetch(`${import.meta.env.VITE_API_URL}/upload/upload`, {
    method: 'POST',
    body: formData,
  });
  const { publicUrl } = await res.json();
  return publicUrl;
};

const GameCreation = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!title.trim()) {
      toast.error("Tapez le titre du jeu avant de choisir une image");
      return;
    }
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const url = await uploadToMinio(file, sanitizeFolderName(title));
      setCoverImage(url);
      toast.success("Image chargée avec succès");
    } catch {
      toast.error("Échec du chargement de l'image");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !coverImage) {
      toast.error("Tous les champs doivent être remplis");
      return;
    }
    setLoading(true);
    try {
      await api.post("/jeux", { title, coverImage });
      toast.success("Jeu ajouté");
      await queryClient.invalidateQueries({ queryKey: ["jeux"] });
      navigate("/");
    } catch {
      toast.error("Échec lors de la création du jeu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard>
      <FormHeader>
        <FormTitle>Nouveau <span>jeu</span></FormTitle>
      </FormHeader>
      <FormBody>
        <Field>
          <Label>Titre</Label>
          <Input
            type="text"
            placeholder="Titre du jeu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <Field>
          <Label>Image de couverture</Label>
          <FileLabel>
            <ImageIcon size={16} />
            {preview ? "Changer l'image" : "Choisir une image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
            />
          </FileLabel>
          {preview && <Preview src={preview} alt="Aperçu" />}
        </Field>
      </FormBody>
      <FormFooter>
        <SubmitButton onClick={handleSubmit} disabled={loading || !coverImage}>
          {loading ? "En cours..." : "Créer le jeu"}
        </SubmitButton>
      </FormFooter>
    </FormCard>
  );
};

export default GameCreation;
