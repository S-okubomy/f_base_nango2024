import React from "react";
import ReactAnime from 'react-animejs'
const {Anime, stagger} = ReactAnime;
import anime from "animejs";
import Typed from 'react-typed';

class AnimeNangoAi extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        qa_infos: [],
        isLoadedMvAI: false,
      };
      this.getMvAiComment = this.getMvAiComment.bind(this);
    }

    // AI南郷君のお話取得
    getMvAiComment() {
      const params = { // 渡したいパラメータをJSON形式で書く
        eventKey: "aiMvCom",
      };

      const query_params = new URLSearchParams(params);
      fetch("/nango/mv_nango_ai_com" + "?" + query_params)
      .then(res => res.json())
      .then(
        (resJson) => {
          this.setState({
            qa_infos: resJson["qa_infos"],
            isLoadedMvAI: true,
          });
        },
        (error) => {
          this.setState({
            isLoadedMvAI: true,
            error,
          });
        }
      )
    }

    componentDidMount() {
      this.getMvAiComment();
    }

    render() {
      return (
        <div>
          { this.state.isLoadedMvAI &&
            <Anime
              initial={[
                {
                  targets: "#nango-ai-anime",
                  keyframes: [
                    // {translateY: -500},
                    {translateY: -(Math.floor(Math.random()*300)+250) },
                    {translateX: 170},
                    {translateY: 40},
                    {translateX: 0},
                    // {translateY: 500}
                    {translateY: (Math.floor(Math.random()*1000)+500)}
                  ],
                  scale: function(el, i, l) {
                    return 0.50;
                  },
                  rotate: function() { return anime.random(0, 10); },
                  borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
                  duration: function() { return anime.random(1000, 7700); },
                  delay: function() { return anime.random(0, 500); },
                  direction: 'alternate',
                  loop: true
                }
              ]}
            >
              <div data-x="300" id="nango-ai-anime">
                <div id="mv-nango-ai">
                  <img src="/static/hp_nango/images/ai_robot_sam.png" alt="" width="30" />
                  <div className="kaiwa-text-right" style={{ marginLeft: "50px", marginRight: "5px" }}>
                    <p className="kaiwa-text" style={{ margin: "0 0 1px", paddingLeft: "1px", paddingRight: "1px"}}>
                        <Typed
                          typedRef={(typed) => { this.typed = typed; }}
                          strings={
                            // ["大きさ5とカラーコードで緑色を指定した文字", "テストです。ああああああああいいいいいいいいいい", "そうてすと"]
                            this.state.qa_infos[0] ? this.state.qa_infos[0].content : []
                          }
                          typeSpeed={100}
                          loop={true}
                        />
                    </p>
                  </div>
                </div>
              </div>
            </Anime>
          }
        </div>
      );
    };
}

export default AnimeNangoAi;