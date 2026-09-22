import styled from "styled-components";
import { Link } from "react-router";

export const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e0d8cc;
  border-left: 4px solid #e85d04;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(12, 24, 36, 0.12);
    border-color: #e85d04;
  }
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex: 1;
  padding: 18px 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CategoryLabel = styled.span`
  font-family: "Orbitron", sans-serif;
  font-size: 9px;
  font-weight: 700;
  color: #c44d00;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const Title = styled.h2`
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #2a1f14;
  margin: 0;
  letter-spacing: -0.1px;
  line-height: 1.3;
`;

export const ArrowHint = styled.span`
  font-size: 11px;
  color: #c0b09a;
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  transition: color 0.2s ease, gap 0.2s ease;

  ${Card}:hover & {
    color: #e85d04;
    gap: 7px;
  }
`;

export const Footer = styled.div`
  padding: 8px 16px;
  border-top: 1px solid #f0e8da;
  background: #fdfaf6;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const Actions = styled.div`
  display: flex;
  gap: 6px;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  margin-left: auto;

  ${Card}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
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
