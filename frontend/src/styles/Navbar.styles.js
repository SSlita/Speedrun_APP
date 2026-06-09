import styled from "styled-components";
import { Link } from "react-router";

export const Header = styled.header`
  background: #0c1824;
  border-bottom: 3px solid #e85d04;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavContainer = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;
  width: 44px;
  height: 44px;
  background: #e85d04;
  border-radius: 8px;
  position: relative;
  transition: background 0.2s ease, box-shadow 0.2s ease;

  &::before {
    content: "▶";
    font-size: 17px;
    color: #ffffff;
    line-height: 1;
  }

  &:hover {
    background: #ff6b1a;
    box-shadow: 0 4px 16px rgba(232, 93, 4, 0.5);
  }
`;

export const AppTitle = styled.span`
  font-family: "Orbitron", sans-serif;
  font-size: 17px;
  font-weight: 900;
  color: #f0ebe0;
  letter-spacing: 1px;
  flex-shrink: 0;
  text-transform: uppercase;

  span {
    color: #e85d04;
  }
`;

export const SearchContainer = styled.div`
  flex: 1;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    left: 14px;
    width: 15px;
    height: 15px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23e85d04' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 1;
    pointer-events: none;
    opacity: 0.8;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border-radius: 6px;
  border: 1px solid #1e3045;
  background: #0a1520;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #e8e0d5;
  transition: all 0.2s ease;

  &::placeholder {
    color: #3a5068;
    font-weight: 500;
  }

  &:focus {
    outline: none;
    border-color: #e85d04;
    background: #081018;
    box-shadow: 0 0 0 2px rgba(232, 93, 4, 0.15);
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-left: auto;
`;

export const CreateLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 7px;
  background: #e85d04;
  color: #ffffff;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-family: "Orbitron", sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg { stroke-width: 3; }

  &:hover {
    background: #ff6b1a;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(232, 93, 4, 0.45);
  }

  &:active { transform: translateY(0); }
`;

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #7a9ab5;
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #1e3045;
  background: transparent;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: #2e4a65;
    color: #c0d8f0;
    background: #0a1520;
  }
`;