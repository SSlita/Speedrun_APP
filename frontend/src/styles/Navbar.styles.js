import styled from "styled-components";
import { Link } from "react-router";

export const Header = styled.header`
  background: linear-gradient(180deg, #5fdfb8 0%, #6ee8c0 100%);
  padding: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const NavContainer = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 80px;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  border: 4px solid #e0e0e0;
  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
  color: #888;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  
  &::after {
    content: "GAME BOY";
    position: absolute;
    bottom: 8px;
    font-size: 10px;
    color: #888;
    letter-spacing: 1px;
  }
`;

export const CreateLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  color: #2d5a4a;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.8);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    stroke-width: 2.5;
  }
`;