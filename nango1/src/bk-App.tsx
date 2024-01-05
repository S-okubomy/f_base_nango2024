import {
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import React from "react";
import { auth } from "./firebase";

const App = () => {
  signInWithEmailAndPassword(auth, "test202401041348@gmail.com", "test202401041348").then(
    (credential: UserCredential) => {
      const user: User = credential.user;
      if (user) {
        console.log("test login OK");
      }
    }
  );
  return <div className="App">App</div>;
};

export default App;
