import React from "react";
import MyCard from "./common/MyCard";
import CardContent from '@mui/material/CardContent';

class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div>
        <MyCard 
          title="お問合せ"
          content={
          <ul>
            <b>
          　  <br/>
          　  <b>住所： 東京都武蔵野市吉祥寺南町2-8-8 M288ビルB1</b><br/>
          　  <a href="tel:0422406757" style={{ textDecoration: "underline" }} >電話（お店）　：　０４２２－４０－６７５７</a><br/>
          　  <a href="tel:090-9756-2401" style={{ textDecoration: "underline" }} >電話（携帯）　：　０９０－９７５６－２４０１</a><br/>
            </b>
            <br/>
          </ul>
        }/>

        <MyCard 
          title="周辺MAP　吉祥寺駅南口から徒歩3分"
          content={
            <ul>
              <li><img src="/static/hp_nango/images/map2.jpg" style={{ margin: "0px" }}/></li>
              <li><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12959.939144145133!2d139.5820566!3d35.701992!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7f9a1ab470ba4cd2!2z44Op44Kk44OW6YWS5aC077yG5Zar6Iy2IOWNl-mDt--8l-S4geebrg!5e0!3m2!1sja!2sjp!4v1565691022933!5m2!1sja!2sjp" width="600" height="450" frameBorder="0" style={{ border: "0" }} allowFullScreen></iframe><br/>
                <small><a href="https://maps.google.co.jp/maps?f=q&amp;source=embed&amp;hl=ja&amp;geocode=&amp;q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%AD%A6%E8%94%B5%E9%87%8E%E5%B8%82%E5%90%89%E7%A5%A5%E5%AF%BA%E5%8D%97%E7%94%BA2-8-8&amp;aq=&amp;sll=35.702352,139.580494&amp;sspn=0.006822,0.010847&amp;vpsrc=6&amp;brcurrent=3,0x6018ee392dd2c103:0xd298689ee77e04dc,0&amp;ie=UTF8&amp;hq=&amp;hnear=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%AD%A6%E8%94%B5%E9%87%8E%E5%B8%82%E5%90%89%E7%A5%A5%E5%AF%BA%E5%8D%97%E7%94%BA%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%98%E2%88%92%EF%BC%98&amp;ll=35.702352,139.580494&amp;spn=0.001758,0.002712&amp;t=m&amp;z=14" style={{ textAlign: "center", color: "#0000FF" }} >大きな地図で見る</a></small>
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

export default Info;