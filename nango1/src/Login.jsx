import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebase";
/* 「Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";
import MyCard from "./common/MyCard";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch(error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <>
      {user ? (
        <Navigate to={`/nango/rt/regdb_top_info`} />
      ) : (
            <div id="info">
              <MyCard 
                title={<h2>ログイン画面</h2>}
                content={
                  <ul>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label>メールアドレス</label>&nbsp;
                        <input
                        name="email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>パスワード</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          name="password"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                      <button>ログイン</button>
                    </form>
                  </ul>
                }
                shareUrl="https://nango7.okbmk.com/"
                msg="フォーク酒場　“南郷７丁目”"
              />
            </div>


      )}
    </>
  );
};

export default Login;