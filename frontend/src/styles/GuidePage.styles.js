import styled from "styled-components";
import { Link } from "react-router";

export const PageContainer = styled.div`
  max-width: 1400px;
  margin: 1.5rem auto;
  padding: 0 1.5rem;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1.5rem;

  &:hover {
    color: #e5e7eb;
  }
`;

export const Header = styled.header`
  background: linear-gradient(180deg, #161a23, #0b0e14);
  padding: 1rem 1.5rem;
  border-radius: 14px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  color: #e5e7eb;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

export const CreateLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #2563eb;
  }
`;

export const StatusMessage = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

export const GuidesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  flex: 1;
  min-width: 0;
`;

export const ContentLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;
