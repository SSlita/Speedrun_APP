import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

export const Step = styled.section`
  padding: 16px 20px;
  
  &:not(:last-child) {
    border-bottom: 1px solid #f0e8da;
  }
`;

export const StepTitle = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #2a1f14;
  margin: 0;
  letter-spacing: -0.1px;
  text-align: center;
`;

export const StepContent = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  color: #6a5a48;
  line-height: 1.7;
  white-space: pre-line;
  margin: 0;
`;

const mediaStyle = `
  border-radius: 8px;
  margin-top: 12px;
  box-shadow: 0 4px 16px rgba(12, 24, 36, 0.12);
`;

export const Image = styled.img`
  ${mediaStyle}
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

export const Video = styled.video`
  ${mediaStyle}
  width: 100%;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding: 10px 16px;
  border-top: 1px solid #f0e8da;
  background: #fdfaf6;
  border-radius: 0 0 10px 10px;
`;

export const IconButton = styled.button`
  background: #f5efe4;
  border: 1px solid #e8ddd0;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    color: #8a7a6a;
    stroke-width: 2.5;
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: #ede4d4;
    border-color: #d8ccbc;
    transform: scale(1.1);
    svg { color: #2a1f14; }
  }

  &:last-child:hover {
    background: #fff0f0;
    border-color: #e60012;
    svg { color: #e60012; }
  }

  &:active { transform: scale(0.95); }
`;

export const StyledAccordion = styled(Accordion)`
  && {
    background: #ffffff !important;
    border: 1px solid #e0d8cc !important;
    border-left: 4px solid #e85d04 !important;
    border-radius: 10px !important;
    box-shadow: none !important;
    overflow: hidden;
    transition: box-shadow 0.2s ease, border-color 0.2s ease !important;

    &:before { display: none; }

    &:hover {
      box-shadow: 0 8px 24px rgba(12, 24, 36, 0.1) !important;
    }

    &.Mui-expanded {
      border-color: #e85d04 !important;
      box-shadow: 0 8px 24px rgba(12, 24, 36, 0.1) !important;
      margin: 0 !important;
    }
  }
`;

export const StyledSummaryAccordion = styled(AccordionSummary)`
  && {
    background: #fdfaf6;
    border-bottom: 1px solid #f0e8da;
    min-height: 52px !important;
    padding: 0 16px;

    .MuiAccordionSummary-content {
      justify-content: center;
      margin: 14px 0 !important;
    }

    .MuiAccordionSummary-expandIconWrapper {
      color: #e85d04;
    }
  }
`;
