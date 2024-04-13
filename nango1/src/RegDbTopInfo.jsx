import { useState, useEffect, Fragment } from "react";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, serverTimestamp, query, where, orderBy } from "firebase/firestore";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "./firebase";
import {
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";

function RegDbTopInfo() {

  // ログイン判定用
  const [user, setUser] = useState("");
  const [loaded, setLoaded] = useState(false);

  // 編集データ取得用
  const [editTopInfos, setEditTopInfos] = useState([]);
  const [loadedEditTopInfo, setLoadedEditTopInfo] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoaded(true);
    });

    loadTopEditInfo();
  }, []);

  // ログアウト用
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/nango/rt/login");
  }

  const loadTopEditInfo = async () => {
    const q = query(
        collection(db, "top_info")
      // , where("is_del", "==", false)
      , orderBy("created_time","desc")
    );

    let infos = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      infos.push(doc.data())
      // console.log(doc.data());
    });

    setEditTopInfos(infos);
    setLoadedEditTopInfo(true);
  }

  const cnvLine = (msg) => {
    const texts = msg.split("\n").map((item, index) => {
      return (
        <Fragment key={index}>{item}<br/></Fragment>
        // <React.Fragment key={index}>{item}<br /></React.Fragment>
      );
    });
    return <div>{texts}</div>;
  }

  const top_info_nodes = editTopInfos.map((info, ind) => {
    return (
      <div key={ind}>
        <p>
          <span style={{ fontSize: "13px", fontWeight: "bold" }}>
            {info.title}<br/>
          </span>
          {cnvLine(info.content)}
        </p>
        <hr/>
      </div>
    )
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
      e.preventDefault();

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

  const location = useLocation();
  const updateFlag = location.state ? true : false;
  // if (location.state) {
  //   const { ref_id } = location.state;

  //   // urlパラメータにidがある場合は更新画面、そうでない場合は登録画面とする
  //   const updateFlag = location.state !== null ? true : false;
  //   console.log(updateFlag);
  // }

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
                <h2 className="title">■南郷７丁目”からのお知らせの登録　　<button onClick={logout}>ログアウト</button></h2>
                {/* {ref_id} */}
                
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

              {/* <section>
                <h2 className="title">■編集用</h2>
                <ul className="post">
                  <br/>
                  { loadedEditTopInfo &&
                    top_info_nodes
                  }
                </ul>
              </section> */}

            </>
          )}
        </>
      )}
    </>
  );
}

export default RegDbTopInfo;