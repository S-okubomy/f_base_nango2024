import React from "react";
import { Link } from "react-router-dom";
import HeaderAppbar from "./HeaderAppbar";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div>
        <div style={{ margin: "0 auto", width:"100%", float: "center" }}>
          <h1><span style={{ fontSize: "14px" }} >吉祥寺のライブ酒場 喫茶　南郷７丁目</span><br/>
              皆様のお越しをスタッフ一同お待ちしております&#x1f3a4;&#x1f3b8;&#x1f3b5;
          </h1>
        </div>

        <div style={{ textAlign: "center", marginBottom: "5px" }}  >
            <img src="/static/hp_nango/images/header.jpg" alt="" width="880" height="256" style={{ width: "98%", height: "auto" }} />
        </div>

        <HeaderAppbar/>
      </div>
    );
  };
}

export default Header;