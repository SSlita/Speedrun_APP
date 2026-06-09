import styled from "styled-components";
import { Link } from "react-router";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #f0ebe0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(12, 24, 36, 0.06) 1px, transparent 0);
  background-size: 28px 28px;
  padding: 48px 24px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0d8cc;
  border-top: 4px solid #e85d04;
  box-shadow: 0 8px 32px rgba(12, 24, 36, 0.08);
  overflow: hidden;
  width: 100%;
  max-width: 560px;
`;

export const CardHeader = styled.div`
  padding: 24px 28px 20px;
  border-bottom: 1px solid #f0e8da;
  background: #fdfaf6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.h2`
  font-family: "Orbitron", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #2a1f14;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;

  span {
    color: #e85d04;
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #7a6a55;
  text-decoration: none;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e0d8cc;
  background: #ffffff;
  transition: all 0.15s ease;

  &:hover {
    border-color: #e85d04;
    color: #e85d04;
    background: #fff8f4;
  }
`;

export const Form = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: "Orbitron", sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #7a6a55;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid #e0d8cc;
  background: #fdfaf6;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #2a1f14;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #c0b09a;
    font-weight: 500;
  }

  &:focus {
    outline: none;
    border-color: #e85d04;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.1);
  }
`;

export const CardFooter = styled.div`
  padding: 20px 28px 24px;
  border-top: 1px solid #f0e8da;
  background: #fdfaf6;
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #e85d04;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: "Orbitron", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #ff6b1a;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(232, 93, 4, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const LoaderWrapper = styled.div`
  min-height: 100vh;
  background: #f0ebe0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e85d04;
`;