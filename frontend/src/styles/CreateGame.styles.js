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
  max-width: 560px;
`;