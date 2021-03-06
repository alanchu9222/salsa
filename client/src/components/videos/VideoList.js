import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVideos, selectCategory } from "../../actions";
import { categories } from "../categories";
import "./formstyle.css";
import "./dropdown.css";
class VideoList extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  renderAdmin(video) {
    if (video.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/videos/edit/${video.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/videos/delete/${video.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    let shortList = this.props.videos;
    if (this.props.categorySelected !== "ALL") {
      shortList = this.props.videos.filter(pattern => {
        return pattern["category"] === this.props.categorySelected;
      });
    }

    return shortList.map(video => {
      return (
        <div className="item" key={video.id}>
          {this.renderAdmin(video)}
          <i className="large middle aligned icon video disable-select" />
          <div className="content">
            <Link to={`/videos/${video.id}`} className="header">
              {/* {video.title} */}
              <div className="description disable-select">
                {video.description}
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
          <Link to="/videos/new" className="ui button primary">
            Create Dance Pattern
          </Link>
        </div>
      );
    }
  }
  // When dance style is selected, record it in the store
  handleDancePattern = e => {
    this.props.selectCategory(e.currentTarget.dataset.pattern);
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
    videos: Object.values(state.videos),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    categorySelected: state.salsa.categorySelected
  };
};
export default connect(
  mapStateToProps,
  { fetchVideos, selectCategory }
)(VideoList);
