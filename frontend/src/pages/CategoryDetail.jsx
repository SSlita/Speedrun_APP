import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import {
  PageContainer,
  Card,
  CardHeader,
  CardTitle,
  BackLink,
  Form,
  Field,
  Label,
  Input,
  CardFooter,
  SaveButton,
  LoaderWrapper,
} from "../styles/CategoryDetail.styles";

const CategoryDetail = () => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/categories/${categoryId}`);
        setCategory(res.data);
      } catch (error) {
        toast.error("Impossible de récupérer cette catégorie");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleSave = async () => {
    if (!category.name.trim()) {
      toast.error("Remplissez tous les champs");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/categories/${categoryId}`, { name: category.name });
      toast.success("Catégorie modifiée avec succès");
      navigate(-1);
    } catch {
      toast.error("Impossible de modifier cette catégorie");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoaderWrapper>
          <LoaderIcon size={32} className="animate-spin" />
        </LoaderWrapper>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Modifier la <span>catégorie</span></CardTitle>
            <BackLink to={-1}>
              <ArrowLeftIcon size={14} />
              Retour
            </BackLink>
          </CardHeader>

          <Form>
            <Field>
              <Label>Nom de la catégorie</Label>
              <Input
                type="text"
                placeholder="Titre de la catégorie"
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
              />
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

export default CategoryDetail;