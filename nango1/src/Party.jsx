import React from "react";
import { Link } from "react-router-dom";
import MyCard from "./common/MyCard";
import CardContent from '@mui/material/CardContent';

class Party extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="info">
        <MyCard 
          title={<h2>宴会プラン</h2>}
          content={
            <ul>
              <li>
                <p>「歓送迎会」　「音楽教室」　 「歌会」　「クリスマス会」　「新年会」 など、お得な貸切プランを各種ご用意しております。<br/>
                  内容のご相談も承ります。　詳しくはお問合せください。<br/>
                </p>
              </li>    
              <li>
                <Link to="/nango/rt/party_nango_temp" >
                  <img src="/static/hp_nango/images/plan_main.jpg" width="100%" alt="貸切" style={{ margin: "0px" }} />
                </Link>
              </li>
            </ul>
        }/>

        <MyCard 
          title={<h2>ご予約・お問合せ</h2>}
          content={
            <ul>
              <b>　
            　  <br/>
            　  <a href="tel:0422406757" style={{ textDecoration: "underline" }} >電話（お店）　：　０４２２－４０－６７５７</a><br/>
            　  <a href="tel:090-9756-2401" style={{ textDecoration: "underline" }} >電話（携帯）　：　０９０－９７５６－２４０１</a><br/>
              </b>
              <br/>
              　　　　<span style={{ fontWeight: "bold" }} >　　　※1週間くらい前までにご予約ください。</span><br/>
              <br/>
              <span style={{ fontWeight: "bold" }} >　キャンセル ：    ２日前までにご連絡ください。</span><br/>　
                    ※前日、当日キャンセルは、キャンセル料を頂きます。<br/>
              <br/>
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

export default Party;