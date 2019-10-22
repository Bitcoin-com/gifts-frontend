import React from 'react';
import PropTypes from 'prop-types';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { Container } from './styled';

class ControlClass extends React.PureComponent {
  handleChange = vals => {
    console.log(vals);
  };

  render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      value,
    } = this.props;
    console.log(this.props);
    return (
      <div
        id={forID}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      >
        <Container>
          <Editor value={value} onChange={this.handleChange} />
        </Container>
      </div>
    );
  }
}

ControlClass.propTypes = {
  forID: PropTypes.string.isRequired,
  classNameWrapper: PropTypes.string.isRequired,
  setActiveStyle: PropTypes.func.isRequired,
  setInactiveStyle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ControlClass;
