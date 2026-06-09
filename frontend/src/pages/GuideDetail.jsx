import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, ImageIcon, LoaderIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Navbar from "../components/Navbar";
import {
  PageContainer, ContentWrapper, Card, CardHeader, Title, BackLink,
  SectionBlock, SectionTitleBar, SectionLabel, StepHeader,
  StepCard, Field, Label, Input, Textarea, Select,
  FileLabel, ImagePreview, AddStepButton,
  StepActions, CardFooter, CancelLink, SaveButton, IconButton, LoaderWrapper,
} from "../styles/GuideDetail.styles";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
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
        setCategoryTitle(categoryRes.data.name);
        const gameRes = await api.get(`/jeux/${categoryRes.data.gameId}`);
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

  const makeKey = (sectionId, stepId) => `${sectionId}${KEY_SEP}${stepId}`;

  const handleStepChange = (sectionId, stepId, field, value) => {
    setGuide((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section._id !== sectionId ? section : {
          ...section,
          steps: section.steps.map((step) =>
            step._id !== stepId ? step : { ...step, [field]: value }
          ),
        }
      ),
    }));
  };

  const handleAddStep = async (sectionId) => {
    try {
      const section = guide.sections.find((s) => s._id === sectionId);
      const res = await api.post("/steps", {
        sectionId, order: (section.steps?.length ?? 0) + 1,
        content: "", mediaType: "none", mediaUrl: "",
      });
      setGuide((prev) => ({
        ...prev,
        sections: prev.sections.map((s) =>
          s._id !== sectionId ? s : { ...s, steps: [...(s.steps ?? []), res.data] }
        ),
      }));
      toast.success("Étape ajoutée");
    } catch {
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
          s._id !== sectionId ? s : { ...s, steps: s.steps.filter((step) => step._id !== stepId) }
        ),
      }));
      toast.success("Étape supprimée");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleFileChange = (sectionId, stepId, file) => {
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) { toast.error("Format non supporté"); return; }
    const key = makeKey(sectionId, stepId);
    setNewMediaFiles((prev) => ({ ...prev, [key]: file }));
    if (isImage) setMediaPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    handleStepChange(sectionId, stepId, "mediaType", isVideo ? "video" : "image");
  };

  const sanitizeFolderName = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const uploadToCloudinary = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder",
      `${sanitizeFolderName(gameTitle)}/${sanitizeFolderName(categoryTitle)}/${type === "video" ? "videos" : "guideImg"}`
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type === "video" ? "video" : "image"}/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    if (!res.ok) throw new Error("Upload échoué");
    return data.secure_url;
  };

  const handleSave = async () => {
    setSaving(true); setUploading(true);
    try {
      const uploadedUrls = {};
      for (const [key, file] of Object.entries(newMediaFiles)) {
        const sepIndex = key.indexOf(KEY_SEP);
        const sectionId = key.slice(0, sepIndex);
        const stepId = key.slice(sepIndex + KEY_SEP.length);
        const section = guide.sections.find((s) => s._id === sectionId);
        const step = section?.steps.find((s) => s._id === stepId);
        if (!step) continue;
        const type = file.type.startsWith("video/") ? "video" : "image";
        const newUrl = await uploadToCloudinary(file, type);
        uploadedUrls[stepId] = { mediaUrl: newUrl, mediaType: type };
      }
      for (const section of guide.sections) {
        await api.put(`/sections/${section._id}`, { title: section.title });
        for (const step of section.steps) {
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
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false); setUploading(false);
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

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          <Card>
            <CardHeader>
              <Title>Modifier le <span>guide</span></Title>
              <BackLink to={-1}><ArrowLeftIcon size={14} /> Retour</BackLink>
            </CardHeader>

            {(guide.sections ?? []).map((section) => (
              <SectionBlock key={section._id}>
                <SectionTitleBar>
                  <SectionLabel>Section</SectionLabel>
                  <StepHeader>{section.title}</StepHeader>
                </SectionTitleBar>

                <Field>
                  <Label>Titre de la section</Label>
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      setGuide((prev) => ({
                        ...prev,
                        sections: prev.sections.map((s) =>
                          s._id !== section._id ? s : { ...s, title: e.target.value }
                        ),
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
                          <FileLabel>
                            <ImageIcon size={14} />
                            {newMediaFiles[key] ? "Changer le fichier" : "Choisir un fichier"}
                            <input
                              type="file"
                              accept={step.mediaType === "image" ? "image/*" : "video/*"}
                              onChange={(e) => handleFileChange(section._id, step._id, e.target.files[0])}
                              disabled={uploading}
                            />
                          </FileLabel>
                          {step.mediaType === "image" && (mediaPreviews[key] || step.mediaUrl) && (
                            <ImagePreview src={mediaPreviews[key] || step.mediaUrl} alt={step.content} />
                          )}
                        </Field>
                      )}

                      <StepActions>
                        <IconButton onClick={(e) => handleDeleteStep(e, step._id, section._id)}>
                          <Trash2Icon size={14} />
                        </IconButton>
                      </StepActions>
                    </StepCard>
                  );
                })}

                <AddStepButton type="button" onClick={() => handleAddStep(section._id)}>
                  <PlusIcon size={14} />
                  Ajouter une étape
                </AddStepButton>
              </SectionBlock>
            ))}

            <CardFooter>
              <CancelLink to={-1}>Annuler</CancelLink>
              <SaveButton disabled={saving || uploading} onClick={handleSave}>
                {uploading ? "Upload..." : saving ? "Sauvegarde..." : "Sauvegarder"}
              </SaveButton>
            </CardFooter>
          </Card>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

export default GuideDetail;