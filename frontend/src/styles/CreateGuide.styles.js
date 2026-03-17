import styled from "styled-components";
import { Link } from "react-router";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;      /* centre horizontalement */
  justify-content: center;  /* centre verticalement */
  padding: 0 1rem;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1.75rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.75rem;
  color: #111827;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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

const inputStyle = `
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const Input = styled.input`
  ${inputStyle}
`;

export const Textarea = styled.textarea`
  ${inputStyle}
  resize: vertical;
`;

export const Select = styled.select`
  ${inputStyle}
  background-color: white;
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
