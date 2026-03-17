import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

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
  LoaderWrapper
} from "../styles/GuideDetail.styles";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE.CLOUDINARY_UPLOAD_PRESET;

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

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...guide.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setGuide({ ...guide, steps: updatedSteps });
  };

  const handleFileChange = (index, file) => {
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast.error("Format non supporté");
      return;
    }

    setNewMediaFiles({ ...newMediaFiles, [index]: file });

    if (isImage) {
      setMediaPreviews({
        ...mediaPreviews,
        [index]: URL.createObjectURL(file)
      });
    }

    const updatedSteps = [...guide.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      mediaType: isVideo ? "video" : "image"
    };
    setGuide({ ...guide, steps: updatedSteps });

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

      console.log("Ancien média supprimé:", publicId);
    } catch (error) {
      console.log("Erreur suppression média:", error);
    }
  };

  const handleSave = async () => {
    if (!guide.steps.length) {
      toast.error("Ajoutez au moins une étape");
      return;
    }

    setSaving(true);
    setUploading(true);

    try {
      const updatedSteps = [...guide.steps];

      for (const [indexStr, file] of Object.entries(newMediaFiles)) {
        const index = parseInt(indexStr);
        const step = updatedSteps[index];

        if (step.mediaUrl) {
          await deleteFromCloudinary(step.mediaUrl);
        }

        const type = file.type.startsWith('video/') ? "video" : "image";
        const newUrl = await uploadToCloudinary(file, type);

        updatedSteps[index] = {
          ...step,
          mediaUrl: newUrl
        };

        toast.success(`Média de l'étape ${step.order} uploadé`);
      }

      await api.put(`/guides/${guideId}`, { steps: updatedSteps });

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

        {guide.steps.map((step, index) => (
          <StepCard key={index}>
            <StepHeader>Étape {step.order}</StepHeader>

            <Field>
              <Label>Titre</Label>
              <Input
                value={step.title}
                onChange={(e) =>
                  handleStepChange(index, "title", e.target.value)
                }
              />
            </Field>

            <Field>
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={step.content}
                onChange={(e) =>
                  handleStepChange(index, "content", e.target.value)
                }
              />
            </Field>

            <Field>
              <Label>Média</Label>
              <Select
                value={step.mediaType || "none"}
                onChange={(e) => {
                  handleStepChange(index, "mediaType", e.target.value);
                  if (e.target.value === "none") {
                    const newFiles = { ...newMediaFiles };
                    delete newFiles[index];
                    setNewMediaFiles(newFiles);
                    
                    const newPreviews = { ...mediaPreviews };
                    delete newPreviews[index];
                    setMediaPreviews(newPreviews);
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
                <Label>
                  Changer le {step.mediaType === "image" ? "l'image" : "la vidéo"}
                </Label>
                <input
                  type="file"
                  accept={step.mediaType === "image" ? "image/*" : "video/*"}
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  disabled={uploading}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                />

                {step.mediaType === "image" && (
                  <ImagePreview
                    src={mediaPreviews[index] || step.mediaUrl}
                    alt={step.title}
                  />
                )}

                {newMediaFiles[index] && (
                  <p style={{ color: 'orange', fontSize: '14px', marginTop: '8px' }}>
                    ⚠️ Nouveau fichier sélectionné, cliquez sur Sauvegarder pour uploader
                  </p>
                )}
              </Field>
            )}
          </StepCard>
        ))}

        <Actions>
          <CancelLink to={-1}>Annuler</CancelLink>
          <SaveButton disabled={saving || uploading} onClick={handleSave}>
            {uploading ? "Upload en cours..." : 
             saving ? "Sauvegarde..." : 
             "Sauvegarder"}
          </SaveButton>
        </Actions>
      </Card>
    </PageContainer>
  );
};

export default GuideDetail;