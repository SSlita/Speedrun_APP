import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import {
  FormCard,
  FormHeader,
  FormTitle,
  FormBody,
  FormFooter,
  Field,
  Label,
  Input,
  SubmitButton,
} from "../styles/CategoryCreation.styles";

const CategoryCreation = ({ gameId }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !gameId.trim()) {
      toast.error("Remplissez tous les champs");
      return;
    }
    setLoading(true);
    try {
      await api.post("/categories", { name, gameId });
      toast.success("Catégorie ajoutée avec succès");
      navigate(`/game/${gameId}`);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la catégorie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard>
      <FormHeader>
        <FormTitle>Nouvelle <span>catégorie</span></FormTitle>
      </FormHeader>

      <FormBody>
        <Field>
          <Label>Nom</Label>
          <Input
            type="text"
            placeholder="Titre de la catégorie"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
      </FormBody>

      <FormFooter>
        <SubmitButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Création..." : "Créer la catégorie"}
        </SubmitButton>
      </FormFooter>
    </FormCard>
  );
};

export default CategoryCreation;