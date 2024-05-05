import React from "react";
import MyCard from "./common/MyCard";
import CardContent from '@mui/material/CardContent';

class Food extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="info">
        <MyCard 
          title={<h2>お食事</h2>}
          content={
            <ul className="post">
              <li><img src="/static/hp_nango/images/zoni1.jpg" width="300" style={{ clear: "both", float:"left" }} /><span style={{ fontSize: "20px", fontWeight: "bold" }} >お食事</span><br/>
                <p>
                  お料理は当日のおすすめメニューのみとなります。
                  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </p>
              </li>
              <li><img src="/static/hp_nango/images/tuku1.jpg" width="300" style={{ clear: "both", float:"left" }} /><span style={{ fontSize: "20px", fontWeight: "bold" }} >一品料理</span><br/>
                <p>
                  冷奴　　　　　　　　　　　400円<br/>
                  枝豆　　　　　　　　　　　400円<br/>
                  じゃがバター　　　　　　　600円<br/>
                  レーズンバター　　　　　　600円<br/>
                  ソーセージ盛り合わせ　　　700円<br/>
                  ミックスナッツ　　　　　　500円<br/>
                  <br/>
                  ※その他のメニューございます。
                  <br/><br/><br/><br/>
                </p>
              </li>
            </ul>
        }/>

        <CardContent
          sx={{
            bgcolor: '#FCFCE0',
            padding: '0px 5px 5px 10px',
          }}
        >
          <span style={{ fontSize: "10px" }}>
            ※　当店では飲酒運転防止のため、お車でお越しのお客様には、アルコール類のご提供は致しておりません。<br/>
            ※　20歳未満のお客様に関しても、同様にアルコールのご提供はしておりません。      <br/>
            ※　自転車来店後の飲酒運転自粛をお願いしています。
          </span>
          <br/>
          <span style={{ fontSize: "5px" }}>
                ※作成中のため、一部内容が古い場合がございますが、<br/>
                ご了承お願い致します&#x1f647;
          </span>
        </CardContent>

      </div>
    );
  };
}

export default Food;