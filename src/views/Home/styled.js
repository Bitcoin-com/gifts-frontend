import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.background.contrast};
`;

export const HeadSection = styled.div`
  background-color: ${({ theme }) => theme.palette.background.dark};
`;
