import React from "react";
import MyCard from "./common/MyCard";
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";

class Drink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="info">
        <MyCard 
          title={<h2>■Drink■</h2>}
          content={
            <ul>
              <li>
                <img src="/static/hp_nango/images/beer.jpg" width="300" style={{ clear: "both", float:"left" }} /><span style={{ fontSize: "20px", fontWeight: "bold" }} >ビール</span><br/>
                <p>
                  サッポロ黒ラベル　　　600円<br/>
                </p>
                <br/><br/><br/><br/><br/><br/><br/><br/>
              </li>
              <li>
                <img src="/static/hp_nango/images/komao.jpg" width="300" style={{ clear: "both",  float:"left" }} /><span style={{ fontSize: "20px", fontWeight: "bold" }} >日本酒、焼酎</span><br/>
                <p>
                  日本酒　　　　　　　　　　　　　　500円〜<br/>
                  芋、麦焼酎　　　　　　　　　　　　500円〜<br/>
                  ウーロンハイ、緑茶ハイ、　　　　　500円〜<br/>
                  酎ハイ等<br/>
                  サワー各種　　　　　　　　　　　　600円〜<br/>
                  ジュースの焼酎割　各種　  　　　　　500円<br/>
                  <br/><br/>
                </p>
              </li>
            </ul>
        }/>

        <MyCard 
          title={<h2>ボトル（ボトルキープ可）</h2>}
          content={
            <ul>
              <li>
                <p>
                  鏡月　　　　　　　　　　　3,000円<br/>
                  角　　　　　　　　　　　　5,500円<br/>
                  アーリタイムス　　　　　　5,500円<br/>
                  ハーパー　　　　　　　　　6,500円<br/>
                  ジャックダニエル　　　　　7,000円<br/>
                  ワイン（赤、白）　　　　　3,000円〜<br/>
                  その他<br/>
                  ボトルセット　　　　　　　500円<br/>
                  　(ウーロン茶、ミネラルウォーター、炭酸、氷代)<br/>
                  <br/>
                  ※ボトルキープは６カ月とさせていただきます
                </p>
              </li>
            </ul>
        }/>

        <MyCard 
          title={<h2>ウィスキー／ショット</h2>}
          content={
            <ul>
              <li>
                <p>
                  ショートカクテル各種　　　700円〜<br/>
                  ウイスキー、ショット各種　500円〜<br/>
                </p>
              </li>
            </ul>
        }/>

        <MyCard 
          title={<h2>ノンアルコール／ソフトドリンク</h2>}
          content={
            <ul>
              <li>
                <p>
                  ジュース各種　　　　　　　500円〜<br/>
                  ノンアルコールビール　　　500円〜<br/>
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

export default Drink;