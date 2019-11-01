import React from 'react';
import PropTypes from 'prop-types';
import { JsonEditor as Editor } from 'jsoneditor-react';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import { Wrapper } from './styled';

class ControlClass extends React.Component {
  isValid = () => {
    return true;
  };

  render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      value,
      onChange,
      field,
    } = this.props;
    const { hint } = field.get('hint');
    return (
      <Wrapper
        id={forID}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      >
        <div>{hint}</div>
        <Editor
          value={value}
          mode="code"
          history
          ace={ace}
          theme="ace/theme/github"
          allowedModes={['tree', 'view', 'form', 'code', 'text']}
          onChange={onChange}
        />
      </Wrapper>
    );
  }
}
ControlClass.propTypes = {
  forID: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string.isRequired,
  setActiveStyle: PropTypes.func.isRequired,
  setInactiveStyle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape(PropTypes.object),
  field: PropTypes.shape({
    get: PropTypes.func,
  }).isRequired,
};

ControlClass.defaultProps = {
  value: {},
};

export default ControlClass;
