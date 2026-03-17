import styled from "styled-components";

export const Card = styled.article`
  background-color: #161a23;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;


export const Step = styled.section`
  background-color: #0b0e14;
  border-left: 3px solid #3b82f6;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
`;


export const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #e5e7eb;
  letter-spacing: 0.03em;
`;


export const StepContent = styled.p`
  font-size: 1rem;
  color: #9ca3af;
  line-height: 1.7;
  white-space: pre-line;
`;


const mediaStyle = `
  
  border-radius: 12px;
  margin-top: 1rem;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
`;


export const Image = styled.img`
  ${mediaStyle}
  max-width: 100%;
  height: auto;
`;

export const Video = styled.video`
  ${mediaStyle}
  width: 100%;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #1f2937;
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



