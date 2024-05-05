import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <footer id="footer" style={{ clear: "both" }}>
        <p id="copyright">&copy;2019-2024 okbmsyk.</p>
      </footer>
    );
  };
}

export default Footer;