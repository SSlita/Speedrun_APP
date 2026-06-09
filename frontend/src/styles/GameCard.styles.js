import styled from "styled-components";
import { Link } from "react-router";

export const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e0d8cc;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 10px 32px rgba(12, 24, 36, 0.14);
    border-color: #e85d04;
  }

  &:hover .card-actions {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CardInner = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
`;

export const CoverWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f5efe4;
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

export const CoverPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5efe4 0%, #ede4d4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

export const PlatformBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #0c1824;
  color: #ffbe0b;
  font-family: "Orbitron", sans-serif;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  z-index: 2;
`;

export const CardFooter = styled.div`
  padding: 9px 11px 11px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid #f0e8da;
`;

export const Title = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #2a1f14;
  margin: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.1px;
`;

export const TitleRow = styled.div``;
export const CardContent = styled.div``;

export const Actions = styled.div`
  display: flex;
  gap: 5px;
  flex-shrink: 0;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const IconButton = styled.button`
  background: #f5efe4;
  border: 1px solid #e8ddd0;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  svg {
    color: #8a7a6a;
    stroke-width: 2.5;
    width: 13px;
    height: 13px;
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