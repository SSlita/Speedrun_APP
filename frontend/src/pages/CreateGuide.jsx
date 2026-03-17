import { useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

import { PageContainer, BackLink } from "../styles/CreateGuide.styles";
import GuideCreation from "../components/GuideCreation";

const CreateGuide = () => {
    const { categoryId } = useParams();

    return (
        <PageContainer>
            <BackLink to={`/category/${categoryId}`}>
                <ArrowLeftIcon size={18} />
                Retour à la catégorie
            </BackLink>

            <GuideCreation
                categoryId={categoryId} />
        </PageContainer>
    );
};

export default CreateGuide;
