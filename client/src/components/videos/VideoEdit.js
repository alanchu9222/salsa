import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchVideo, editVideo } from "../../actions";
import VideoForm from "./VideoForm";

class VideoEdit extends React.Component {
  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.id);
  }

  onSubmit = formValues => {
    console.log(this.props.video.userId);
    const dataUpload = formValues;
    dataUpload.userId = this.props.video.userId;
    this.props.editVideo(this.props.match.params.id, dataUpload);
  };

  render() {
    if (!this.props.video) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Dance Pattern</h3>
        <VideoForm
          categorySelected={this.props.categorySelected}
          initialValues={_.pick(
            this.props.video,
            "description",
            "category",
            "time1",
            "time2",
            "time3",
            "time4",
            "url",
            "bookmark1",
            "bookmark2",
            "bookmark3",
            "bookmark4"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    video: state.videos[ownProps.match.params.id],
    categorySelected: state.salsa.categorySelected
  };
};

export default connect(
  mapStateToProps,
  { fetchVideo, editVideo }
)(VideoEdit);
