import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MenuIcon } from 'lucide-react';
import * as S from '../styles/TableOfContent.styles.js';

const TableOfContent = ({ guides }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    let sectionIndex = 0;
    const allSections = guides.flatMap(guide =>
        (guide.sections ?? []).map(section => ({
            ...section,
            number: ++sectionIndex
        }))
    );

    const handleClick = (e, sectionId) => {
        e.preventDefault();
        setDrawerOpen(false);
        setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
                const yOffset = -100;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
    };

    const links = allSections.map(section => (
        <S.GuideList key={`${section._id}-${section.title}`}>
            <S.LienGuide
                href={`#${section._id}`}
                onClick={(e) => handleClick(e, section._id)}
            >
                {section.number} - {section.title}
            </S.LienGuide>
        </S.GuideList>
    ));

    return (
        <>
            <S.TableOfContent>
                <S.StyledAccordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        Sommaire
                    </AccordionSummary>
                    <AccordionDetails>
                        <nav><ul>{links}</ul></nav>
                    </AccordionDetails>
                </S.StyledAccordion>
            </S.TableOfContent>

            <S.BurgerButton onClick={() => setDrawerOpen(true)} aria-label="Ouvrir le sommaire">
                <MenuIcon size={22} />
            </S.BurgerButton>

            {drawerOpen && <S.Overlay onClick={() => setDrawerOpen(false)} />}

            <S.Drawer $open={drawerOpen}>
                <S.DrawerHeader>
                    <S.DrawerTitle>Sommaire</S.DrawerTitle>
                    <S.CloseButton onClick={() => setDrawerOpen(false)}>✕</S.CloseButton>
                </S.DrawerHeader>
                <nav><ul style={{ padding: 0, margin: 0 }}>{links}</ul></nav>
            </S.Drawer>
        </>
    );
};

export default TableOfContent;
