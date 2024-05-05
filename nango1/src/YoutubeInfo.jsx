import React from "react";
import { Link } from "react-router-dom";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import MyCard from "./common/MyCard";

class YoutubeInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="info">
        <MyCard 
          title="ライブ配信及び動画収録サービスのご案内"
          content={
            <ul>
              <li style={{ padding: "10px 0" }}>
                <h2>&#x1f4fa;<b>ライブ配信 「南郷7丁目チャンネル」開設</b></h2>
                　新型コロナ対策として、様々な対応を実施して<br/>
                　まいりました。<br/>
                　この度、3密回避のため、Youtube ライブ配信ページ<br/>
                　を開設いたしました。お店にご来店頂けない場合も、<br/>
                　オンラインでのライブ映像がご覧になれます。<br/>

                <h1 className="cp_point" style={{ padding: "5px", margin: "20px 0" }}>3密回避で安心・安全</h1>
                <h1 className="cp_point" style={{ padding: "5px", margin: "20px 0" }}>ご来店できない時に便利</h1>
                <h1 className="cp_point" style={{ padding: "5px", margin: "20px 0" }}>いつでも閲覧可</h1>
                <h1 className="cp_point" style={{ padding: "5px", margin: "20px 0" }}>無料</h1>

                　以下の登録ボタンより、「南郷7丁目チャンネル」<br/>
                　にアクセスできます。<br/>
                <br/>

                <a href="https://www.youtube.com/channel/UCJqq9wYdNCzzuRvAeI_Op7Q/?sub_confirmation=1" className="qa_button" target="_blank" rel="noopener noreferrer">
                  Youtube 南郷7丁目チャンネル 登録ボタン
                </a>
                <br/><br/>
                
                <div className="yb_nango_info">
                  <div className="yb_nango_inner_mv">
                    <iframe src="https://www.youtube.com/embed/fFLTWvUWRTU?start=539" frameBorder="0" 
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
                  </div>
                </div>
              </li>
              <li>
                <h2>&#x1f3a5;<b>ライブ配信及び動画収録サービスのご案内</b></h2>
                　新型コロナによりイベント自粛要請により、イベント等が<br/>
                　敬遠されております。当店はそのような中、<br/>
                　初心者からプロのミュージシャンまで幅広く、<br/>
                　音楽活動等ができるよう応援したく考えております。<br/>
                　このような考えで、以下サービスを開始しました。<br/>

                <h1 className="cp_sv" style={{ padding: "5px", margin: "20px 0" }}>オンライン配信サービス<br/>（4カメご用意しております）</h1>
                <h1 className="cp_sv" style={{ padding: "5px", margin: "20px 0" }}>動画収録及びメディア作成</h1>
                <img src="/static/hp_nango/images/youtube_live.png" style={{float: "none", margin: "0px", width: "80%"}}/>
                <br/><br/>
                
                　活用シーンも様々ですので是非ご利用ください。<br/>
                <h1 className="cp_seen" style={{ padding: "5px", margin: "20px 0" }}>ライブイベント等の配信<br/>(YouTube、Facebook)</h1>
                <h1 className="cp_seen" style={{ padding: "5px", margin: "20px 0" }}>SNSの動画投稿用<br/>(Twitter、 Facebook、Instagram)</h1>
                <h1 className="cp_seen" style={{ padding: "5px", margin: "20px 0" }}>歌会、歓送迎会等の記念として</h1>
                <h1 className="cp_seen" style={{ padding: "5px", margin: "20px 0" }}>社内行事、講演会等</h1>

                <h1>&#x260e;<b>ご興味ある方は、お気軽に
                    <Link to="/nango/rt/info_nango_temp" ><span style={{ fontWeight: "bold", color: "blue" }} >お問い合わせ</span></Link>下さい</b>
                </h1>
              </li>
            </ul>
          }
          shareUrl="https://nango7.okbmk.com/nango/rt/youtube_info_nango_temp"
          msg="フォーク酒場　“南郷７丁目”　ライブ配信及び動画収録サービスのご案内"
        />
      </div>
    );
  };
}

export default YoutubeInfo;