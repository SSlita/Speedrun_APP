import { useState, useEffect } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { 
  Form, 
  Card, 
  Field, 
  Input, 
  Label, 
  Select, 
  SubmitButton, 
  Textarea, 
  Title 
} from '../styles/CreateGuide.styles';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const GuideCreation = ({ categoryId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [gameTitle, setGameTitle] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  
  const [step, setStep] = useState({
    order: 1,
    title: "",
    content: "",
    mediaType: "none",
    mediaUrl: "",
  });

  useEffect(() => {
    const fetchCategoryAndGame = async () => {
      try {
        const categoryRes = await api.get(`/categories/${categoryId}`);
        const gameId = categoryRes.data.gameId;

        setCategoryTitle(categoryRes.data.name);
        
        const gameRes = await api.get(`/jeux/${gameId}`);
        setGameTitle(gameRes.data.title);
      } catch (error) {
        console.error("Erreur récupération jeu:", error);
      }
    };
    
    fetchCategoryAndGame();
  }, [categoryId]);

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const uploadToCloudinary = async (file, gameName, subFolder, type = "image", categoryName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `${gameName}/${categoryName}/${subFolder}`);

    const resourceType = type === "video" ? "video" : "image";
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || "Upload échoué");
    }
    return data.secure_url;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!gameTitle) {
      toast.error("Chargement du jeu en cours...");
      return;
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast.error("Veuillez sélectionner une image ou une vidéo");
      return;
    }

    const detectedType = isVideo ? "video" : "image";
    const subFolder = isVideo ? "videos" : "guideImg";

    setStep({
      ...step,
      mediaType: detectedType,
      mediaUrl: ""
    });

    if (isImage) {
      setPreview(URL.createObjectURL(file));
    }

    setUploading(true);

    try {
      const folderName = sanitizeFolderName(gameTitle);
      const categoryName = sanitizeFolderName(categoryTitle);

      console.log(`📤 Upload vers: ${folderName}/${subFolder}`);

      const url = await uploadToCloudinary(file, folderName, subFolder, detectedType, categoryName);
      
      setStep(prev => ({
        ...prev,
        mediaUrl: url
      }));

      toast.success(`${isVideo ? 'Vidéo' : 'Image'} uploadée avec succès !`);
      console.log("✅ URL:", url);

    } catch (error) {
      console.error("Erreur upload:", error);
      toast.error("Échec de l'upload");
      setPreview(null);
      setStep(prev => ({
        ...prev,
        mediaType: "none",
        mediaUrl: ""
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!step.content.trim()) {
      toast.error("Le contenu est requis");
      return;
    }

    if (step.mediaType !== "none" && !step.mediaUrl.trim()) {
      toast.error("Veuillez uploader un fichier média");
      return;
    }

    setLoading(true);

    try {
      await api.post("/guides", {
        categoryId,
        steps: [step],
      });

      toast.success("Guide ajouté avec succès");
      navigate(`/category/${categoryId}`);
    } catch (error) {
      console.error(error);
      toast.error("Problème lors de l'ajout du guide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>Créer un guide</Title>
      {gameTitle && (
        <p style={{ color: '#666', marginBottom: '20px' }}>
          📁 Dossier: <strong>{sanitizeFolderName(gameTitle)}</strong>
        </p>
      )}

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Titre de l'étape</Label>
          <Input
            type="text"
            placeholder="Ex : Installer les dépendances"
            value={step.title}
            onChange={(e) =>
              setStep({ ...step, title: e.target.value })
            }
          />
        </Field>

        <Field>
          <Label>Contenu</Label>
          <Textarea
            rows={5}
            placeholder="Explique clairement cette étape..."
            value={step.content}
            onChange={(e) =>
              setStep({ ...step, content: e.target.value })
            }
          />
        </Field>

        <Field>
          <Label>Média associé (optionnel)</Label>
          <Select
            value={step.mediaType}
            onChange={(e) => {
              setStep({
                ...step,
                mediaType: e.target.value,
                mediaUrl: "",
              });
              setPreview(null);
            }}
          >
            <option value="none">Aucun</option>
            <option value="image">Image</option>
            <option value="video">Vidéo</option>
          </Select>
        </Field>

        {step.mediaType !== "none" && (
          <Field>
            <Label>
              Uploader {step.mediaType === "image" ? "une image" : "une vidéo"}
            </Label>
            <input
              type="file"
              accept={step.mediaType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              disabled={uploading || !gameTitle}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '10px'
              }}
            />
            
            {uploading && (
              <p style={{ color: '#666', fontSize: '14px' }}>
                ⏳ Upload en cours...
              </p>
            )}

            {preview && step.mediaType === "image" && (
              <img
                src={preview}
                alt="Aperçu"
                style={{
                  width: "200px",
                  marginTop: "8px",
                  borderRadius: "6px",
                  border: "2px solid #ddd"
                }}
              />
            )}

            {step.mediaUrl && (
              <p style={{ color: 'green', fontSize: '14px', marginTop: '8px' }}>
                ✅ Fichier uploadé avec succès
              </p>
            )}
          </Field>
        )}

        <SubmitButton 
          type="submit" 
          disabled={loading || uploading || (step.mediaType !== "none" && !step.mediaUrl)}
        >
          {loading ? "Création..." : 
           uploading ? "Upload en cours..." : 
           "Créer le guide"}
        </SubmitButton>
      </Form>
    </Card>
  );
};

export default GuideCreation;