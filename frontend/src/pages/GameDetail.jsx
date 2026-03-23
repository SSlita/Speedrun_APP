import { ArrowLeftIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import {
  PageContainer,
  Card,
  BackLink,
  Form,
  Field,
  Label,
  Input,
  SaveButton,
  LoaderWrapper
} from "../styles/GameDetail.styles";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

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
      } catch (error) {
        toast.error("Impossible de récupérer ce jeu");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [gameId, navigate]);

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setNewImageFile(file);
  };

  const uploadNewImage = async () => {
    if (!newImageFile) return game.coverImage;

    const urlParts = game.coverImage.split("/upload/")[1];
    const pathWithoutVersion = urlParts.replace(/^v\d+\//, "");
    const currentFolder = pathWithoutVersion.split("/")[0];

    const formData = new FormData();
    formData.append("file", newImageFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `${currentFolder}/covers`);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!res.ok) throw new Error("Upload échoué");

    return data.secure_url;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!game.title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setSaving(true);

    try {
      const finalImageUrl = await uploadNewImage();

      await api.put(`/jeux/${gameId}`, {
        title: game.title,
        coverImage: finalImageUrl,
      });

      toast.success("Jeu modifié avec succès");
      navigate("/");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Impossible de modifier ce jeu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderIcon className="animate-spin size-10" />
      </LoaderWrapper>
    );
  }

  if (!game) {
    return (
      <PageContainer>
        <Card>
          <p>Jeu introuvable</p>
          <BackLink to="/">Retour à l'accueil</BackLink>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card>
        <BackLink to="/">
          <ArrowLeftIcon size={18} />
          Retour aux jeux
        </BackLink>

        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Modifier le jeu
        </h2>

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
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={saving}
            />
            {(imagePreview || game.coverImage) && (
              <img
                src={imagePreview || game.coverImage}
                alt="Aperçu"
                style={{
                  width: "200px",
                  marginTop: "12px",
                  borderRadius: "8px",
                  border: "2px solid #e5e7eb"
                }}
              />
            )}
          </Field>

          <SaveButton disabled={saving}>
            {saving ? "Sauvegarde..." : "Sauvegarder les changements"}
          </SaveButton>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default GameDetail;