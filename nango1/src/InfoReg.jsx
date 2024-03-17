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
        

        // try {
        //   const docRef = await addDoc(collection(db, "users"), {
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        //   });
        //   console.log("Document written with ID: ", docRef.id);
        // } catch (e) {
        //   console.error("Error adding document: ", e);
        // }

        // db.collection("test1").add({
        //   test: "xx-Lovelace",
        // });

        // await addDoc(collection(db, "test posts"), {
        //   text: "Ada",
        //   timestamp: new Date(),
        // });
        
        // const docId = db.collection("members").doc().id;

        // const docRef = await addDoc(collection(db, "users"), {
        //   first: "Ada",
        //   last: "Lovelace",
        //   born: 1815
        // });

        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });

        // const docRef = addDoc(collection(db, "users"), {
        //   first: "Ada",
        //   last: "Lovelace",
        //   born: 1815
        // })
        // .then(
        //   (resJson) => {
        //     console.log("Document TE written with ID: ", resJson);
        //   },
        //   (error) => {
        //     console.error("Error test adding document: ", error);
        //   }
        // )

        // console.log("Document test written with ID: ");
        // console.log("Document TE written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }




      // let formData = new FormData();
      // formData.append('author', comment["author"]);
      // formData.append('content', comment["content"]);
      // formData.append('selectedPage', this.state.selectedPage + 1); // 0から始まるので渡す時は1を足す
      // formData.append('pageLimit', this.state.pageLimit);

      // fetch('ai_qa_nango', {
      //   method: 'POST',
      //   body: formData,
      //   headers: new Headers({
      //     'X-CSRFToken': Cookies.get('csrftoken')
      //   })
      // })
      // .then(res => res.json())
      // .then(
      //   (resJson) => {
      //     this.setState({
      //       qa_infos: resJson["qa_infos"],
      //       isLoaded: true,
      //     });
      //     this.CommentFormRef.current.initCommentForm(); // this.ref名.currentで実体にアクセス
      //   },
      //   (error) => {
      //     this.setState({
      //       isLoaded: true,
      //       error,
      //       commentItem: {
      //         author: '',
      //         content: '',
      //       },
      //     });
      //   }
      // )


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