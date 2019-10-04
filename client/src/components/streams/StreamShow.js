import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import "./formstyle.css";
const vidStyle = {
  height: "70vh",
  width: "90%",
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
    this.videoRef.current.currentTime = 0;
    this.videoRef.current.playbackRate = 1;
    this.videoRef.current.disablePictureInPicture = true;
    this.videoRef.current.noDownload = true;
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

  showRow = (time, description) => {
    if (!time) {
      return <div></div>;
    }

    const seconds = time % 60;
    const minutes = time / 60;
    const label =
      (minutes ? "00" : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    // Data-time store the parameter for the onCLick Call
    // The value is retrieved using event.currentTarget.dataset.time
    return (
      <div className="ui grid">
        <div className="four wide column">
          <button
            style={{ width: "100%" }}
            data-time={time}
            onClick={this.handleTimeClick}
          >
            {label}
          </button>
        </div>
        <div className="twelve wide column">{description}</div>
      </div>
    );
  };

  speedSelectorButton = speed => {
    // Data-time store the parameter for the onCLick Call
    // The value is retrieved using event.currentTarget.dataset.time
    return (
      <button
        style={{ width: "100%" }}
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
          <div className="ui grid speed-select">
            <div className="two wide column">Speed</div>
            <div className="three wide column">
              {this.speedSelectorButton(0.5)}
            </div>
            <div className="three wide column">
              {this.speedSelectorButton(1.0)}
            </div>
            <div className="three wide column">
              {this.speedSelectorButton(1.5)}
            </div>
            <div className="three wide column">
              {this.speedSelectorButton(2.0)}
            </div>
          </div>
        </div>
        <div className="eight wide column">
          <h1>{title}</h1>
          <h5>{description}</h5>
          <div className="ui grid">
            <div className="four wide column">
              <h5>Playtime</h5>
            </div>
            <div className="twelve wide column">
              <h5>
                {this.state &&
                  parseFloat(
                    Math.round(this.state.playtime * 100) / 100
                  ).toFixed(2)}
              </h5>
            </div>
          </div>

          {this.showRow(time1, bookmark1)}
          {this.showRow(time2, bookmark2)}
          {this.showRow(time3, bookmark3)}
          {this.showRow(time4, bookmark4)}
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
