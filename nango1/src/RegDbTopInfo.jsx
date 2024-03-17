import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";


function RegDbTopInfo() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        // console.log(first);

        try {
            const top_info_Ref = await addDoc(collection(db, "top_info"), {
                title,
                content,
                created_time: serverTimestamp(),
                is_del: false,
            });
            
            console.log("Document written with ID: ", top_info_Ref.id);
        } catch (error) {
            console.log("err!!: " + error);
        }
    
    }
        

  return (
    <div>
      <section>
        <h2 className="title">■南郷７丁目”からのお知らせの登録</h2>
        <ul className="post">
        <form onSubmit={onSubmit}>
          <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
            <label htmlFor="title">タイトル</label>
          </div>
          <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
            <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br/>
          <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
            <label htmlFor="content">お知らせ内容</label>
          </div>
          <br/>
          <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
            <textarea
                type="text"
                id="content"
                onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <br/>
          <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
            <button type="submit">登録</button>
          </div>
        </form>
        </ul>
      </section>
    </div>
  );
}

export default RegDbTopInfo;