import React, { useState, useEffect } from "react";
import InfoForm from "./InfoForm";
import QaList from "./QaList";
import Cookies from 'js-cookie';

import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; 

class InfoReg extends React.Component {
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
      this.postComment = this.postComment.bind(this);
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      this.CommentFormRef = React.createRef(); // React.createRef()で参照を作成
      // this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this); // サーバから初期表示データ取得

    }
    

    loadCommentsFromServer() {
      const params = { // 渡したいパラメータをJSON形式で書く
        selectedPage: this.state.selectedPage + 1, // 0から始まるので渡す時は1を足す
        pageLimit: this.state.pageLimit,
        eventKey: "initCom1"
      };

      const query_params = new URLSearchParams(params);
      fetch("ai_qa_nango" + "?" + query_params)
      .then(res => res.json())
      .then(
        (resJson) => {
          this.setState({
            qa_infos: resJson["qa_infos"],
            isLoaded: true,
          });
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
  
    async postComment(comment) {
      try {
        console.log("2xx test Document written");
 
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });

      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    // 子コンポーネントから実行されるメソッド
    handleCommentSubmit(comment) {
      this.setState({
        selectedPage: 0, // 登録後は1ページ目を表示させる
      }, async () => {
        await this.postComment(comment);
      });
    }

    componentDidMount() {
      // this.loadCommentsFromServer();
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
                  <InfoForm onCommentSubmit={this.handleCommentSubmit} ref={this.CommentFormRef} />
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

export default InfoReg;