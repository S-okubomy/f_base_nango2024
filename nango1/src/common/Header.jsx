import React from "react";
import { Link } from "react-router-dom";
import HeaderAppbar from "./HeaderAppbar";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div className="headerNameNone">
        <div className="inner">
          <h1><span style={{ fontSize: "14px" }} >吉祥寺のライブ酒場 喫茶　南郷７丁目</span><br/>
              皆様のお越しをスタッフ一同お待ちしております&#x1f3a4;&#x1f3b8;&#x1f3b5;
          </h1>
        </div>

        <div id="mainImg">
            <img src="/static/hp_nango/images/header.jpg" alt="" width="880" height="256" />
        </div>

        
        {/* <div style={{ width:"880" }}>
          <HeaderAppbar/>
        </div> */}

        <HeaderAppbar/>

        <div className="inner">
          {/* <HeaderAppbar/> */}

        {/* <HeaderAppbar style={{ width: "100%", margin: "0 auto", width: "880px" }} /> */}
          
          {/* <h2 className="title" style={{ background: "#FCFCE0" }}> */}
            {/* <HeaderAppbar/> */}

            {/* <li><Link to="/"><strong>トップページ</strong></Link></li>
            <li><Link to="/nango/rt/info_nango_temp">お店のご案内</Link></li>
            <li><Link to="/nango/rt/youtube_info_nango_temp">配信&amp;収録</Link></li>
            <li><Link to="/nango/rt/system_nango_temp">ご利用方法</Link></li>
            <li><Link to="/nango/rt/party_nango_temp">宴会プラン</Link></li>
            <li><Link to="/nango/rt/drink_nango_temp">飲み物</Link></li>
            <li><Link to="/nango/rt/food_nango_temp">お食事</Link></li>
            <li><Link to="/nango/rt/event_nango_temp"><strong>イベントカレンダー</strong></Link></li> */}
            {/* <li><Link to="/nango/rt/info_reg"><strong>test</strong></Link></li> */}
            {/* <li><Link to="/nango/rt/regdb_top_info"><strong>管理用</strong></Link></li>
            <li><Link to="/nango/rt/qa_by_ai_temp"><strong>AI南郷君</strong></Link></li> */}
            {/* <li><Link to="/nango/rt/login"><strong>login</strong></Link></li> */}
          {/* </h2> */}
        </div>

        {/* <nav id="mainNav" name="mainNav">
          <div className="inner">
            <a className="menu" id="menu"><span style={{ fontSize: "15px", color: "red" }} >サイトマップ（ここクリック）&#x1f3b5;</span></a>
            <div className="panel">
              <ul>
                <li><Link to="/nango"><strong>トップページ</strong><span>TOP</span></Link></li>
                <li><Link to="/nango/rt/info_nango_temp"><strong>お店のご案内</strong><span>Information</span></Link>
                  <ul className="sub-menu">
                    <li><Link to="/nango/rt/info_nango_temp">お店のご案内</Link></li>
                    <li><Link to="/nango/rt/youtube_info_nango_temp">配信&amp;収録</Link></li>
                  </ul>
                </li>
                <li><Link to="/nango/rt/system_nango_temp"><strong>ご利用方法</strong><span>system</span></Link>
                  <ul className="sub-menu">
                    <li><Link to="/nango/rt/system_nango_temp">ご利用方法</Link></li>
                    <li><Link to="/nango/rt/party_nango_temp">宴会プラン</Link></li>
                  </ul>
                </li>
                <li><Link to="/nango/rt/drink_nango_temp"><strong>飲み物／お食事</strong><span>MENU</span></Link>
                  <ul className="sub-menu">
                    <li><Link to="/nango/rt/drink_nango_temp">飲み物</Link></li>
                    <li><Link to="/nango/rt/food_nango_temp">お食事</Link></li>
                  </ul>
                </li>
                <li><Link to="/nango/rt/event_nango_temp"><strong>イベントカレンダー</strong><span>Events</span></Link></li>
                <li><a href="/nango/rt/play_music_info_nango_temp" target="_blank"><strong>ツール</strong><span>tool</span></a>
                  <ul className="sub-menu">
                    <li><Link to="/nango">利用できません</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}


      </div>
    );
  };
}

export default Header;