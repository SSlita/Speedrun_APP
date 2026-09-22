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

  @media (max-width: 768px) {
    display: none;
  }
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

export const BurgerButton = styled.button`
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #e85d04;
  border: none;
  cursor: pointer;
  z-index: 100;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(232, 93, 4, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  color: white;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(232, 93, 4, 0.5);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Overlay = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  backdrop-filter: blur(2px);

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Drawer = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fdfaf6;
  border-top: 3px solid #e85d04;
  border-radius: 20px 20px 0 0;
  padding: 20px 20px 40px;
  z-index: 300;
  max-height: 70vh;
  overflow-y: auto;
  transform: translateY(${({ $open }) => $open ? '0' : '100%'});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0d8cc;
`;

export const DrawerTitle = styled.h3`
  font-family: "Orbitron", sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #2a1f14;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #7a6a55;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.15s ease;
  &:hover {
    color: #e85d04;
    background: rgba(232, 93, 4, 0.07);
  }
`;
