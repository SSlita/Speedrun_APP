import styled from "styled-components";
import { Link } from "react-router";

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

export const ContentLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

export const GuidesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;