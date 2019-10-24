import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams, selectCategory } from "../../actions";
import { categories } from "../categories";
import "./formstyle.css";
import "./dropdown.css";
class StreamList extends React.Component {
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
    if (this.props.categorySelected !== "ALL") {
      shortList = this.props.streams.filter(pattern => {
        return pattern["category"] === this.props.categorySelected;
      });
    }

    return shortList.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon video disable-select" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {/* {stream.title} */}
              <div className="description disable-select">
                {stream.description}
              </div>
            </Link>
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
  // When dance style is selected, record it in the store
  handleDancePattern = e => {
    this.props.selectCategory(e.currentTarget.dataset.pattern);
    //    this.setState({ selectedPattern: e.currentTarget.dataset.pattern });
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
        <div className="stat-container">
          <div className="dropdown disable-select">
            <button className="dropbtn disable-select">
              Select a Dance Pattern
            </button>
            <div className="dropdown-content disable-select">
              {categories.map(this.mapDropdownItem)}
            </div>
          </div>
          {this.props.categorySelected.length > 0 && (
            <div className="current-status disable-select">
              Let's do {this.props.categorySelected}!
            </div>
          )}
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
    isSignedIn: state.auth.isSignedIn,
    categorySelected: state.salsa.categorySelected
  };
};
export default connect(
  mapStateToProps,
  { fetchStreams, selectCategory }
)(StreamList);
