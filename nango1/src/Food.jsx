import React from "react";

class Food extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="content">
        <section>
          <h2 className="title"><span style={{ fontSize: "15px", fontWeight: "bold" }} >■お食事■</span></h2>
          <ul className="post">
            <li><img src="/static/hp_nango/images/zoni1.jpg" width="300" /><span style={{ fontSize: "20px", fontWeight: "bold" }} >お食事</span><br/>
              <p>
                お料理は当日のおすすめメニューのみとなります。
              </p>
            </li>
            <li><img src="/static/hp_nango/images/tuku1.jpg" width="300" /><span style={{ fontSize: "20px", fontWeight: "bold" }} >一品料理</span><br/>
              <p>
                冷奴　　　　　　　　　　　400円<br/>
                枝豆　　　　　　　　　　　400円<br/>
                じゃがバター　　　　　　　600円<br/>
                レーズンバター　　　　　　600円<br/>
                ソーセージ盛り合わせ　　　700円<br/>
                ミックスナッツ　　　　　　500円<br/>
                <br/>
                ※その他のメニューございます。
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

export default Food;