import styled, { css } from 'styled-components';
import Popup from 'reactjs-popup';
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
  InputLabel,
  Select,
} from 'bitcoincom-storybook';
import DatePicker from 'react-datepicker';

const reset = css`
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  background: none;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

export const CustomSelect = styled(Select)`
  z-index: 2;
  min-width: 185px;
`;

export const ApiErrorPopup = styled(Popup)``;
export const ApiErrorPopupCloser = styled.div`
  position: absolute;
  right: -18px;
  top: -18px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid black;
  color: black;
  background-color: grey;
  opacity: 75%;
  pointer-events: none;
`;
export const ApiErrorPopupMsg = styled.div`
  background-color: #ffbaba;
  color: #d8000c;
  border: 1px solid #d8000c;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
`;

export const SweepAllCard = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
  margin-top: 24px;
`;

export const GiftsControlPanel = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
  margin-top: 24px;
  overflow: visible;
`;
export const ControlPanelForm = styled.div`
  text-align: left;
  margin: 24px auto;
`;

export const ApiErrorCard = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
  margin-top: ${theme.spacing.unit * 3}px;
  padding: ${theme.spacing.unit * 3}px;
  padding-top: ${theme.spacing.unit * 1}px;
  background-color: #ffbaba;
  color: #d8000c;
  border: 1px solid #d8000c;
`;
export const ApiErrorWarning = styled.p`
  max-width: 600px;
  margin-block-start: 0em;
`;

export const CustomDatePicker = styled(DatePicker)`
  ${reset};
  border-radius: ${theme.border.radius.default}px;
  padding: 0 ${theme.spacing.unit * 3}px;
  height: 60px;
  background-color: ${theme.palette.background.default};
  border: ${theme.border.solid.default} ${theme.palette.border.default};
  color: ${theme.palette.text.primary};
  margin: ${theme.spacing.unit}px 0;
  max-width: 450px;
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ${({ padding = false }) =>
    padding &&
    css`
      padding-right: ${theme.spacing.unit * 7}px;
    `};
  &::placeholder {
    color: ${theme.palette.text.placeholder};
  }
  &:focus,
  &:focus-within {
    border-color: ${theme.palette.primary.main};
  }
  ${({ disabled = false }) => {
    if (disabled === false) return '';
    return css`
      background-color: ${theme.palette.background.headerLight};
      border-color: ${theme.palette.text.disabled};
      color: ${theme.palette.text.disabled};
      pointer-events: none;
      &:focus,
      &:focus-within {
        border-color: ${theme.palette.text.disabled};
      }
    `;
  }};
`;

export const AddressInputLabel = styled(InputLabel)`
  text-align: left;
`;
export const HeaderContentBlock = styled(ContentBlock)`
  padding-bottom: 0px;
  & > div > div {
    padding-bottom: 0px;
  }
`;
export const PrintableContentBlock = styled(ContentBlock)`
  @media print {
    margin: 0mm;
    padding: 0mm;
    & > div {
      margin: 10mm 7.5mm;
      padding: 0mm;
      & > div {
        margin: 0mm;
        padding: 0mm;
      }
    }
  }
`;
export const BadgerWrap = styled.div`
  position: relative;
  margin: auto;
  padding: ${theme.spacing.unit * 3}px;
  @media screen and (max-width: 768px) {
    & > div > div > div > div > button > div {
      display: none;
    }
  }
`;
export const MobileBadgerCover = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }
  position: absolute;
  border-radius: 5px;
  top: 52px;
  left: 30px;
  width: 158px;
  height: 226px;
  z-index: 2;
  background-color: transparent;
`;
export const DesktopBadgerCover = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
  position: absolute;
  border-radius: 5px;
  top: 52px;
  left: 30px;
  width: 158px;
  height: 150px;
  z-index: 2;
  background-color: transparent;
`;
export const MobileBadgerUriOpener = styled.span`
  @media screen and (min-width: 769px) {
    display: none;
  }
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;
export const Buttons = styled.div`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
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
export const MobileTipTable = styled(Table)`
  margin-bottom: 12px;
  @media screen and (min-width: 556px) {
    display: none;
  }
`;
export const TipTable = styled(Table)`
  margin-bottom: 12px;
  @media screen and (max-width: 555px) {
    display: none;
  }
`;

export const TipTh = styled.td`
  text-align: center;
`;
export const MobileTipTh = styled.td`
  font-weight: bold;
  text-align: center;
`;
export const TipTd = styled.td`
  text-align: center;
`;
export const CardButton = styled(Button)``;
export const MobileButton = styled(Button)``;

export const ButtonHider = styled.div`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;
export const MobileButtonHider = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;
export const WalletCard = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;

export const MakeAndPayTipsCard = styled(Card)`
  overflow: visible;
`;

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
export const SeedWrapperAbove = styled.div`
  margin-bottom: 0px;
  border: 2px solid black;
  padding: ${theme.spacing.unit * 2}px;
  border-radius: 5px;
  & :hover {
    background-color: #0fcb97;
    color: #fff;
    border-color: #0fcb97;
  }
`;
export const SeedWarning = styled.p`
  color: Red;
`;
export const SweepInstructions = styled.p`
  margin-top: 0px;
  padding: 0px 24px;
`;

export const CustomCardContainer = styled(CardContainer)`
  display: ${({ show = false }) => (show === true ? 'grid' : 'none')};
  @media print {
    display: none;
  }
`;
export const CustomInfo = styled.h5`
  text-align: center;
  margin: auto;
  padding-bottom: ${theme.spacing.unit * 2}px;
`;
export const SeedReminder = styled.h5`
  text-align: center;
  margin: auto;
  padding-top: ${theme.spacing.unit * 2}px;
`;
export const SeedReminderAbove = styled.h5`
  text-align: center;
  margin: auto;
  padding-top: 4px;
  padding-bottom: 4px;
`;
export const SeedReminderBelow = styled.h5`
  text-align: center;
  margin: auto;
  padding-top: 4px;
  color: red;
`;
export const SweepNotice = styled.h5`
  text-align: center;
  margin: auto;
  padding-top: ${theme.spacing.unit * 2}px;
`;
export const ErrorNotice = styled.h5`
  max-width: 400px;
  color: red;
  text-align: center;
  margin: auto;
  padding-top: ${theme.spacing.unit * 2}px;
`;

export const TipsWrapper = styled.div`
  margin: auto;
`;
export const TipContainerWrapper = styled.div`
  margin: 24px auto;

  width: ${props => props.maxWidth || '100%'};
  @media only screen and (max-width: 657px) {
    max-width: 2.7in;
  }

  @media only screen and (max-width: 912px) and (min-width: 658px) {
    max-width: 5.4in;
  }
  @media screen and (max-width: 1424px) and (min-width: 913px) {
    max-width: 8in;
  }
  @media screen and (min-width: 1425px) {
    max-width: ${props => props.maxWidth || '100%'};
  }
  @media print {
    margin: 0mm;
    padding: 0mm;
    max-width: none;
  }
`;
export const TipContainer = styled.div`
  display: ${({ show = false }) => (show === true ? 'grid' : 'none')};
  grid-template-columns: ${props =>
    props.columns && `repeat(${props.columns}, 0fr)`};
  grid-row-gap: 0.2in;
  grid-column-gap: 0.2in;
  justify-items: center;
  @media print {
    margin: 0mm;
    padding: 0mm;
    width: 10in;
    grid-template-columns: repeat(5, 0fr) !important;
    grid-column-gap: 0in !important;
    grid-row-gap: 0in !important;
    & > div:nth-child(5n) > div {
      border-right: 1px solid black;
    }
    & > div:last-child > div {
      border-right: 1px solid black;
    }
  }

  @media only screen and (max-width: 657px) {
    grid-template-columns: 0fr;
  }

  @media only screen and (max-width: 912px) and (min-width: 658px) {
    grid-template-columns: ${props => (props.columns >= 2 ? '0fr 0fr' : '0fr')};
  }

  @media screen and (max-width: 1424px) and (min-width: 913px) {
    grid-template-columns: ${props =>
      props.columns >= 3 ? '0fr 0fr 0fr' : `repeat(${props.columns}, 0fr)`};
  }

  & > div {
    max-width: unset;
  }
`;

export const CustomFlexCardContainer = styled(CardContainer)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  @media print {
    display: none;
  }
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

export const AddressInputWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  padding-bottom: ${theme.spacing.unit * 3}px;
  padding-top: ${theme.spacing.unit}px;
  display: ${({ show = false }) => (show === true ? 'block' : 'none')};

  & > input {
    width: 100%;
    max-width: 700px;
    margin: 0;
  }

  @media screen and (min-width: ${theme.breakpoints.md}px) {
    width: 100%;
    padding-top: ${theme.spacing.unit * 2}px;
  }
`;

export const AddressForm = styled.form`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};

  @media screen and (min-width: ${theme.breakpoints.md}px) {
    display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
    flex-wrap: wrap;
    justify-content: space-between;
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
export const InputExtra = styled.div`
  font-size: 15px;
  padding: 0px 4px;
  text-align: justify;
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
