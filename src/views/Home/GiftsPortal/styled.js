import styled, { css } from 'styled-components';
import Popup from 'reactjs-popup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  Section,
  FlexContainer,
  Card,
  Button,
  TimesSolidThick,
  Paragraph,
  Select,
} from '@bitcoin-portal/bitcoincom-pkg-components';
import { colors } from '@bitcoin-portal/bitcoincom-pkg-theme';
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
const light = {
  palette: {
    text: {
      default: colors.solid.vulcan,
      secondary: colors.solid.vulcanLightest,
      tertiary: colors.solid.ghostLight,
      contrast: colors.solid.zircon,
    },
    background: {
      default: colors.solid.zircon,
      secondary: colors.solid.zirconDarkest,
      tertiary: colors.solid.white,
      alternate: colors.solid.vulcan,
      contrast: colors.solid.vulcanLight,
    },
    border: {
      default: colors.solid.ghostLight,
      secondary: colors.solid.mystic,
      tertiary: colors.solid.alto,
      contrast: colors.solid.vulcanLightest,
    },
  },
};
const dark = {
  palette: {
    text: {
      default: colors.solid.zircon,
      secondary: colors.solid.comet,
      tertiary: colors.solid.white,
      contrast: colors.solid.vulcan,
    },
    background: {
      default: colors.solid.vulcan,
      secondary: colors.solid.vulcanLightest,
      tertiary: colors.solid.cometDark,
      alternate: colors.solid.bunker,
      contrast: colors.solid.zirconDark,
    },
    border: {
      default: colors.solid.cometDark,
      secondary: colors.solid.cometDarkest,
      tertiary: colors.solid.cometDarkest,
      contrast: colors.solid.zirconDarkest,
    },
  },
};
const gifts = {
  palette: {
    primary: colors.solid.caribbeanGreen,
    text: {
      default: colors.solid.vulcan,
      secondary: colors.solid.vulcanLightest,
      tertiary: colors.solid.ghostLight,
      alert: colors.solid.cinnabar,
      link: colors.solid.caribbeanGreen,
      uxalert: '#d8000c',
      placeholder: colors.solid.vulcan,
    },
    background: {
      default: colors.solid.zircon,
      secondary: colors.solid.zirconDarkest,
      tertiary: colors.solid.white,
      alternate: colors.solid.vulcan,
      contrast: colors.solid.vulcanLight,
      alert: colors.gradient.cinnabar,
      uxalert: '#ffbaba',
    },
    border: {
      default: colors.solid.ghostLight,
      secondary: colors.solid.mystic,
      tertiary: colors.solid.alto,
      contrast: colors.solid.vulcanLightest,
      alert: colors.solid.cinnabar,
      uxalert: '#d8000c',
    },
  },
  border: {
    radius: {
      default: 3,
      medium: 5,
    },
    solid: {
      default: '1px solid',
      medium: '3px solid',
    },
  },
  breakpoints: {
    sm: 424,
    smmd: 768,
    md: 960,
    lg: 1440,
  },
  spacing: { unit: 8 },
};

export const HeaderSection = styled(Section)`
  background-color: ${gifts.palette.background.default};
  padding-bottom: 0px;
`;

export const PrintableSection = styled(Section)`
  background-color: ${gifts.palette.background.default};
  @media print {
    margin: 0mm;
    padding: 0mm;

    & > div {
      margin: 0mm;
      padding: 0mm;
      & > div {
        margin: 0mm;
        padding: 0mm;
      }
    }
  }
`;
export const Centered = styled.div`
  text-align: center;
  width: 100%;
`;
export const ShowFlexContainer = styled(FlexContainer)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
  @media print {
    display: none;
  }
`;

export const ShowCard = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;

export const ShowButton = styled(Button)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;
export const StackedButtons = styled.div`
  width: 100%;
  & > a,
  button {
    margin: ${gifts.spacing.unit * 2}px auto;
  }
`;

export const ShowCopyToClipboard = styled(CopyToClipboard)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;

export const MobileShowButton = styled(Button)`
  @media screen and (min-width: 769px) {
    display: none;
  }
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;

export const CopySeed = styled.div`
  cursor: pointer;
  border: 2px solid black;
  margin-bottom: ${gifts.spacing.unit * 2}px;
  padding: ${gifts.spacing.unit * 2}px;
  border-radius: 5px;
  & :hover {
    background-color: #0fcb97;
    color: #fff;
    border-color: #0fcb97;
  }
`;
export const Alert = styled(Paragraph)`
  color: ${gifts.palette.text.alert};
`;

export const CustomPdfDownloadLink = styled(PDFDownloadLink)`
  margin: 12px auto;
  color: ${gifts.palette.text.link};
`;

export const CustomSelect = styled(Select)`
  z-index: 5;
  min-width: 185px;
`;

export const ApiErrorPopup = styled(Popup)``;
export const CloseIcon = styled(TimesSolidThick)``;
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
  & > h5 {
    margin: auto;
    padding-bottom: 0;
  }
`;
export const ApiErrorPopupMsg = styled.div`
  background: ${gifts.palette.background.uxalert};
  & > p {
    color: ${gifts.palette.text.uxalert};
  }
  color: ${gifts.palette.text.uxalert};
  border: 2px solid ${gifts.palette.border.uxalert};
  padding: 20px;
  text-align: center;
  border-radius: 5px;
`;

export const SweepAllCard = styled(Card)`
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
  margin-top: 24px;
`;

export const ControlPanelForm = styled.div``;

export const ApiErrorCard = styled(Card)`
  background-color: ${gifts.palette.background.uxalert};
  color: ${gifts.palette.text.uxalert};
  border: 2px solid ${gifts.palette.border.uxalert};
  & > h3,
  p {
    color: ${gifts.palette.text.uxalert};
  }
`;
export const ApiErrorWarning = styled(Paragraph)`
  max-width: 600px;
  margin-block-start: 0em;
  text-align: justify;
`;

export const CustomDatePicker = styled(DatePicker)`
  ${reset};
  border-radius: ${gifts.border.radius.default}px;
  padding: 0 ${gifts.spacing.unit * 3}px;
  height: 60px;
  background-color: ${gifts.palette.background.default};
  border: ${gifts.border.solid.default} ${gifts.palette.border.default};
  color: ${gifts.palette.text.primary};
  margin: ${gifts.spacing.unit}px 0;
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
      padding-right: ${gifts.spacing.unit * 7}px;
    `};
  &::placeholder {
    color: ${gifts.palette.text.placeholder};
  }
  &:focus,
  &:focus-within {
    border-color: ${gifts.palette.primary.main};
  }
  ${({ disabled = false }) => {
    if (disabled === false) return '';
    return css`
      background-color: ${gifts.palette.background.headerLight};
      border-color: ${gifts.palette.text.disabled};
      color: ${gifts.palette.text.disabled};
      pointer-events: none;
      &:focus,
      &:focus-within {
        border-color: ${gifts.palette.text.disabled};
      }
    `;
  }};
`;

export const AddressInputLabel = styled.div`
  text-align: left;
  margin-bottom: 8px;
  color: ${gifts.palette.text.secondary};
  font-weight: 600;
  font-size: 0.9rem;
`;

export const BadgerWrap = styled.div`
  position: relative;
  margin: auto;
  padding: ${gifts.spacing.unit * 3}px;
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
  width: 100%;
  align-items: center;
  justify-content: center;
  & > button {
    margin-left: ${gifts.spacing.unit * 0.5}px;
    margin-right: ${gifts.spacing.unit * 0.5}px;
    max-width: 200px;
  }
`;
export const MobileTipTable = styled.table`
  margin-bottom: 12px;
  @media screen and (min-width: 767px) {
    display: none;
  }
`;
export const TipTable = styled.table`
  margin-bottom: 12px;
  @media screen and (max-width: 766px) {
    display: none;
  }
`;

export const TipTh = styled.td`
  text-align: center;
  font-weight: bold;
  padding: ${gifts.spacing.unit * 0.5}px !important;
`;
export const MobileTipTh = styled.td`
  font-weight: bold;
  text-align: center;
  padding: ${gifts.spacing.unit * 0.5}px !important;
`;
export const TipTd = styled.td`
  text-align: center;
  padding: ${gifts.spacing.unit * 0.5}px !important;
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
  cursor: pointer;
  margin-bottom: ${gifts.spacing.unit * 3}px;
  border: 2px solid black;
  padding: ${gifts.spacing.unit * 2}px;
  border-radius: 5px;
  & :hover {
    background-color: #0fcb97;
    color: #fff;
    border-color: #0fcb97;
  }
`;
export const SeedWrapperAbove = styled.div`
  cursor: pointer;
  margin-bottom: 0px;
  border: 2px solid black;
  padding: ${gifts.spacing.unit * 2}px;
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

export const CustomInfo = styled.h5`
  text-align: center;
  margin: auto;
  padding-bottom: ${gifts.spacing.unit * 2}px;
`;
export const SeedReminder = styled.h5`
  text-align: center;
  margin: auto;
  padding-top: ${gifts.spacing.unit * 2}px;
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
export const SweepNotice = styled.div`
  & a {
    color: ${gifts.palette.text.link};
    word-wrap: anywhere;
  }
  text-align: center;
  margin: auto;
  padding-top: ${gifts.spacing.unit * 2}px;
`;
export const ErrorNotice = styled.h5`
  max-width: 400px;
  color: red;
  text-align: center;
  margin: auto;
  padding-top: ${gifts.spacing.unit * 2}px;
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
    -webkit-transform-origin: 0 0 !important;
    transform: scale(0.575) !important;
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

    width: 19cm;

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

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  padding-bottom: ${gifts.spacing.unit * 3}px;
  padding-top: ${gifts.spacing.unit}px;
  display: ${({ show = false }) => (show === true ? 'block' : 'none')};

  & > input {
    width: 100%;
    max-width: unset;
    margin: 0;
  }

  @media screen and (min-width: ${gifts.breakpoints.md}px) {
    width: 100%;
    padding-top: ${gifts.spacing.unit * 2}px;
  }
`;

export const AddressInputWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  padding-bottom: ${gifts.spacing.unit * 3}px;
  padding-top: ${gifts.spacing.unit}px;
  display: ${({ show = false }) => (show === true ? 'block' : 'none')};

  & > input {
    width: 100%;
    max-width: 700px;
    margin: 0;
  }

  @media screen and (min-width: ${gifts.breakpoints.md}px) {
    width: 100%;
    padding-top: ${gifts.spacing.unit * 2}px;
  }
`;

export const AddressForm = styled.form`
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
  text-align: left;
`;

export const InputError = styled.div`
  color: red;
  position: absolute;
  font-size: 0.6rem;
  padding-top: 2px;
  top: calc(100% - ${gifts.spacing.unit * 3}px);
`;
export const InputExtra = styled.div`
  font-size: 15px;
  padding: 0px 4px;
  text-align: justify;
`;

export const InputLabel = styled.div`
  text-align: left;
  margin-bottom: 8px;
  color: ${gifts.palette.text.secondary};
  font-weight: 600;
  font-size: 0.9rem;
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
  background-color: ${gifts.palette.background.dark};
`;

export const CustomParagraph = styled(Paragraph)`
  margin-top: ${gifts.spacing.unit * 3}px;
`;
