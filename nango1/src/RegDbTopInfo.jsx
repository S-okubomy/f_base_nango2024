import { useState, useEffect, Fragment } from "react";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, serverTimestamp, query, where, orderBy, updateDoc, deleteDoc } from "firebase/firestore";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "./firebase";
import {
  useNavigate,
  Navigate,
  useLocation,
  Link
} from "react-router-dom";

function RegDbTopInfo() {

  // ログイン判定用
  const [user, setUser] = useState("");
  const [loaded, setLoaded] = useState(false);

  // 登録/更新フォーム用
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDel, setIsDel] = useState(false);
  const [isDbDel, setIsDbDel] = useState(false);

  // 更新確認用
  const location = useLocation();
  const updateFlag = location.state && location.state.ref_id ? true : false;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoaded(true);
    });

    if (updateFlag) {
      console.log("ref_id: " + location.state.ref_id)
      loadTopEditInfo(location.state.ref_id);
    }

  }, []);

  // ログアウト用
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/nango/rt/login");
  }

  const loadTopEditInfo = async (refId) => {
    const docRef = doc(db, "top_info", refId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setTitle(data.title);
      setContent(data.content);
      setIsDel(data.is_del);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const onSubmit = async (e) => {
      e.preventDefault();

      if (updateFlag) {
        let res1 = window.confirm('本当に内容を更新しますか？');
        if (res1) {
          updateDB();
          alert("内容を更新しました。")
          if (isDbDel) {
            let res2 = window.confirm('データベースから削除します。削除すると復元できません。本当に削除しますか？');
            if (res2) {
              deleteDB();
            } else {
              alert("削除処理はキャンセルしました。")
            }
          }
        } else {
          alert("処理をキャンセルしました。")
        }
      } else {
        let res3 = window.confirm('本当に内容を登録しますか？');
        if (res3) {
          insertDB();
          alert("内容を登録しました。")
        } else {
          alert("処理をキャンセルしました。")
        }
      }
  }

  const updateDB = async () => {
    const top_info_Ref = doc(db, "top_info", location.state.ref_id);
    await updateDoc(top_info_Ref, {
      title,
      content,
      created_time: serverTimestamp(),
      is_del: isDel,
    });
    console.log("Document updated with ID: ", top_info_Ref.id);
  }

  const insertDB = async () => {
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

  const deleteDB = async () => {
    await deleteDoc(doc(db, "top_info", location.state.ref_id));
    console.log("Document delete");
  }

  // TODO 


  return (
    <>
      {loaded && (
        <>
          {!user ? (
            // ログインしていなければ、ログイン画面へ
            <Navigate to={`/nango/rt/login`} />
          ) : (
            // ログインしていれば、DB登録画面を表示
            <>
              <section>
                <h2 className="title">■南郷７丁目”からのお知らせの{updateFlag ? "編集" : "登録"}&emsp;<button onClick={logout}>ログアウト</button></h2>
                <ul className="post">
                  <Link to="/nango/rt/edit_info"><strong>★編集一覧画面</strong></Link>&nbsp;&nbsp;
                  <Link to="/nango/rt/regdb_top_info"><strong>★登録/更新画面</strong></Link>
                  <form onSubmit={onSubmit}>
                    <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
                      <label htmlFor="title">タイトル</label>
                    </div>
                    <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
                      <input
                          type="text"
                          id="title"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
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
                          value={content}
                      />
                    </div>
                    <br/>
                    <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
                      <input 
                        type="checkbox" 
                        checked={isDel} 
                        onChange={(e) => setIsDel(e.target.checked)}
                      />
                      {' '} <label htmlFor="content">一覧から非表示</label>
                    </div>
                    <br/>
                    <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
                      <input 
                        type="checkbox" 
                        checked={isDbDel} 
                        onChange={(e) => setIsDbDel(e.target.checked)}
                      />
                      {' '} <label htmlFor="content">データベースから削除</label>
                    </div>
                    <br/>
                    <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
                      <button type="submit">{updateFlag ? "編集" : "登録"}</button>
                    </div>
                  </form>
                </ul>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}

export default RegDbTopInfo;