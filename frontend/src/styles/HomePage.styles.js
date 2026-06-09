import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #f0ebe0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(12, 24, 36, 0.06) 1px, transparent 0);
  background-size: 28px 28px;
  padding: 28px 24px 48px;
`;

export const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const SectionTitle = styled.h2`
  font-family: "Orbitron", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #7a6a55;
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #e85d04;
    color: #ffffff;
    font-size: 11px;
    font-weight: 900;
    padding: 2px 9px;
    border-radius: 4px;
    margin-left: 10px;
    vertical-align: middle;
    font-family: "Nunito", sans-serif;
  }
`;

export const StatusMessage = styled.div`
  text-align: center;
  padding: 80px 20px;

  p {
    font-family: "Orbitron", sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #b0a090;
    margin: 0 0 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  small {
    font-family: "Nunito", sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #c0b09a;
  }
`;

export const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;

  @media (max-width: 1280px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 700px)  { grid-template-columns: repeat(2, 1fr); gap: 10px; }
`;

export const LoadingGrid = styled(GamesGrid)``;

export const SkeletonCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e0d8cc;

  .skeleton-cover {
    width: 100%;
    aspect-ratio: 3 / 4;
    background: linear-gradient(90deg, #f0ebe0 25%, #e8e0d0 50%, #f0ebe0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite;
  }

  .skeleton-footer {
    padding: 9px 11px 11px;
    border-top: 1px solid #ede5d8;
  }

  .skeleton-line {
    height: 12px;
    border-radius: 4px;
    background: linear-gradient(90deg, #f0ebe0 25%, #e8e0d0 50%, #f0ebe0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite;

    &.w-60 { width: 60%; }
    &.w-80 { width: 80%; }
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;