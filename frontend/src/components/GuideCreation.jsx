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
  const [guideId, setGuideId] = useState(null);
  const [sections, setSections] = useState([]);
  
  const [creationType, setCreationType] = useState("section");

  const [newSection, setNewSection] = useState({
    title: "",
  });

  const [newStep, setNewStep] = useState({
    sectionId: "",
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

  // Charger les sections du guide une fois qu'il est créé
  useEffect(() => {
    if (!guideId) return;

    const fetchSections = async () => {
      try {
        const res = await api.get(`/sections/guide/${guideId}`);
        setSections(res.data);
      } catch (error) {
        console.error("Erreur récupération sections:", error);
      }
    };

    fetchSections();
  }, [guideId]);

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

    if (isImage) {
      setPreview(URL.createObjectURL(file));
    }

    setUploading(true);

    try {
      const folderName = sanitizeFolderName(gameTitle);
      const categoryName = sanitizeFolderName(categoryTitle);
      const url = await uploadToCloudinary(file, folderName, subFolder, detectedType, categoryName);
      
      setNewStep(prev => ({
        ...prev,
        mediaUrl: url,
        mediaType: detectedType
      }));

      toast.success(`${isVideo ? 'Vidéo' : 'Image'} uploadée !`);
    } catch (error) {
      console.error("Erreur upload:", error);
      toast.error("Échec de l'upload");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Créer le guide si pas encore créé
  const ensureGuideExists = async () => {
    if (guideId) return guideId;

    try {
      const res = await api.post("/guides", { categoryId });
      setGuideId(res.data._id);
      toast.success("Guide créé !");
      return res.data._id;
    } catch (error) {
      toast.error("Erreur création du guide");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (creationType === "section") {
      // Ajouter une section
      if (!newSection.title.trim()) {
        toast.error("Le titre de la section est requis");
        return;
      }

      setLoading(true);
      try {
        const currentGuideId = await ensureGuideExists();

        const res = await api.post("/sections", {
          guideId: currentGuideId,
          title: newSection.title,
          order: sections.length + 1,
        });

        setSections([...sections, res.data]);
        setNewSection({ title: "" });
        toast.success("Section ajoutée !");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'ajout de la section");
      } finally {
        setLoading(false);
      }

    } else {
      // Ajouter une étape
      if (!newStep.sectionId) {
        toast.error("Sélectionnez une section");
        return;
      }

      if (!newStep.content.trim()) {
        toast.error("Le contenu de l'étape est requis");
        return;
      }

      setLoading(true);
      try {
        await ensureGuideExists();

        await api.post("/steps", {
          sectionId: newStep.sectionId,
          order: 1,
          content: newStep.content,
          mediaType: newStep.mediaType,
          mediaUrl: newStep.mediaUrl
        });

        setNewStep({
          sectionId: newStep.sectionId, // Garde la section sélectionnée
          content: "",
          mediaType: "none",
          mediaUrl: ""
        });
        setPreview(null);
        toast.success("Étape ajoutée !");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'ajout de l'étape");
      } finally {
        setLoading(false);
      }
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
        {/* Radio buttons pour choisir Section ou Étape */}
        <Field>
          <Label>Que voulez-vous ajouter ?</Label>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                value="section"
                checked={creationType === "section"}
                onChange={(e) => setCreationType(e.target.value)}
                style={{ marginRight: '8px' }}
              />
              <strong>📚 Section</strong> (titre uniquement)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                value="step"
                checked={creationType === "step"}
                onChange={(e) => setCreationType(e.target.value)}
                style={{ marginRight: '8px' }}
                disabled={sections.length === 0}
              />
              <strong>📝 Étape</strong> (contenu + média)
            </label>
          </div>
          {sections.length === 0 && (
            <p style={{ color: '#999', fontSize: '14px', marginTop: '8px' }}>
              ⚠️ Créez d'abord une section pour pouvoir ajouter des étapes
            </p>
          )}
        </Field>

        {/* Formulaire pour Section */}
        {creationType === "section" && (
          <>
            <Field>
              <Label>Titre de la section *</Label>
              <Input
                type="text"
                placeholder="Ex: Installation, Configuration, Démarrage..."
                value={newSection.title}
                onChange={(e) => setNewSection({ title: e.target.value })}
              />
            </Field>
          </>
        )}

        {/* Formulaire pour Étape */}
        {creationType === "step" && (
          <>
            <Field>
              <Label>Rattacher à la section *</Label>
              <Select
                value={newStep.sectionId}
                onChange={(e) => setNewStep({ ...newStep, sectionId: e.target.value })}
              >
                <option value="">Choisissez une section</option>
                {sections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.title}
                  </option>
                ))}
              </Select>
            </Field>

            <Field>
              <Label>Contenu de l'étape *</Label>
              <Textarea
                rows={5}
                placeholder="Décrivez cette étape..."
                value={newStep.content}
                onChange={(e) => setNewStep({ ...newStep, content: e.target.value })}
              />
            </Field>

            <Field>
              <Label>Média (optionnel)</Label>
              <Select
                value={newStep.mediaType}
                onChange={(e) => {
                  setNewStep({
                    ...newStep,
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

            {newStep.mediaType !== "none" && (
              <Field>
                <Label>
                  Uploader {newStep.mediaType === "image" ? "une image" : "une vidéo"}
                </Label>
                <input
                  type="file"
                  accept={newStep.mediaType === "image" ? "image/*" : "video/*"}
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

                {preview && newStep.mediaType === "image" && (
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

                {newStep.mediaUrl && (
                  <p style={{ color: 'green', fontSize: '14px', marginTop: '8px' }}>
                    ✅ Fichier uploadé
                  </p>
                )}
              </Field>
            )}
          </>
        )}

        <SubmitButton 
          type="submit" 
          disabled={loading || uploading || (creationType === "step" && newStep.mediaType !== "none" && !newStep.mediaUrl)}
        >
          {loading ? "Ajout en cours..." : 
           uploading ? "Upload en cours..." : 
           creationType === "section" ? "➕ Ajouter la section" : "➕ Ajouter l'étape"}
        </SubmitButton>

        {/* Bouton pour terminer */}
        {sections.length > 0 && (
          <button
            type="button"
            onClick={() => {
              toast.success("Guide créé !");
              navigate(`/category/${categoryId}`);
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px',
              fontWeight: 'bold'
            }}
          >
            ✅ Terminer et voir le guide
          </button>
        )}
      </Form>

      {/* Aperçu des sections créées */}
      {sections.length > 0 && (
        <div style={{ marginTop: '30px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Sections créées :</h3>
          <ul>
            {sections.map((section) => (
              <li key={section._id}>{section.title}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default GuideCreation;