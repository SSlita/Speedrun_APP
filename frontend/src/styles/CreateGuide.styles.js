import styled from "styled-components";

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
  max-width: 620px;
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
`;

export const Title = styled.h2`
  font-family: "Orbitron", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #2a1f14;
  margin: 0 0 4px;
  letter-spacing: 1px;
  text-transform: uppercase;

  span { color: #e85d04; }
`;

export const GameFolder = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #b0a090;
  margin: 0;

  strong {
    color: #e85d04;
    font-weight: 800;
  }
`;

export const Form = styled.form`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const sharedInputStyle = `
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid #e0d8cc;
  background: #fdfaf6;
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
  min-height: 120px;
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

export const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const RadioOption = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid ${({ $active }) => $active ? "#e85d04" : "#e0d8cc"};
  background: ${({ $active }) => $active ? "#fff8f4" : "#fdfaf6"};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  transition: all 0.15s ease;
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: ${({ $active }) => $active ? "#e85d04" : "#7a6a55"};

  input[type="radio"] { display: none; }

  &:hover:not([data-disabled]) {
    border-color: #e85d04;
    background: #fff8f4;
  }
`;

export const RadioIcon = styled.span`
  font-size: 16px;
`;

export const HintText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #c0b09a;
  margin: 0;
`;

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px dashed #e0d8cc;
  background: #fdfaf6;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #7a6a55;

  &:hover { border-color: #e85d04; background: #fff8f4; color: #e85d04; }
  input[type="file"] { display: none; }
`;

export const Preview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1.5px solid #e0d8cc;
  margin-top: 4px;
`;

export const UploadStatus = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $success }) => $success ? "#4a7c59" : "#b0a090"};
  margin: 4px 0 0;
`;

export const CardFooter = styled.div`
  padding: 4px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SubmitButton = styled.button`
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
  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;

export const FinishButton = styled.button`
  width: 100%;
  padding: 14px;
  background: transparent;
  color: #4a7c59;
  border: 1.5px solid #4a7c59;
  border-radius: 8px;
  font-family: "Orbitron", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #4a7c59;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(74, 124, 89, 0.3);
  }
`;

export const SectionsPreview = styled.div`
  margin: 0 28px 28px;
  padding: 16px 20px;
  background: #fdfaf6;
  border: 1px solid #f0e8da;
  border-radius: 8px;
`;

export const SectionsTitle = styled.h3`
  font-family: "Orbitron", sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #7a6a55;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 12px;
`;

export const SectionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SectionItem = styled.li`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #2a1f14;
  padding: 6px 10px;
  background: #ffffff;
  border-radius: 6px;
  border-left: 3px solid #e85d04;
`;