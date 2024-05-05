import { useState, useEffect, Fragment } from "react";
import { collection, addDoc, getDocs, doc, setDoc, getDoc, serverTimestamp, query, where, orderBy } from "firebase/firestore";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "./firebase";
import {
  useNavigate,
  Navigate,
  Link 
} from "react-router-dom";
import MyCard from "./common/MyCard";

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
      infos.push({id: doc.id, data: doc.data()})
      // console.log(doc.data());
    });

    setEditTopInfos(infos);
    setLoadedEditTopInfo(true);
  }

  const cnvLine = (msg) => {
    const texts = msg.split("\n").map((item, index) => {
      return (
        <Fragment key={index}>{item}<br/></Fragment>
      );
    });
    return <div>{texts}</div>;
  }

  const top_info_nodes = editTopInfos.map((info, ind) => {
    return (
      <div key={ind}>
        <p>
          <Link to={"/nango/rt/regdb_top_info"} state={{ ref_id: info.id }}>編集</Link><br/>
          <span style={{ fontSize: "13px", fontWeight: "bold" }}>
            {info.data.title}<br/>
          </span>
          {cnvLine(info.data.content)}
        </p>
        <hr/>
      </div>
    )
  });

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
    <>
      {loaded && (
        <>
          {!user ? (
            // ログインしていなければ、ログイン画面へ
            <Navigate to={`/nango/rt/login`} />
          ) : (
            // ログインしていれば、編集画面を表示
            <div id="info">
              <MyCard 
                title={<h2>編集用&nbsp;&nbsp;<button onClick={logout}>ログアウト</button></h2>}
                content={
                  <ul>
                    <Link to="/nango/rt/edit_info"><strong>★編集一覧画面</strong></Link>&nbsp;&nbsp;
                    <Link to="/nango/rt/regdb_top_info"><strong>★登録/更新画面</strong></Link>
                    <br/>
                    { loadedEditTopInfo &&
                      top_info_nodes
                    }
                  </ul>
                }
                shareUrl="https://nango7.okbmk.com/"
                msg="フォーク酒場　“南郷７丁目”"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default RegDbTopInfo;