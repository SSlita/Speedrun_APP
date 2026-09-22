import { ArrowLeftIcon, ImageIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import {
  PageContainer, Card, CardHeader, CardTitle, BackLink,
  Form, Field, Label, Input, FileLabel, Preview,
  CardFooter, SaveButton, LoaderWrapper,
} from "../styles/GameDetail.styles";

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

const GameDetail = () => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await api.get(`/jeux/${gameId}`);
        setGame(res.data);
      } catch {
        toast.error("Impossible de récupérer ce jeu");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [gameId, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setNewImageFile(file);
  };

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleSave = async (e) => {
    e.preventDefault();
    if (!game.title.trim()) {
      toast.error("Le titre est requis");
      return;
    }
    setSaving(true);
    try {
      let finalImageUrl = game.coverImage;
      if (newImageFile) {
        finalImageUrl = await uploadToMinio(
          newImageFile,
          `${sanitizeFolderName(game.title)}/covers`
        );
      }
      await api.put(`/jeux/${gameId}`, { title: game.title, coverImage: finalImageUrl });
      toast.success("Jeu modifié avec succès");
      navigate("/");
    } catch {
      toast.error("Impossible de modifier ce jeu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoaderWrapper><LoaderIcon size={32} className="animate-spin" /></LoaderWrapper>
      </>
    );
  }

  if (!game) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <Card>
            <CardHeader>
              <CardTitle>Jeu <span>introuvable</span></CardTitle>
              <BackLink to="/"><ArrowLeftIcon size={14} /> Retour</BackLink>
            </CardHeader>
          </Card>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Modifier le <span>jeu</span></CardTitle>
            <BackLink to="/"><ArrowLeftIcon size={14} /> Retour</BackLink>
          </CardHeader>
          <Form onSubmit={handleSave}>
            <Field>
              <Label>Titre</Label>
              <Input
                type="text"
                placeholder="Titre du jeu"
                value={game.title}
                onChange={(e) => setGame({ ...game, title: e.target.value })}
              />
            </Field>
            <Field>
              <Label>Image de couverture</Label>
              <FileLabel>
                <ImageIcon size={16} />
                {imagePreview ? "Changer l'image" : "Choisir une image"}
                <input type="file" accept="image/*"
                  onChange={handleImageChange} disabled={saving} />
              </FileLabel>
              {(imagePreview || game.coverImage) && (
                <Preview src={imagePreview || game.coverImage} alt="Aperçu" />
              )}
            </Field>
          </Form>
          <CardFooter>
            <SaveButton onClick={handleSave} disabled={saving}>
              {saving ? "Sauvegarde..." : "Sauvegarder les changements"}
            </SaveButton>
          </CardFooter>
        </Card>
      </PageContainer>
    </>
  );
};

export default GameDetail;
