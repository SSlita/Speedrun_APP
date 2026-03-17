import styled from "styled-components";
import { Link } from "react-router";

export const Card = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  border-radius: 20px;
  overflow: visible;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  position: relative;
  border: 3px solid transparent;
  padding: 16px;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
    border-color: #5fdfb8;
  }
`;

export const CardInner = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: contents;
`;

export const CoverImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 2px solid #e0e0e0;
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
  letter-spacing: 0.3px;
  line-height: 1.3;
  flex: 1;
  overflow-wrap: break-word
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: auto;
`;

export const IconButton = styled.button`
  background: linear-gradient(135deg, #5fdfb8 0%, #6ee8c0 100%);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(95, 223, 184, 0.4);
  flex-shrink: 0;
  
  svg {
    color: white;
    stroke-width: 2.5;
  }
  
  &:hover {
    background: linear-gradient(135deg, #7fffd4 0%, #8fffd8 100%);
    transform: scale(1.15);
    box-shadow: 0 5px 12px rgba(95, 223, 184, 0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:last-child {
    background: linear-gradient(135deg, #ff6b9d 0%, #ff7aa8 100%);
    box-shadow: 0 3px 8px rgba(255, 107, 157, 0.4);
    
    &:hover {
      background: linear-gradient(135deg, #ff7aa8 0%, #ff89b3 100%);
      box-shadow: 0 5px 12px rgba(255, 107, 157, 0.5);
    }
  }
`;