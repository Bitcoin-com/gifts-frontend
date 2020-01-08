import styled from 'styled-components';
import {
  theme,
  ContentBlock,
  Image,
  media,
  Button,
  CardContainer,
  Card,
  Table,
  Input,
} from 'bitcoincom-storybook';
import { BadgerButton } from 'badger-components-react';

export const CenteredBadgerButton = styled(BadgerButton)`
  margin: auto;
  & > div {
    margin: auto;
  }
`;

export const TipTable = styled(Table)``;
export const TipTh = styled.td`
  text-align: center;
`;
export const TipTd = styled.td`
  text-align: center;
`;
export const CardButton = styled(Button)`
  margin: auto;
`;
export const WalletCard = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;

export const MakeAndPayTipsCard = styled(Card)`
  & > div {
    margin: auto;
  }
`;

export const CustomCardContainer = styled(CardContainer)`
  display: ${({ show = false }) => (show === true ? 'grid' : 'none')};
`;
export const TipsWrapper = styled.div`
  margin: auto;
`;
export const TipContainer = styled.div`
  display: ${({ show = false }) => (show === true ? 'grid' : 'none')};
  grid-row-gap: 0px;
  grid-column-gap: 0px;
  justify-items: center;

  ${media.sm`
    grid-template-columns: 0fr;
  `}
  ${media.smmd`
    grid-template-columns: ${props => (props.columns >= 2 ? '0fr 0fr' : '0fr')};
  `}
  ${media.md`
    grid-template-columns: ${props =>
      props.columns >= 3 ? '0fr 0fr 0fr' : `repeat(${props.columns}, 0fr)`};
  `}
  ${media.lg`
    grid-template-columns: ${props =>
      props.columns && `repeat(${props.columns}, 0fr)`};
  `}
  & > div {
    max-width: unset;
  }
`;

export const CustomFlexCardContainer = styled(CardContainer)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  padding-bottom: ${theme.spacing.unit * 3}px;
  padding-top: ${theme.spacing.unit}px;
  display: ${({ show = false }) => (show === true ? 'block' : 'none')};

  & > input {
    width: 100%;
    max-width: unset;
    margin: 0;
  }

  @media screen and (min-width: ${theme.breakpoints.md}px) {
    width: 100%;
    padding-top: ${theme.spacing.unit * 2}px;
  }
`;

export const Form = styled.form`
  max-width: 450px;
  text-align: left;
  @media screen and (min-width: ${theme.breakpoints.md}px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const InputError = styled.div`
  color: #f44336;
  font-size: 0.8rem;
`;

export const TipInput = styled(Input)`
  padding-bottom: 0px;
`;

export const Red = styled.span`
  color: #f44336;
`;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const HeadSection = styled.div`
  background-color: ${theme.palette.background.dark};
`;

export const CustomContentBlock = styled(ContentBlock)`
  & > div > div:first-child > img {
    max-height: 300px;
  }

  & h1 {
    ${theme.palette.p3green.text};
  }

  ${media.md`
    & > div {
      justify-content: space-between;
    }

    & > div > div {
      max-width: 46%;
    }

    & > div > div:first-child > img {
      max-height: 400px;
    }
  `};
`;

export const Logo = styled(Image)`
  width: 100%;
  margin-bottom: ${theme.spacing.unit * 2}px;
`;
