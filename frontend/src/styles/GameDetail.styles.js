import styled from "styled-components";
import { Link } from "react-router";

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 2.5rem auto;
  padding: 0 1rem;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
`;

export const Input = styled.input`
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
`;

export const SaveButton = styled.button`
  align-self: flex-start;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;
