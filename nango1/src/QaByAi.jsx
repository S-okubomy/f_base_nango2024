import React from "react";
import QaForm from "./QaForm";
import QaList from "./QaList";
// import Cookies from 'js-cookie';

class QaByAi extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        qa_infos: [],
        selectedPage: 0, // paginationは内部で0ページスタート
        pageLimit: 10,
        isConfirmOpen: false,
        commentItem: {
          author: '',
          content: '',
          upload_image: ''
        },
      };
      this.getAns = this.getAns.bind(this);
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      this.CommentFormRef = React.createRef(); // React.createRef()で参照を作成
      this.initComment = this.initComment.bind(this); // サーバから初期表示データ取得
      this.getQaInfos = this.getQaInfos.bind(this);
    }

    initComment() {
      let answer = "不明点等ありましたら、AI南郷君がお答えいたします。"
      let answer_res = "いつもご贔屓にして下さりましてありがとうございます。AI南郷君です。\n" + answer

      let qa_infos = [];
      qa_infos.push({"author": "AI 南郷君", "content": answer_res})
      this.setState({
        qa_infos,
        isLoaded: true,
      });

    }
  
    getAns(comment) {
      const url = 'https://g2l6vmjobj.execute-api.ap-northeast-1.amazonaws.com/nango_ai_220717';
      const params = { // 渡したいパラメータをJSON形式で書く
        'mode': 'p',
        'pkey':'nango7_ai_nango_kun',
        'que_sentence': comment["content"],
      };

      const query_params = new URLSearchParams(params);
      fetch(url + "?" + query_params, {
        mode: 'cors'
      })
      .then(res => res.json())
      .then(
        (resJson) => {
          this.setState({
            qa_infos: this.getQaInfos(resJson["payload"]["qa_infos"]),
            isLoaded: true,
          });
          this.CommentFormRef.current.initCommentForm(); // this.ref名.currentで実体にアクセス
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            commentItem: {
              author: '',
              content: '',
            },
          });
        }
      )
    }

    getQaInfos(qaInfos) {
      let j_qa_infos = []
      for (let info of qaInfos) {
        let cos_val = info['cos_val'] * 100;
        let content = `◆質問: ${info['que']}\n◆回答: ${info['ans']}\n◆類似の質問: ${info['similar_que']}\n◆自信度: ${cos_val.toFixed(2)}%`
        j_qa_infos.push({"author": "AI 南郷君", "content": content})
      }
  
      if (j_qa_infos.length === 0) {
          let answer_res = "申し訳ございません。勉強不足です。お急ぎの場合は、こちらにお問い合わせください。[お問合わせ先](https://nango7.okbmk.com/nango/rt/info_nango_temp)"
          j_qa_infos.push({"author": "AI 南郷君", "content": answer_res})
      }

      return j_qa_infos;
    }

    // 子コンポーネントから実行されるメソッド
    handleCommentSubmit(comment) {
      this.setState({
        selectedPage: 0, // 登録後は1ページ目を表示させる
      }, () => {
        this.getAns(comment);
      });
    }

    componentDidMount() {
      this.initComment();
    }

    componentWillUnmount() {
    }
  
    render() {
      return (
        <div id="content">
          <section>
            <h2 className="title">■AI 南郷君 ご質問にお答えします。</h2>
            <ul className="post">
              <img src="/static/hp_nango/images/ai_robot_b.png" width="120" />
              <li>不明点等のご質問をAIがお答えします。&#x1f916;<br/>
                  （例）どんなお店ですか？<br/>
                  　　　オススメの曲教えて？
              </li>
              <li>
                <div className="commentBox">
                  {/* 子コンポーネントからonCommentSubmitを実行された時にhandleCommentSubmitを実行する */}
                  <QaForm onCommentSubmit={this.handleCommentSubmit} ref={this.CommentFormRef} />
                  <br/>
                  <QaList qa_infos={this.state.qa_infos} />
                </div>
              </li>
            </ul>
          </section>

          <section>
            <ul className="post">
              <span style={{ fontSize: "5px" }}>
                  ※作成中のため、一部内容が古い場合がございますが、<br/>
                  ご了承お願い致します&#x1f647;
              </span>
            </ul>
          </section>
        </div>
      );
    };
}

export default QaByAi;