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

export const Notice = styled.div`
  background-color: rgb(45, 50, 59);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;

  img {
    height: 30px;
    padding-right: 10px;
  }

  p {
    padding-bottom: 0px;
  }
`;
