import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

import {
  PageContainer,
  BackLink,
  Card,
  Title,
  StepCard,
  StepHeader,
  Field,
  Label,
  Input,
  Textarea,
  Select,
  Actions,
  CancelLink,
  SaveButton,
  ImagePreview,
  LoaderWrapper,
  IconButton
} from "../styles/GuideDetail.styles";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Séparateur unique qui ne peut pas apparaître dans un ObjectId MongoDB
const KEY_SEP = "::";

const GuideDetail = () => {
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [newMediaFiles, setNewMediaFiles] = useState({});
  const [mediaPreviews, setMediaPreviews] = useState({});

  const navigate = useNavigate();
  const { guideId } = useParams();

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await api.get(`/guides/${guideId}`);
        setGuide(res.data);

        const categoryRes = await api.get(`/categories/${res.data.categoryId}`);
        const gameId = categoryRes.data.gameId;
        setCategoryTitle(categoryRes.data.name);

        const gameRes = await api.get(`/jeux/${gameId}`);
        setGameTitle(gameRes.data.title);
      } catch {
        toast.error("Impossible de récupérer ce guide");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchGuide();
  }, [guideId, navigate]);

  const handleAddStep = async (sectionId) => {
    try {
      const section = guide.sections.find((s) => s._id === sectionId);
      const newOrder = (section.steps?.length ?? 0) + 1;

      const res = await api.post("/steps", {
        sectionId,
        order: newOrder,
        content: "",
        mediaType: "none",
        mediaUrl: "",
      });

      setGuide((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s._id !== sectionId ? s : { ...s, steps: [...(s.steps ?? []), res.data] }
        ),
      }));

      toast.success("Étape ajoutée");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout de l'étape");
    }
  };

  const handleDeleteStep = async (e, stepId, sectionId) => {
    if (!window.confirm("Voulez-vous supprimer cette étape ?")) return;
    try {
      await api.delete(`/steps/${stepId}`);

      setGuide((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s._id !== sectionId ? s : {
            ...s,
            steps: s.steps.filter((step) => step._id !== stepId)
          }
        )
      }));

      toast.success("Étape supprimée");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleStepChange = (sectionId, stepId, field, value) => {
    setGuide((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section._id !== sectionId ? section : {
          ...section,
          steps: section.steps.map((step) =>
            step._id !== stepId ? step : { ...step, [field]: value }
          )
        }
      )
    }));
  };

  // Clé unique combinant sectionId et stepId avec un séparateur sûr
  const makeKey = (sectionId, stepId) => `${sectionId}${KEY_SEP}${stepId}`;

  const handleFileChange = (sectionId, stepId, file) => {
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Format non supporté");
      return;
    }

    const key = makeKey(sectionId, stepId);
    setNewMediaFiles((prev) => ({ ...prev, [key]: file }));

    if (isImage) {
      setMediaPreviews((prev) => ({
        ...prev,
        [key]: URL.createObjectURL(file)
      }));
    }

    handleStepChange(sectionId, stepId, "mediaType", isVideo ? "video" : "image");
    toast.success("Fichier sélectionné, cliquez sur Sauvegarder pour uploader");
  };

  const uploadToCloudinary = async (file, type) => {
    const folderName = sanitizeFolderName(gameTitle);
    const categoryName = sanitizeFolderName(categoryTitle);
    const subFolder = type === "video" ? "videos" : "guideImg";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `${folderName}/${categoryName}/${subFolder}`);

    const resourceType = type === "video" ? "video" : "image";
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!res.ok) throw new Error("Upload échoué");
    return data.secure_url;
  };

  const deleteFromCloudinary = async (mediaUrl) => {
    if (!mediaUrl || !mediaUrl.includes("cloudinary.com")) return;
    try {
      const urlParts = mediaUrl.split("/upload/")[1];
      const pathWithoutVersion = urlParts.replace(/^v\d+\//, "");
      const publicId = pathWithoutVersion.replace(/\.[^.]+$/, "");
      const isVideo = mediaUrl.includes("/video/upload/");
      await api.post("/cloudinary/delete", {
        publicId,
        resourceType: isVideo ? "video" : "image"
      });
    } catch (error) {
      console.log("Erreur suppression média:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setUploading(true);

    try {
      // Construire une map stepId -> newUrl pour les fichiers uploadés
      const uploadedUrls = {};

      for (const [key, file] of Object.entries(newMediaFiles)) {
        // Séparer sectionId et stepId avec le séparateur sûr
        const sepIndex = key.indexOf(KEY_SEP);
        const sectionId = key.slice(0, sepIndex);
        const stepId = key.slice(sepIndex + KEY_SEP.length);

        const section = guide.sections.find((s) => s._id === sectionId);
        const step = section?.steps.find((s) => s._id === stepId);

        if (!step || !stepId) {
          console.error("Step introuvable pour la clé:", key, "sectionId:", sectionId, "stepId:", stepId);
          continue;
        }

        if (step.mediaUrl) await deleteFromCloudinary(step.mediaUrl);

        const type = file.type.startsWith("video/") ? "video" : "image";
        const newUrl = await uploadToCloudinary(file, type);

        uploadedUrls[stepId] = { mediaUrl: newUrl, mediaType: type };
        toast.success("Média uploadé");
      }

      // Sauvegarder sections et steps
      for (const section of guide.sections) {
        await api.put(`/sections/${section._id}`, { title: section.title });

        for (const step of section.steps) {
          // Si un nouveau média a été uploadé pour ce step, utiliser la nouvelle URL
          const uploaded = uploadedUrls[step._id];
          await api.put(`/steps/${step._id}`, {
            content: step.content,
            mediaType: uploaded ? uploaded.mediaType : step.mediaType,
            mediaUrl: uploaded ? uploaded.mediaUrl : step.mediaUrl,
          });
        }
      }

      toast.success("Guide mis à jour");
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderIcon className="animate-spin size-10" />
      </LoaderWrapper>
    );
  }

  return (
    <PageContainer>
      <BackLink to={-1}>
        <ArrowLeftIcon size={18} />
        Retour
      </BackLink>

      <Card>
        <Title>Modifier le guide</Title>

        {(guide.sections ?? []).map((section) => (
          <div key={section._id}>
            <StepHeader>{section.title}</StepHeader>

            <Field>
              <Label>Titre de la section</Label>
              <Input
                value={section.title}
                onChange={(e) =>
                  setGuide((prev) => ({
                    ...prev,
                    sections: prev.sections.map((s) =>
                      s._id !== section._id ? s : { ...s, title: e.target.value }
                    )
                  }))
                }
              />
            </Field>

            {(section.steps ?? []).map((step) => {
              const key = makeKey(section._id, step._id);
              return (
                <StepCard key={step._id}>
                  <Field>
                    <Label>Contenu</Label>
                    <Textarea
                      rows={4}
                      value={step.content}
                      onChange={(e) =>
                        handleStepChange(section._id, step._id, "content", e.target.value)
                      }
                    />
                  </Field>

                  <Field>
                    <Label>Média</Label>
                    <Select
                      value={step.mediaType || "none"}
                      onChange={(e) => {
                        handleStepChange(section._id, step._id, "mediaType", e.target.value);
                        if (e.target.value === "none") {
                          setNewMediaFiles((prev) => { const n = { ...prev }; delete n[key]; return n; });
                          setMediaPreviews((prev) => { const n = { ...prev }; delete n[key]; return n; });
                        }
                      }}
                    >
                      <option value="none">Aucun</option>
                      <option value="image">Image</option>
                      <option value="video">Vidéo</option>
                    </Select>
                  </Field>

                  {step.mediaType !== "none" && (
                    <Field>
                      <Label>Changer le média</Label>
                      <input
                        type="file"
                        accept={step.mediaType === "image" ? "image/*" : "video/*"}
                        onChange={(e) => handleFileChange(section._id, step._id, e.target.files[0])}
                        disabled={uploading}
                      />
                      {step.mediaType === "image" && (mediaPreviews[key] || step.mediaUrl) && (
                        <ImagePreview
                          src={mediaPreviews[key] || step.mediaUrl}
                          alt={step.content}
                        />
                      )}
                    </Field>
                  )}

                  <Actions>
                    <IconButton onClick={(e) => handleDeleteStep(e, step._id, section._id)}>
                      <Trash2Icon size={18} />
                    </IconButton>
                  </Actions>
                </StepCard>
              );
            })}

            <button onClick={() => handleAddStep(section._id)}>
              + Ajouter une étape
            </button>
          </div>
        ))}

        <Actions>
          <CancelLink to={-1}>Annuler</CancelLink>
          <SaveButton disabled={saving || uploading} onClick={handleSave}>
            {uploading ? "Upload en cours..." : saving ? "Sauvegarde..." : "Sauvegarder"}
          </SaveButton>
        </Actions>
      </Card>
    </PageContainer>
  );
};

export default GuideDetail;