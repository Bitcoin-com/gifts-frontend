import React from 'react';
import PropTypes from 'prop-types';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

const ControlClass = props => {
  const {
    forID,
    classNameWrapper,
    setActiveStyle,
    setInactiveStyle,
    value,
    onChange,
    field,
  } = props;
  const { hint } = field.get('hint');
  return (
    <div
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
    </div>
  );
};

ControlClass.propTypes = {
  forID: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string.isRequired,
  setActiveStyle: PropTypes.func.isRequired,
  setInactiveStyle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape(PropTypes.object).isRequired,
  field: PropTypes.shape({
    get: PropTypes.func,
  }).isRequired,
};

export default ControlClass;
