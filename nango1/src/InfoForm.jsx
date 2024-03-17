import React from "react";

class InfoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        author: '',
        content: '',
      };
      this.onTextAreaChange = this.onTextAreaChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.initCommentForm = this.initCommentForm.bind(this);
    }

    initCommentForm() {
      this.setState({
        author: '',
        content: '',
      });
    }
  
    onTextAreaChange(e){
      this.setState({ content: e.target.value });
    }
  
    // 新規追加
    handleSubmit(e) {
      e.preventDefault();
      this.setState({
        author: '質問者',  // authorをシステム側でセット
      });
      let author = this.state.author.trim();
      let content = this.state.content.trim();
      if (!content) {
        return;
      }

      // 親コンポーネントのhandleCommentSubmitを実行する
      this.props.onCommentSubmit({
        author: this.state.author,
        content: this.state.content,
      });
    }
  
    render() {
      return (
        <form className="commentForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: "5px", textAlign: "right" }}>
            <div className="qa_iptxt">
              <label className="qa_iptxt_f">
                <input type="text" value={this.state.content} onChange={this.onTextAreaChange}
                  placeholder="ご質問入力してください。" />
              </label>
            </div>
            
            <input type='submit' value='質問する' required className="qa_button" />
          </div>
        </form>
      );
    };
}

export default InfoForm;