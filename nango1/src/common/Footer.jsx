import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <footer id="footer">
        <p id="copyright">&copy;2019-2024 okbmsyk. Design by <a href="http://f-tpl.com" target="_blank" rel="nofollow" style={{ textDecoration: "underline" }} >http://f-tpl.com</a></p>
      </footer>
    );
  };
}

export default Footer;