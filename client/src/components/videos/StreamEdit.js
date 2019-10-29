import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    console.log(this.props.stream.userId);
    const dataUpload = formValues;
    dataUpload.userId = this.props.stream.userId;
    this.props.editStream(this.props.match.params.id, dataUpload);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Dance Pattern</h3>
        <StreamForm
          categorySelected={this.props.categorySelected}
          initialValues={_.pick(
            this.props.stream,
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
    stream: state.videos[ownProps.match.params.id],
    categorySelected: state.salsa.categorySelected
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
