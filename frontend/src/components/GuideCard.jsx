import { useEffect, useRef } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as S from "../styles/GuideCard.styles";

const LazyVideo = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = src;
          video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <S.Video
      ref={videoRef}
      muted
      loop
      playsInline
    />
  );
};

const GuideCard = ({ guide }) => {
  return (
    <>
      {(guide.sections ?? []).map((section) => (
        <S.StyledAccordion key={section._id}>
          <S.StyledSummaryAccordion
            id={`${section._id}`}
            expandIcon={<ExpandMoreIcon />}
          >
            <S.StepTitle>{section.title}</S.StepTitle>
          </S.StyledSummaryAccordion>
          <AccordionDetails>
            {(section.steps ?? []).map((step) => (
              <S.Step key={step._id} id={`${section._id}-${step.order}`}>
                <S.StepContent>{step.content}</S.StepContent>
                {step.mediaType === "image" && step.mediaUrl && (
                  <S.Image
                    src={step.mediaUrl}
                    loading="lazy"
                    alt={step.content || "Image de l'étape"}
                    width="800"
                    height="600"
                  />
                )}
                {step.mediaType === "video" && step.mediaUrl && (
                  <LazyVideo src={step.mediaUrl} />
                )}
              </S.Step>
            ))}
          </AccordionDetails>
        </S.StyledAccordion>
      ))}
    </>
  );
};

export default GuideCard;
