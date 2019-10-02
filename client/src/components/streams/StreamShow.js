import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
const vidStyle = {
  height: "80vh",
  width: "80%",
  border: "thick double #32a1ce",
  backgroundColor: "grey"
};

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.setState({ playtime: 0 });
    setInterval(() => {
      this.videoRef.current &&
        this.setState({ playtime: this.videoRef.current.currentTime });
    }, 100);
  }

  setupVideo2 = () => {
    this.videoRef.current.currentTime = 50;
    this.videoRef.current.playbackRate = 1;
    this.videoRef.current.disablePictureInPicture = true;
    this.videoRef.current.noDownload = true;
  };
  skip = () => {
    this.videoRef.current.currentTime = this.videoRef.current.currentTime + 5;
  };
  seekTo = time => {
    this.videoRef.current.currentTime = time;
  };

  handleTimeClick = e => {
    this.seekTo(e.currentTarget.dataset.time);
  };
  handleSpeedSelect = e => {
    this.videoRef.current.playbackRate = e.currentTarget.dataset.speed;
  };

  showButton = time => {
    if (!time) {
      return <div></div>;
    }
    // Data-time store the parameter for the onCLick Call
    // The value is retrieved using event.currentTarget.dataset.time
    return (
      <button
        style={{ width: "4rem" }}
        data-time={time}
        onClick={this.handleTimeClick}
      >
        {time}
      </button>
    );
  };
  speedSelectorButton = speed => {
    // Data-time store the parameter for the onCLick Call
    // The value is retrieved using event.currentTarget.dataset.time
    return (
      <button
        style={{ width: "4rem" }}
        data-speed={speed}
        onClick={this.handleSpeedSelect}
      >
        {speed} x
      </button>
    );
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const {
      title,
      description,
      bookmark1,
      time1,
      bookmark2,
      time2,
      bookmark3,
      time3,
      bookmark4,
      time4,
      url
    } = this.props.stream;

    return (
      <div className="ui grid">
        <div className="eight wide column">
          <video
            style={vidStyle}
            ref={this.videoRef}
            onLoadedMetadata={this.setupVideo2}
            height="100%"
            width="100%"
            controlsList="nodownload nofullscreen"
            controls
          >
            <source src={url} type="video/mp4" />
          </video>
          <div>
            Speed {this.speedSelectorButton(0.5)}
            {this.speedSelectorButton(1.0)}
            {this.speedSelectorButton(1.5)}
            {this.speedSelectorButton(2.0)}
          </div>
        </div>
        <div className="eight wide column">
          <h1>{title}</h1>
          <h5>{description}</h5>
          <p>
            Playtime:
            {this.state &&
              parseFloat(Math.round(this.state.playtime * 100) / 100).toFixed(
                2
              )}
          </p>
          <div className="ui grid">
            <div className="four wide column">
              <div>{this.showButton(time1)}</div>
              <div>{this.showButton(time2)}</div>
              <div>{this.showButton(time3)}</div>
              <div>{this.showButton(time4)}</div>
            </div>

            <div className="twelve wide column">
              <div>{bookmark1}</div>
              <div>{bookmark2}</div>
              <div>{bookmark3}</div>
              <div>{bookmark4}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
