import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";
import { categories } from "../categories";

import "./dropdown.css";
class StreamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedPattern: "ALL" };
  }
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    let shortList = this.props.streams;
    if (this.state.selectedPattern !== "ALL") {
      shortList = this.props.streams.filter(pattern => {
        return pattern["category"] === this.state.selectedPattern;
      });
    }
    // const shortList = this.props.streams.filter(pattern => {
    //   return pattern["category"] === "OUTSIDE TURNS";
    // });
    //    console.log(shortList);
    return shortList.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon video" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Dance Pattern
          </Link>
        </div>
      );
    }
  }
  handleDancePattern = e => {
    this.setState({ selectedPattern: e.currentTarget.dataset.pattern });
  };
  mapDropdownItem = selectedPattern => {
    return (
      <div
        key={selectedPattern}
        data-pattern={selectedPattern}
        onClick={this.handleDancePattern}
      >
        {selectedPattern}
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="dropdown">
          <button className="dropbtn">Select a Dance Pattern</button>
          <div className="dropdown-content">
            {categories.map(this.mapDropdownItem)}
            {/* <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a> */}
          </div>
        </div>

        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
