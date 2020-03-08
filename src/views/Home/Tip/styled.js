import styled from 'styled-components';
import { theme, media, Paragraph } from 'bitcoincom-storybook';
import appIcon from '../../../../static/images/uploads/appLogoDot.png';
import gearIcon from '../../../../static/images/uploads/gear3x.png';
import sweepIcon from '../../../../static/images/uploads/sweep3x.png';

export const SnapshotHolder = styled.div`
  background-color: #fff;
`;

export const ShareButton = styled.button`
  & :hover {
    background-color: white;
  }
  background-color: transparent;
  cursor: pointer;
  float: right;
  border: 1px solid black;
  margin: 8px 8px 8px 0;
  border-radius: 5px;
`;

export const TipWrapper = styled.div`
  position: relative;
  border: 1px solid black;
  background-color: white;
  height: auto;
  width: 2.5in;
  align-self: center;
  justify-self: center;
  margin-top: 24px;

  @media print {
    display: inline-block;
    height: auto;
    page-break-inside: avoid !important;
  }
`;
export const StatusWrap = styled.div`
  width: 100%;
  border-top: 1px solid black;
  padding: 0px;
  background-color: #f5f5f5;
  overflow: auto;
`;

export const StatusLabel = styled.div`
  font-style: bold;
  color: #000;
  background-color: #a8a8a8;
`;
export const TipStatus = styled.div``;
export const ClaimedBlock = styled.div`
  padding: 63px 0px;
`;
export const StatusTable = styled.table`
  max-width: 2.5in;
  margin: auto;
  font-size: 12px;
  float: left;
  padding: 4px;
`;
export const LabelTd = styled.td`
  text-align: right;
`;
export const StatusTd = styled.td`
  text-align: left;
  color: ${({ funded = false }) => (funded === true ? '#0fcb97;' : '#000')};
  font-weight: ${({ funded = false }) => (funded === true ? 'bold;' : 'none')};
`;
export const StatusTdOldschool = styled.td`
  text-align: left;
  color: ${({ funded = false }) => (funded === true ? '#F59332 ;' : '#000')};
  font-weight: ${({ funded = false }) => (funded === true ? 'bold;' : 'none')};
`;
export const ShareIcon = styled.img`
  padding: 3px 3px 0px 5px;
`;
export const ClaimedSpan = styled.div`
  padding: 65px 20px;
  height: 145px;
`;
export const TipLabel = styled.div`
  font-weight: 700;
`;
export const ScanLabel = styled.div`
  color: #0fcb97;
  font-weight: 700;
  font-style: italic;
  font-size: 15px;
`;
export const TipAmount = styled.div`
  margin-top: 0px;
  padding: 6px 0px 4px;
  text-align: center;
  color: #fff;
  background-color: ${({ oldSchool = false }) =>
    oldSchool === true ? '#F59332;' : '#0fcb97;'};
`;
export const TipHeader = styled.div`
  margin: 0;
  padding: 10px 10px 0;
  text-align: center;
  > img {
    width: 100%;
  }
`;
export const CryptoAmount = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
export const FiatAmount = styled.div`
  font-size: 25px;
  font-weight: 600;
`;

export const Content = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.unit * 8}px;
  margin-top: ${theme.spacing.unit * 8}px;
  z-index: 2;

  ${media.md`
    margin-bottom: unset;
    margin-top: 0;
    text-align: left;
  `}
`;
export const TipExchangeRate = styled.div`
  padding: 3px 0px;
  text-align: center;
  background-color: ${({ oldSchool = false }) =>
    oldSchool === true ? '#4d4d4d;' : '#006531;'};
  color: #fff;
  font-size: 10px;
  font-weight: 600;
`;
export const HowToClaimLabel = styled.div`
  font-style: bold;
  font-style: italic;
  font-size: 14px;
  padding: 4px 4px 0px 4px;
`;
export const HowToClaim = styled.div`
  font-size: 13px;
  display: ${({ show = false }) => (show === true ? 'flex' : 'none')};
`;
export const HowToList = styled.ul`
  text-align: left;
  list-style: none;
  padding-left: 4px;
  padding-bottom: 12px;
  margin-bottom: 0px;
`;
export const StepOne = styled.li`
  background: url(${appIcon}) no-repeat left center;
  background-size: 16px;
  padding-left: 24px;
  margin: 12px 6px;
`;
export const StepTwo = styled.li`
  background: url(${gearIcon}) no-repeat left center;
  background-size: 16px;
  padding-left: 24px;
  margin: 12px 6px;
`;
export const StepThree = styled.li`
  background: url(${sweepIcon}) no-repeat left center;
  background-size: 16px;
  padding-left: 24px;
  margin: 12px 6px 0px 6px;
`;
export const DotComImg = styled.img`
  height: 10px;
`;

export const Text = styled(Paragraph)`
  margin-top: ${theme.spacing.unit * 2}px;
  margin-bottom: ${theme.spacing.unit * 4}px;

  ${media.md`
    margin-top: ${theme.spacing.unit * 3}px;
  `}
`;
