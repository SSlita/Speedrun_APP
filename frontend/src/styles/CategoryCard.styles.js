import styled from "styled-components";
import { Link } from "react-router";

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;
