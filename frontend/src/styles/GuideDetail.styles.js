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

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0d8cc;
  border-top: 4px solid #e85d04;
  box-shadow: 0 8px 32px rgba(12, 24, 36, 0.08);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 24px 28px 20px;
  border-bottom: 1px solid #f0e8da;
  background: #fdfaf6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  font-family: "Orbitron", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #2a1f14;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;

  span { color: #e85d04; }
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

export const SectionBlock = styled.div`
  padding: 24px 28px;
  border-bottom: 1px solid #f0e8da;

  &:last-of-type { border-bottom: none; }
`;

export const SectionTitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

export const SectionLabel = styled.span`
  font-family: "Orbitron", sans-serif;
  font-size: 9px;
  font-weight: 700;
  color: #e85d04;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  flex-shrink: 0;
`;

export const StepHeader = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #2a1f14;
  margin: 0;
`;

export const StepCard = styled.div`
  background: #fdfaf6;
  border: 1px solid #ede5d8;
  border-left: 3px solid #e85d04;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 12px;

  &:last-of-type { margin-bottom: 0; }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;

  &:last-child { margin-bottom: 0; }
`;

export const Label = styled.label`
  font-family: "Orbitron", sans-serif;
  font-size: 9px;
  font-weight: 700;
  color: #7a6a55;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const sharedInputStyle = `
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px solid #e0d8cc;
  background: #ffffff;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #2a1f14;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &::placeholder { color: #c0b09a; font-weight: 500; }

  &:focus {
    outline: none;
    border-color: #e85d04;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.1);
  }
`;

export const Input = styled.input`${sharedInputStyle}`;

export const Textarea = styled.textarea`
  ${sharedInputStyle}
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
`;

export const Select = styled.select`
  ${sharedInputStyle}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23e85d04' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
`;

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1.5px dashed #e0d8cc;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #7a6a55;

  &:hover { border-color: #e85d04; background: #fff8f4; color: #e85d04; }
  input[type="file"] { display: none; }
`;

export const ImagePreview = styled.img`
  margin-top: 8px;
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1.5px solid #e0d8cc;
`;

export const AddStepButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 8px 14px;
  background: transparent;
  border: 1.5px dashed #e0d8cc;
  border-radius: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #7a6a55;
  cursor: pointer;
  transition: all 0.15s ease;
  width: 100%;
  justify-content: center;

  &:hover {
    border-color: #e85d04;
    color: #e85d04;
    background: #fff8f4;
  }
`;

export const StepActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const CardFooter = styled.div`
  padding: 20px 28px 24px;
  border-top: 1px solid #f0e8da;
  background: #fdfaf6;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

export const CancelLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1.5px solid #e0d8cc;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #7a6a55;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover { border-color: #c0b09a; color: #2a1f14; }
`;

export const SaveButton = styled.button`
  padding: 12px 28px;
  background: #e85d04;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: "Orbitron", sans-serif;
  font-size: 11px;
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
  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;

export const IconButton = styled.button`
  background: #fff0f0;
  border: 1px solid #f5d0d0;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  svg { color: #e60012; stroke-width: 2.5; width: 14px; height: 14px; }

  &:hover {
    background: #ffe0e0;
    border-color: #e60012;
    transform: scale(1.1);
  }
  &:active { transform: scale(0.95); }
`;

export const LoaderWrapper = styled.div`
  min-height: 100vh;
  background: #f0ebe0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e85d04;
`;