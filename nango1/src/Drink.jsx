import React from "react";

class Drink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="content">
        <section>
          <h2 className="title">■Drink■</h2>
          <ul className="post">
            <li>
              <img src="/static/hp_nango/images/beer.jpg" width="300" /><span style={{ fontSize: "20px", fontWeight: "bold" }} >ビール</span><br/>
              <p>
                サッポロ黒ラベル　　　600円<br/>
              </p>
            </li>
          </ul>
        </section>

        <section>
          <ul className="post">
            <li>
              <img src="/static/hp_nango/images/komao.jpg" width="300" /><span style={{ fontSize: "20px", fontWeight: "bold" }} >日本酒、焼酎</span><br/>
              <p>
                日本酒　　　　　　　　　　　　　　500円〜<br/>
                芋、麦焼酎　　　　　　　　　　　　500円〜<br/>
                ウーロンハイ、緑茶ハイ、　　　　　500円〜<br/>
                酎ハイ等<br/>
                サワー各種　　　　　　　　　　　　600円〜<br/>
                ジュースの焼酎割　各種　  　　　　　500円<br/>
              </p>
            </li>
          </ul>
        </section>

        <section>
          <ul className="post">
            <li><span style={{ fontSize: "20px", fontWeight: "bold" }} >ボトル（ボトルキープ可）</span><br/>
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
        </section>

        <section>
          <ul className="post">
            <li><span style={{ fontSize: "20px", fontWeight: "bold" }} >ウィスキー／ショット</span><br/>
              <p>
                ショートカクテル各種　　　700円〜<br/>
                ウイスキー、ショット各種　500円〜<br/>
              </p>
            </li>
          </ul>
        </section>

        <section>
          <ul className="post">
            <li><span style={{ fontSize: "20px", fontWeight: "bold" }} >ノンアルコール／ソフトドリンク</span><br/>
              <p>
                ジュース各種　　　　　　　500円〜<br/>
                ノンアルコールビール　　　500円〜<br/>
              </p>
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

export default Drink;