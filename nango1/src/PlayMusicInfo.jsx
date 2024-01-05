import React from "react";
import DOMPurify from "dompurify";

class PlayMusicInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        musicInfos: '',
      };
      this.loadMusicInfo = this.loadMusicInfo.bind(this);
      this.getHtml = this.getHtml.bind(this);
    }
  
    loadMusicInfo() {
      fetch("/nango/play_music_info")
      .then(res => res.text())
      .then(
        (htmlDate) => {
          this.setState({
            isLoaded: true,
            musicInfos: htmlDate,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    componentDidMount() {
      this.loadMusicInfo();
    }

    getHtml() {
      let htmlTxt = DOMPurify.sanitize(this.state.musicInfos.toString());
      return { __html: htmlTxt };
    };
  
    render() {
      return (
        <div id="content">
          <div dangerouslySetInnerHTML={this.getHtml()}></div>
        </div>
      );
    };
}

export default PlayMusicInfo;