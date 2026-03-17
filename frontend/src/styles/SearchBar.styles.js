import styled from "styled-components";

export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 30px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px 24px;
  border-radius: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  font-size: 15px;
  color: #2d2d2d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: #888;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;