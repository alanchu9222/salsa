/**
 *
 * DropDownSelect
 *
 */
import React from "react";
import PropTypes from "prop-types";

class DropDownSelect extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  renderSelectOptions = pattern => (
    <option key={pattern} value={pattern}>
      {pattern}
    </option>
  );

  render() {
    const { input } = this.props;
    return (
      <div>
        {/* <label htmlFor={label}>{label}</label> */}
        <select {...input}>
          <option value="">Select</option>
          {this.props.patterns.map(this.renderSelectOptions)}
        </select>
      </div>
    );
  }
}

DropDownSelect.propTypes = {
  patterns: PropTypes.array,
  input: PropTypes.object,
  label: PropTypes.string
};

export default DropDownSelect;
