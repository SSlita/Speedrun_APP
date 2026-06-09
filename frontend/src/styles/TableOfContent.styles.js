import styled from "styled-components";
import Accordion from "@mui/material/Accordion";

export const TableOfContent = styled.div`
  position: sticky;
  top: 88px;
  align-self: flex-start;
  width: 240px;
  flex-shrink: 0;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
`;

export const GuideList = styled.li`
  list-style: none;
  padding: 2px 0;
`;

export const LienGuide = styled.a`
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #7a6a55;
  display: block;
  padding: 5px 8px;
  border-radius: 5px;
  transition: all 0.15s ease;

  &:hover {
    color: #e85d04;
    background: rgba(232, 93, 4, 0.07);
    padding-left: 12px;
  }
`;

export const StyledAccordion = styled(Accordion)`
  && {
    background: #ffffff !important;
    border: 1px solid #e0d8cc !important;
    border-left: 4px solid #e85d04 !important;
    border-radius: 10px !important;
    box-shadow: none !important;

    &:before { display: none; }

    .MuiAccordionSummary-root {
      background: #fdfaf6;
      border-radius: 10px;
      font-family: "Orbitron", sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #2a1f14;
      min-height: 48px !important;
    }

    .MuiAccordionSummary-expandIconWrapper {
      color: #e85d04;
    }

    .MuiAccordionDetails-root {
      padding: 8px 12px 12px;
    }

    ul {
      padding: 0;
      margin: 0;
    }
  }
`;