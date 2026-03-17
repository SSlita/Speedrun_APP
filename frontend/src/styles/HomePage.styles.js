import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #5fdfb8 0%, #7fffd4 100%);
  padding: 20px;
`;

export const StatusMessage = styled.div`
  text-align: center;
  color: #2d5a4a;
  font-size: 18px;
  margin-top: 100px;
  font-weight: 500;
`;

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;