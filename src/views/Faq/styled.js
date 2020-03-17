import styled from 'styled-components';
import { theme, Collapse, H1, ContentBlock, Link } from 'bitcoincom-storybook';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;
export const HeadSection = styled.div`
  background-color: ${theme.palette.background.dark};
`;

export const CustomCollapse = styled(Collapse)``;

export const CustomContentBlock = styled(ContentBlock)``;

export const FaqTitle = styled(H1)``;

export const FaqLink = styled(Link)`
  padding-top: 24px;
`;
