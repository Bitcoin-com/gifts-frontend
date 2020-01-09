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

export const BadgerWrap = styled.div`
  margin: auto;
  padding: ${theme.spacing.unit * 3}px;
`;
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    margin-left: ${theme.spacing.unit * 0.5}px;
    margin-right: ${theme.spacing.unit * 0.5}px;
    max-width: 130px;
  }
  ${media.sm`
    & > div {
      margin-left: ${theme.spacing.unit}px;
      margin-right: ${theme.spacing.unit}px;
      max-width: 200px;
    }
  `}
`;
export const TipTable = styled(Table)``;
export const TipTh = styled.td`
  text-align: center;
`;
export const TipTd = styled.td`
  text-align: center;
`;
export const CardButton = styled(Button)``;
export const ButtonHider = styled.div`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;
export const WalletCard = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;
export const TipContainerWrapper = styled.div`
  margin: auto;
  margin-top: ${theme.spacing.unit * 6}px;
  width: ${props => props.maxWidth || '100%'};
  @media only screen and (max-width: 424px) {
  max-width: 2in;
}
  ${media.sm`
    max-width: 4in;
  `}
  ${media.smmd`
    max-width: 6in;
  `}
  ${media.md`
  max-width: 6in;
  `}
  ${media.lg`
  max-width: ${props => props.maxWidth || '100%'};
  `}
`;

export const MakeAndPayTipsCard = styled(Card)``;
export const SeedCard = styled(Card)`
  & > div {
    margin: auto;
  }
`;
export const SeedWrapper = styled.div`
  margin-bottom: ${theme.spacing.unit * 3}px;
  border: 2px solid black;
  padding: ${theme.spacing.unit * 2}px;
  border-radius: 5px;
  & :hover {
    background-color: #0fcb97;
    color: #fff;
    border-color: #0fcb97;
  }
`;
export const SeedWarning = styled.p``;
export const CustomCardContainer = styled(CardContainer)`
  display: ${({ show = false }) => (show === true ? 'grid' : 'none')};
`;
export const CustomInfo = styled.h5`
  text-align: center;
  margin: auto;
  padding-bottom: ${theme.spacing.unit * 2}px;
`;
export const TipsWrapper = styled.div`
  margin: auto;
`;
export const TipContainer = styled.div`
  display: ${({ show = false }) => (show === true ? 'grid' : 'none')};
  grid-row-gap: 0px;
  grid-column-gap: 0px;
  justify-items: center;
  @media print {
    grid-template-columns: ${props =>
      props.columns && `repeat(${props.columns}, 0fr)`}
    }

    @media only screen and (max-width: 424px) {
      grid-template-columns: 0fr;
}


  ${media.sm`
  grid-template-columns: ${props => (props.columns >= 2 ? '0fr 0fr' : '0fr')};
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
