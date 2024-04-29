import React from "react";
import QaCmt from "./QaCmt";
import { Link } from "react-router-dom";

class QaList extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const commentNodes = this.props.qa_infos.map((comment, ind) => {
        return (
          <div className="kaiwa" key={ind}>
            <figure className="kaiwa-img-left">
              <Link to="/nango/rt/test_temp">
                <img src="/static/hp_nango/images/favicon.ico"/>
              </Link>
              <figcaption className="kaiwa-img-description">{comment.author}</figcaption>
            </figure>
            <div className="kaiwa-text-right">
              <p className="kaiwa-text">
                <QaCmt >
                  {comment.content}
                </QaCmt>
              </p>
            </div>
          </div>
        );
      });
  
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    };
}

export default QaList;