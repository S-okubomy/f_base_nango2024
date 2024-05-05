import React from "react";
import DOMPurify from "dompurify";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import Typed from 'react-typed';
// import ReactAnime from 'react-animejs';
// import AnimeNangoAi from "./common/AnimeNangoAi";

import { collection, addDoc, doc, setDoc, getDoc, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "./firebase";

import ElevateAppBar from "./common/ElevateAppBar";
import Grid from '@mui/material/Unstable_Grid2';

import MyCard from "./common/MyCard";

// const {Anime, stagger} = ReactAnime

class Top extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        topCont: '',
        selectedPage: 0,
        qa_infos: [],
        isLoadedTopAI: false,
        top_infos: [],
        isLoadedTopInfo: false,
      };
      this.loadTopInfo = this.loadTopInfo.bind(this);
      // this.getHtml = this.getHtml.bind(this);
      this.getTopAiComment = this.getTopAiComment.bind(this);
      // console.log()
    }
  
    async loadTopInfo() {
      const q = query(
          collection(db, "top_info")
        , where("is_del", "==", false)
        , orderBy("created_time","desc")
      );

      let infos = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        infos.push(doc.data())
        // console.log(doc.data());
      });

      this.setState({
        top_infos: infos,
        isLoadedTopInfo: true,
      });
    }

    // AI南郷君のお話取得
    getTopAiComment() {
    }

    componentDidMount() {
      this.loadTopInfo();
      this.getTopAiComment();
    }

    getHtml() {
      let htmlTxt = DOMPurify.sanitize(this.state.topCont.toString());
      return { __html: htmlTxt };
    };
  
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows:true,
      };

      const cnvLine = (msg) => {
        const texts = msg.split("\n").map((item, index) => {
          return (
            <React.Fragment key={index}>{item}<br /></React.Fragment>
          );
        });
        return <div>{texts}</div>;
      }

      const top_info_nodes = this.state.top_infos.map((info, ind) => {
        return (
          <div key={ind}>
            <p>
              <span style={{ fontSize: "13px", fontWeight: "bold" }}>
                {info.title}<br/>
              </span>
              {cnvLine(info.content)}
            </p>
            <hr/>
          </div>
        )
      });

      return (

        <div>

        {/* <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <ElevateAppBar>
                    test
            </ElevateAppBar>
          </Grid>
        </Grid> */}

        <MyCard
          title="フォーク酒場　“南郷７丁目”の店内風景です。"
          content={
            <ul>
              <Slider {...settings} >
                <div>
                  <img src="/static/hp_nango/images/slide1.jpg" width="100%" alt="" style={{ margin: "0px", padding: "7px" }} />
                </div>
                <div>
                  <img src="/static/hp_nango/images/slide2.jpg" width="100%" alt="" style={{ margin: "0px", padding: "7px" }} />
                </div>
                <div>
                  <img src="/static/hp_nango/images/slide5.jpg" width="100%" alt="" style={{ margin: "0px", padding: "7px" }} />
                </div>
                <div>
                  <img src="/static/hp_nango/images/slide4.jpg" width="100%" alt="" style={{ margin: "0px", padding: "7px" }} />
                </div>
                <div>
                  <img src="/static/hp_nango/images/entry.jpg" width="100%" alt="" style={{ margin: "0px", padding: "7px" }} />
                </div>
                <div>
                  <img src="/static/hp_nango/images/zashiki.jpg" width="100%" alt="" style={{ margin: "0px", padding: "7px" }} />
                </div>
              </Slider>
            </ul>
        }/>

        <MyCard 
          title="“いらっしゃいませ！”　当店のコンセプトについてご説明いたします。"
          content={
            <ul style={{ listStyle: "none" }} >
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜気楽、和気あいあいを大切に＞</span><br/>
                  当店は初めての方でも、気楽に楽しいひと時をモットー<br/>
                  にしております。また、楽器演奏有無、年齢問わず<br/>
                  老若男女、和気あいあいとした雰囲気です。<br/>
                  是非、お気軽にお越しください。<br/>
                  { /* TODO 一旦無効化しているので戻す  AI南郷君のお家!!!!!!!! */ }
                  {/* <AnimeNangoAi /> */}
              </li>
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜リーズナブルな価格＞</span><br/>
                  当店はリーズナブルな価格で楽しいひと時のご提供を<br/>
                  心がけております。<br/>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} > チャージ料金 1500円</span>、ビール等の<br/>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} >アルコール類を500円より</span><br/>
                  提供しております。演奏代無料で楽器演奏できます。<br/>
              </li>
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜楽器は自由に、未経験でもOK＞</span><br/>
                  お店の楽器は自由に使えます。店内には<br/>
                  アコースティックギター、エレキギター、ベース、<br/>
                  ピアノ等あります。手ぶらで大丈夫ですので、特に<br/>
                  平日仕事帰り等でもふらっと寄って気軽に弾けます。<br/>
                  タンバリンもありますので、楽器経験が無い方も<br/>
                  楽しめます。<br/>
              </li>
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜ライブ配信及び動画収録＞</span><br/>
                  新型コロナ対応によるイベント自粛要請により、<br/>
                  イベント等が敬遠されております。<br/>
                  当店はそのような中、初心者からプロの<br/>
                  ミュージシャンまで幅広く、<br/>
                  音楽活動等ができるよう応援したく考えております。<br/>
                  このような考えで、ライブ配信及び動画収録サービス<br/>
                  を開始いたしました。<br/>
                  詳細は
                  <Link to="/nango/rt/youtube_info_nango_temp" ><span style={{ fontWeight: "bold", color: "blue" }} >こちら</span></Link>
                  をご覧ください。
              </li>
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜衛生対策に関しまして＞</span><br/>
                  ◆店内の消毒について<br/>
                  &nbsp;&nbsp;お客様にご安心してご利用いただけるよう、<br/>
                  &nbsp;&nbsp;店内を消毒するなど<span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} >新型コロナウイルス対策</span><br/>
                  &nbsp;&nbsp;を徹底しております。<br/>
                  ◆店頭でのアルコール消毒設置について<br/>
                  &nbsp;&nbsp;店頭にお客様用アルコール消毒液の設置<br/>
                  &nbsp;&nbsp;を強化しています。ご自由にご使用ください。<br/>
                  ◆従業員について<br/>
                  &nbsp;&nbsp;出勤時に必ず健康チェック<br/>
                  &nbsp;&nbsp;を行っています。<br/>
                  &nbsp;&nbsp;手洗いは石鹸液と消毒液による<br/>
                  &nbsp;&nbsp;洗浄と殺菌を徹底し、こまめに行っています。<br/>
                  &nbsp;&nbsp;予防対策として、マスクを着用し、<br/>
                  &nbsp;&nbsp;ご対応させていただく場合がございます。<br/>
                  
                  ご不便をおかけしますが、<br/>
                  何卒ご理解頂けますようお願いいたします。<br/>
              </li>
              <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜アクセスの良さ＞</span><br/>
                  当店はJR吉祥寺駅より徒歩3分とアクセスしやすい立地となっております。<br/>
                  <table>
                    <tbody>
                      <tr><td><img src="/static/hp_nango/images/map2.jpg" alt="" width="400" /></td></tr>
                      <tr><td><Link to="/nango/rt/info_nango_temp" ><span style={{ fontWeight: "bold", color: "blue" }} >詳細はこちらをクリック</span></Link></td></tr>
                    </tbody>
                  </table>
              </li>
            </ul>
         }/>


        <MyCard 
          title={<div>南郷７丁目からのお知らせ <button className="second"><Link to="/nango/rt/regdb_top_info"><strong>投稿（管理者）</strong></Link></button></div>}
          content={
            <ul>
              <br/>
              { this.state.isLoadedTopInfo &&
                top_info_nodes
              }
            </ul>

        }/>

        <MyCard 
          title="イベントカレンダー"
          content={
            <ul>
              <Link to="/nango/rt/event_nango_temp" ><img src="/static/hp_nango/images/event.jpg" alt="イベントカレンダー" width="100%" style={{ margin: "0px" }} /></Link>
            </ul>

        }/>
          




          {/* { this.state.isLoadedTopAI &&
            <div id="fixed-nango-ai">
              <a href="https://nango7.okbmk.com/nango/rt/qa_by_ai_temp" target="_blank">
              <img src="/static/hp_nango/images/ai_robot_sam.png" alt="" width="30" />&nbsp;
              <span>AIが不明点お答えします！</span></a>
              <div>
                <div className="kaiwa-text-right" style={{ marginLeft: "10px", marginRight: "5px" }}>
                  <p className="kaiwa-text" style={{ margin: "0 0 1px" ,paddingLeft: "1px" ,paddingRight: "1px"}}>
                    <Typed
                      typedRef={(typed) => { this.typed = typed; }}
                      strings={
                        this.state.qa_infos[0] ? this.state.qa_infos[0].content : []
                      }
                      typeSpeed={100}
                    />
                  </p>
                </div>
              </div>
            </div>
          } */}
        </div>

      );
    };
}

export default Top;