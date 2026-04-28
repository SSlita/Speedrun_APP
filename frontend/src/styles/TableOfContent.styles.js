import styled from "styled-components";
import Accordion from '@mui/material/Accordion';

export const TableOfContent = styled.div`
  position: sticky;
  top: 1rem;
  align-self: flex-start;
  width: 250px;
  flex-shrink: 0;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
`;

export const GuideList = styled.li`
  list-style: none;
`

export const LienGuide = styled.a`
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`

export const StyledAccordion = styled(Accordion)`
  background-color: #f0ebeb !important;
`

