import React from "react";

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="content">
        <section>
          <h2 className="title"><span style={{ fontSize: "15px", fontWeight: "bold" }} >■イベントカレンダー■</span></h2>
          <ul className="post">
            <iframe src="https://freecalend.com/open/mem108709_nopopon" style={{ border: "solid 1px #777"}} width="880" height="600" frameborder="0" scrolling="no"></iframe>
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

export default Event;