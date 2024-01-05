import React from "react";

class Party extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="content">
        <section>
          <ul className="post">
            <img src="/static/hp_nango/images/plan_main.jpg" width="100%" alt="貸切" style={{ margin: "0px" }} />
          </ul>
        </section>

        <section>
          <h2 className="title">■宴会プラン</h2>
          <ul className="post">
            <p>10～30名様でご利用いただけるお得な貸切プランを各種ご用意しております。<br/>
              「歌会」　「歓送迎会」　 「クリスマス会」　「新年会」 「音楽教室」など、各種会にご利用ください。
              内容のご相談も承ります。　詳しくはお問合せください。<br/>
              11人以上のご利用で幹事さん（お一人）の特典もあり♪
            </p>
          </ul>
        </section>

        <section>
          <h2 class="title">■　ご予約　・　お問合せ　■</h2>
          <ul class="post">
            <b>　
          　  <br/>
          　  <a href="tel:0422406757" style={{ textDecoration: "underline" }} >電話（お店）　：　０４２２－４０－６７５７</a><br/>
          　  <a href="tel:090-9756-2401" style={{ textDecoration: "underline" }} >電話（携帯）　：　０９０－９７５６－２４０１</a><br/>
            </b>
            <br/>
            　　　　<b>　　　※1週間くらい前までにご予約ください。</b><br/>
            <br/>
            <b>　キャンセル ：    ２日前までにご連絡ください。<br/></b>　
                  ※前日、当日キャンセルは、キャンセル料を頂きます。<br/>
            <br/>
          </ul>
        </section>

        <section>
          <ul className="post">
            <li>
                ※　当店では飲酒運転防止のため、お車でお越しのお客様には、アルコール類のご提供は致しておりません。<br/>
                ※　20歳未満のお客様に関しても、同様にアルコールのご提供はしておりません。      <br/>
                ※　自転車来店後の飲酒運転自粛をお願いしています。
            </li>
          </ul>
        </section>

        <section>
          <ul className="post">
            <span style={{ fontSize: "5px" }}>
                ※作成中のため、一部内容が古い場合がございますが、<br/>
                ご了承お願い致します&#x1f647;
            </span>
          </ul>
        </section>
      </div>
    );
  };
}

export default Party;