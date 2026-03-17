import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

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
                console.log("Erreur", error);
                toast.error("Impossible de récupérer cette catégorie");
                navigate("/");
            } finally {
                setLoading(false);
            }
        }
        fetchCategory();
    }, [categoryId]);

    const handleSave = async () => {
        if(!category.name.trim()) {
            toast.error("Remplissez tous les champs");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/categories/${categoryId}`, {
                name: category.name,
            });
            toast.success("Catégorie modifié avec succès");
            navigate("/");
        } catch (error) {
            console.log("Erreur", error);
            toast.error("Impossible de modifier cette catégorie");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
    return (
      <div>
        <LoaderIcon />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <Link to="/">
              <ArrowLeftIcon />
              Retour aux catégories
            </Link>
          </div>

          <div>
            <div>
              <div>
                <label>
                  <span>Nom de la catégorie</span>
                </label>
                <input
                  type="text"
                  placeholder="Titre de la catégorie"
                  value={category.name}
                  onChange={(e) => setCategory({ ...category, name: e.target.value })}
                />
              </div>

              <div>
                <button disabled={saving} onClick={handleSave}>
                  {saving ? "Sauvegarde..." : "Sauvegarder le changement"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;