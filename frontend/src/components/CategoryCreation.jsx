import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import api from '../lib/axios';

const CategoryCreation = ( {gameId} ) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !gameId.trim()) {
            toast.error("Remplissez tous le champs");
            return;
        }

        setLoading(true);

        try {
            await api.post("/categories", {
                name,
                gameId,
            });
            toast.success("Catégorie ajouté avec succès");
            navigate(`/game/${gameId}`);
        } catch (error) {
            toast.error("Erreur lors de l'ajout de la catégorie");
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div><h2> Créer une nouvelle catégorie </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <span>Nom</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Titre de la catégorie"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Création..." : "Créer la catégorie"}
                    </button>
                </div>
            </form></div>
    )
}

export default CategoryCreation;