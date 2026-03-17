import styled from "styled-components";
import { Link } from "react-router";

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Header = styled.header`
  background-color: #1f2937;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const CreateLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #2563eb;
  }
`;

export const StatusMessage = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;
