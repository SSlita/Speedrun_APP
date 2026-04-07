import styled from "styled-components";
import { Link } from "react-router";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BackLink = styled(Link)`
  align-self: flex-start;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

export const StepCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #f9fafb;
`;

export const StepHeader = styled.h3`
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
`;

const inputStyle = `
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const Input = styled.input`${inputStyle}`;
export const Textarea = styled.textarea`${inputStyle}`;
export const Select = styled.select`${inputStyle}`;

export const ImagePreview = styled.img`
  margin-top: 0.75rem;
  max-width: 100%;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const CancelLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
`;

export const SaveButton = styled.button`
  background: #3b82f6;
  color: #fff;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LoaderWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.button`
  background-color: #0b0e14;
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;
  color: #9ca3af;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1f2937;
    color: #ffffff;
  }
`;
