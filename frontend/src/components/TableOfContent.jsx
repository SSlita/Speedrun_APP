import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import * as S from '../styles/TableOfContent.styles.js';

const TableOfContent = ({ guides }) => {
    return (
        <S.TableOfContent>
            <S.StyledAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Sommaire
                </AccordionSummary>
                <AccordionDetails>
                    <nav>
                        <ul>
                            {guides.flatMap(guide =>
                                (guide.sections ?? []).map(section =>
                                    <S.GuideList key={`${section._id}-${section.title}`}>
                                        <S.LienGuide href={`#${section._id}`}>
                                            {section.title}
                                        </S.LienGuide>
                                    </S.GuideList>
                                )
                            )}
                        </ul>
                    </nav>
                </AccordionDetails>
            </S.StyledAccordion>
        </S.TableOfContent>
    );
};

export default TableOfContent;