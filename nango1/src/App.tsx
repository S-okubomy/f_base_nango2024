// Not used

import React, {lazy,Suspense} from "react";
import ReactDOM from "react-dom";
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';
import { BrowserRouter as Router, Route } from "react-router-dom";

const app = document.getElementById('App');

const Top = lazy(() => import('./Top'));
// const Info = lazy(() => import('./Info'));
// const System = lazy(() => import('./System'));
// const YoutubeInfo = lazy(() => import('./YoutubeInfo'));
// const Party = lazy(() => import('./Party'));
// const Drink = lazy(() => import('./Drink'));
// const Food = lazy(() => import('./Food'));
// const Event = lazy(() => import('./Event'));
// const PlayMusicInfo = lazy(() => import('./PlayMusicInfo'));
// const CommentBox = lazy(() => import('./CommentBox'));
// const QaByAi = lazy(() => import('./QaByAi'));
// const MakeMusicMelo = lazy(() => import('./MakeMusicMelo'));
const LoadingComponent  = () => <div>Loading...</div>

const App = () => {
  // ReactDOM.render(
  //   <Router>
  //     <Header />
  //     <div id="wrapper">
  //       <Route path="/" Component={Top} ></Route>
  //       <Route path="/nango/" Component={Top} ></Route>
  //       <Route path="/nango/:id" Component={Top} ></Route>
  //       <Sidebar />
  //     </div>
  //     <Footer />
  //   </Router>
  // , app);
  // return <App/>;
  // return <Header />;
  return <div>Loading...</div>;
};

export default App;