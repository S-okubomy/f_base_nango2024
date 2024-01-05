import React from "react";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <aside id="sidebar">
        <section className="widget">
          <h3>南郷7丁目チャンネル</h3>
            <ul>
              <div className="youtube">
                <div className="g-ytsubscribe" data-channelid="UCJqq9wYdNCzzuRvAeI_Op7Q" data-layout="full" data-count="default"></div>
                <div className="yb_nango">
                  {/* <iframe data-src="https://www.youtube.com/embed/fFLTWvUWRTU?start=539" ></iframe> */}
                  <iframe
                    src={`https://www.youtube.com/embed/fFLTWvUWRTU?start=539`}
                    title="南郷7丁目チャンネル"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <br/>
                YouTubeにて「南郷7丁目チャンネル」開設しました&#x1f642;<br/>
                楽しいチャンネルなので登録よろしくお願いします&#x1f647;
              </div>
            </ul>
        </section>
        <section className="widget">
          <h3>店内動画</h3>
            <ul>
              <div className="youtube">
                <div className="yb_tennai">
                  {/* <iframe data-src="https://www.youtube.com/embed/hYJdkUevtg8" ></iframe> */}
                  <iframe
                    src={`https://www.youtube.com/embed/hYJdkUevtg8`}
                    title="店内動画"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <br/>
                （店内風景）南郷7丁目 フォーク酒場
              </div>
            </ul>
        </section>
        <section className="widget">
          <ul>
            <p><a href="https://www.facebook.com/toshihiro.suzuki.796" target="_blank">&gt;&gt;&gt;　facebookページは<span style={{ color: "red" }} >こちら</span></a><br/></p>
            <div className="fb_plgin">
              {/* TODO 後で修正 */}
              <div className="fb-page" data-href="https://www.facebook.com/%E3%83%A9%E3%82%A4%E3%83%96%E9%85%92%E5%A0%B4%E5%96%AB%E8%8C%B6-%E5%8D%97%E9%83%B7%EF%BC%97%E4%B8%81%E7%9B%AE-369736749885325/" data-width="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false" data-show-posts="false"></div>
            </div>
          </ul>
        </section>
        <section className="widget">
          <h3>住所</h3>
          <ul>
              <li><Link to="/nango/rt/info_nango_temp">東京都武蔵野市吉祥寺南町2-8-8 M288ビルB1</Link></li>
              <li><a href="tel:0422406757">（お店）0422-40-6757</a></li>
              <li><a href="tel:090-9756-2401">（携帯）090-9756-2401</a></li>
              <li><span style={{ fontSize: "10px" }} ><a href="https://nango7.okbmk.com/">https://nango7.okbmk.com/</a></span></li>
          </ul>
        </section>
        <section className="widget">
          <h3><span>営業時間</span></h3>
          <ul>
            <li>18：00-27：00</li>
            <li>
              <Link to="/nango/rt/event_nango_temp"> 年中無休<br/>
                ◎ごく稀に定休日を頂く場合が<br/>
                ございます。カレンダーで<br/>
                ご確認ください。<br/>
                カレンダーは<span style={{ color: "red" }} >こちら</span>
              </Link>
              <br/>
              <Link to="/nango/rt/system_nango_temp">◎詳細なご利用方法は<span style={{ color: "red" }} >こちら<br/></span></Link>
            </li>
          </ul>
        </section>
      </aside>
    );
  };
}

export default Sidebar;