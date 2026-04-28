import styled from "styled-components";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

export const Card = styled.article`
  background-color: #161a23;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

export const Step = styled.section`
  padding: 1.25rem 1.5rem;
  
  &:not(:last-child) {
    border-bottom: 2px solid white;
  }
`;

export const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 0.03em;
  text-align: center;
`;

export const StepContent = styled.p`
  font-size: 1rem;
  color: #9ca3af;
  line-height: 1.7;
  white-space: pre-line;
`;

const mediaStyle = `
  border-radius: 12px;
  margin-top: 1rem;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
`;

export const Image = styled.img`
  ${mediaStyle}
  max-width: 100%;
  height: auto;
`;

export const Video = styled.video`
  ${mediaStyle}
  width: 100%;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1.25rem;
`;

export const IconButton = styled.button`
  background-color: #0b0e14;
  border: none;
  border-radius: 10px;
  padding: 0.8rem;
  cursor: pointer;
  color: #9ca3af;
  margin: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1f2937;
    color: #ffffff;
  }
`;

export const StyledAccordion = styled(Accordion)`
  background-color: #0b0e14 !important;
  color: #e5e7eb !important;
`;

export const StyledSummaryAccordion = styled(AccordionSummary)`
  color: #e5e7eb;

  .MuiAccordionSummary-expandIconWrapper {
    color: #e5e7eb;
  }

  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    color: #e5e7eb;
  }

  /* Centrer le contenu du summary */
  .MuiAccordionSummary-content {
    justify-content: center;
  }
`;