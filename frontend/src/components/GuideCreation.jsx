import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ImageIcon } from "lucide-react";
import {
  Card, CardHeader, Title, GameFolder,
  Form, Field, Label, Input, Textarea, Select,
  RadioGroup, RadioOption, RadioIcon, HintText,
  FileLabel, Preview, UploadStatus,
  CardFooter, SubmitButton, FinishButton,
  SectionsPreview, SectionsTitle, SectionsList, SectionItem,
} from "../styles/CreateGuide.styles";

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

const GuideCreation = ({ categoryId }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [gameTitle, setGameTitle] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [guideId, setGuideId] = useState(null);
  const [sections, setSections] = useState([]);
  const [creationType, setCreationType] = useState("section");
  const [newSection, setNewSection] = useState({ title: "" });
  const [newStep, setNewStep] = useState({
    sectionId: "", content: "", mediaType: "none", mediaUrl: "",
  });

  useEffect(() => {
    const fetchCategoryAndGame = async () => {
      try {
        const categoryRes = await api.get(`/categories/${categoryId}`);
        setCategoryTitle(categoryRes.data.name);
        const gameRes = await api.get(`/jeux/${categoryRes.data.gameId}`);
        setGameTitle(gameRes.data.title);
      } catch (error) {
        console.error("Erreur récupération jeu:", error);
      }
    };
    fetchCategoryAndGame();
  }, [categoryId]);

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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !gameTitle) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) { toast.error("Image ou vidéo uniquement"); return; }
    if (isImage) setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const folder = `${sanitizeFolderName(gameTitle)}/${sanitizeFolderName(categoryTitle)}/${isVideo ? "videos" : "guideImg"}`;
      const url = await uploadToMinio(file, folder);
      setNewStep((prev) => ({ ...prev, mediaUrl: url, mediaType: isVideo ? "video" : "image" }));
      toast.success(`${isVideo ? "Vidéo" : "Image"} uploadée !`);
    } catch {
      toast.error("Échec de l'upload");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const ensureGuideExists = async () => {
    if (guideId) return guideId;
    const res = await api.post("/guides", { categoryId });
    setGuideId(res.data._id);
    return res.data._id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (creationType === "section") {
        if (!newSection.title.trim()) { toast.error("Titre requis"); return; }
        const currentGuideId = await ensureGuideExists();
        const res = await api.post("/sections", {
          guideId: currentGuideId,
          title: newSection.title,
          order: sections.length + 1,
        });
        setSections([...sections, res.data]);
        setNewSection({ title: "" });
        toast.success("Section ajoutée !");
      } else {
        if (!newStep.sectionId) { toast.error("Sélectionnez une section"); return; }
        if (!newStep.content.trim()) { toast.error("Contenu requis"); return; }
        await ensureGuideExists();
        await api.post("/steps", {
          sectionId: newStep.sectionId,
          order: 1,
          content: newStep.content,
          mediaType: newStep.mediaType,
          mediaUrl: newStep.mediaUrl,
        });
        setNewStep({ sectionId: newStep.sectionId, content: "", mediaType: "none", mediaUrl: "" });
        setPreview(null);
        toast.success("Étape ajoutée !");
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Title>Nouveau <span>guide</span></Title>
        {gameTitle && (
          <GameFolder>Dossier : <strong>{sanitizeFolderName(gameTitle)}</strong></GameFolder>
        )}
      </CardHeader>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Que voulez-vous ajouter ?</Label>
          <RadioGroup>
            <RadioOption $active={creationType === "section"}>
              <input type="radio" value="section" checked={creationType === "section"}
                onChange={(e) => setCreationType(e.target.value)} />
              <RadioIcon>📚</RadioIcon>Section
            </RadioOption>
            <RadioOption $active={creationType === "step"} $disabled={sections.length === 0}>
              <input type="radio" value="step" checked={creationType === "step"}
                onChange={(e) => setCreationType(e.target.value)}
                disabled={sections.length === 0} />
              <RadioIcon>📝</RadioIcon>Étape
            </RadioOption>
          </RadioGroup>
          {sections.length === 0 && (
            <HintText>Créez d'abord une section avant d'ajouter des étapes</HintText>
          )}
        </Field>
        {creationType === "section" && (
          <Field>
            <Label>Titre de la section *</Label>
            <Input type="text" placeholder="Ex: Installation, Configuration..."
              value={newSection.title}
              onChange={(e) => setNewSection({ title: e.target.value })} />
          </Field>
        )}
        {creationType === "step" && (
          <>
            <Field>
              <Label>Section *</Label>
              <Select value={newStep.sectionId}
                onChange={(e) => setNewStep({ ...newStep, sectionId: e.target.value })}>
                <option value="">Choisissez une section</option>
                {sections.map((s) => <option key={s._id} value={s._id}>{s.title}</option>)}
              </Select>
            </Field>
            <Field>
              <Label>Contenu *</Label>
              <Textarea rows={5} placeholder="Décrivez cette étape..."
                value={newStep.content}
                onChange={(e) => setNewStep({ ...newStep, content: e.target.value })} />
            </Field>
            <Field>
              <Label>Média (optionnel)</Label>
              <Select value={newStep.mediaType}
                onChange={(e) => {
                  setNewStep({ ...newStep, mediaType: e.target.value, mediaUrl: "" });
                  setPreview(null);
                }}>
                <option value="none">Aucun</option>
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
              </Select>
            </Field>
            {newStep.mediaType !== "none" && (
              <Field>
                <Label>Uploader {newStep.mediaType === "image" ? "une image" : "une vidéo"}</Label>
                <FileLabel>
                  <ImageIcon size={16} />
                  {newStep.mediaUrl ? "Changer le fichier" : "Choisir un fichier"}
                  <input type="file"
                    accept={newStep.mediaType === "image" ? "image/*" : "video/*"}
                    onChange={handleFileChange} disabled={uploading || !gameTitle} />
                </FileLabel>
                {uploading && <UploadStatus>Upload en cours...</UploadStatus>}
                {preview && newStep.mediaType === "image" && <Preview src={preview} alt="Aperçu" />}
                {newStep.mediaUrl && !uploading && (
                  <UploadStatus $success>Fichier uploadé avec succès</UploadStatus>
                )}
              </Field>
            )}
          </>
        )}
      </Form>
      <CardFooter>
        <SubmitButton type="submit" onClick={handleSubmit}
          disabled={loading || uploading ||
            (creationType === "step" && newStep.mediaType !== "none" && !newStep.mediaUrl)}>
          {loading ? "Ajout en cours..." : uploading ? "Upload en cours..." :
           creationType === "section" ? "Ajouter la section" : "Ajouter l'étape"}
        </SubmitButton>
        {sections.length > 0 && (
          <FinishButton type="button"
            onClick={async () => {
              await queryClient.invalidateQueries({ queryKey: ["guides", categoryId] });
              toast.success("Guide créé !");
              navigate(`/category/${categoryId}`);
            }}>
            Terminer et voir le guide
          </FinishButton>
        )}
      </CardFooter>
      {sections.length > 0 && (
        <SectionsPreview>
          <SectionsTitle>Sections créées</SectionsTitle>
          <SectionsList>
            {sections.map((s) => <SectionItem key={s._id}>{s.title}</SectionItem>)}
          </SectionsList>
        </SectionsPreview>
      )}
    </Card>
  );
};

export default GuideCreation;