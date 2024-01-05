import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

class QaCmt extends React.Component {
    constructor(props) {
      super(props);
    }
  
    rawMarkup() {
      let rawMarkup = DOMPurify.sanitize(marked(this.props.children.toString()));
      return { __html: rawMarkup };
    };
  
    render() {
      return (
        <div className="comment">
          <div>
            <span style={{ fontSize: "17px" }} dangerouslySetInnerHTML={this.rawMarkup()} />
          </div>
        </div>
      );
    };
}

export default QaCmt;