import React from "react";
import { connect } from "react-redux";
import { createVideo } from "../../actions";
import VideoForm from "./VideoForm";
class VideoCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createVideo(formValues);
  };

  render() {
    return (
      <div>
        <h3>Add a Dance Pattern</h3>
        <VideoForm
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
  { createVideo }
)(VideoCreate);
