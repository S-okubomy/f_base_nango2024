import React from "react";
import MyCard from "./common/MyCard";
import CardContent from '@mui/material/CardContent';

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="info">
        <MyCard 
          title={<h2>イベントカレンダー</h2>}
          content={
            <ul>
              <iframe src="https://freecalend.com/open/mem108709_nopopon" style={{ border: "solid 1px #777"}} width="880" height="600" 
                frameBorder="0" scrolling="no" loading="lazy"></iframe>
            </ul>
          }
          shareUrl="https://nango7.okbmk.com/nango/rt/event_nango_temp"
          msg="フォーク酒場　“南郷７丁目”　イベントカレンダー"
        />

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

export default Event;