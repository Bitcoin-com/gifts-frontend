import styled from 'styled-components';
import { theme } from 'bitcoincom-storybook';

export const Container = styled.div`
  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
    display: none;
  }
  .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
  }
  .geosuggest__input-wrapper input {
    width: 100%;
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  .geosuggest__suggests {
    list-style-type: none;
  }
  .geosuggest__item {
    cursor: pointer;
    border-top: solid 1px rgb(223, 223, 227);
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  padding-bottom: ${theme.spacing.unit}px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  border: ${theme.border.solid.light} ${theme.palette.border.lighter};
  box-sizing: border-box;
  border-radius: ${theme.border.radius.default}px;
  background-color: ${({ disabled = false }) =>
    disabled
      ? theme.palette.background.light
      : theme.palette.background.default};

  &:focus-within {
    ${theme.palette.p3green.background};
  }

  & > input {
    width: 100%;
    max-width: unset;
    margin: 0;
  }
`;

export const Suggestions = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: ${theme.border.radius.default}px;
  border: ${theme.border.solid.default} ${theme.palette.border.light};
  margin-top: ${theme.spacing.unit}px;
  background-color: ${theme.palette.background.default};
`;

export const Suggestion = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
