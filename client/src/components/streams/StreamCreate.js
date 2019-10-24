import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";
class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <h3>Add a Dance Pattern</h3>
        <StreamForm
          categorySelected={this.props.categorySelected}
          initialValues={{ category: this.props.categorySelected }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    categorySelected: state.salsa.categorySelected
  };
};

export default connect(
  mapStateToProps,
  { createStream }
)(StreamCreate);
