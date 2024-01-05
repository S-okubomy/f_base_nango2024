import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
// import "./index.css";
import "./css/rt.css";
import "./css/style.css";
// import { BrowserRouter } from 'react-router-dom'

import React, {lazy,Suspense} from "react";
import ReactDOM from "react-dom";
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Top = lazy(() => import('./Top'));
const Info = lazy(() => import('./Info'));
const System = lazy(() => import('./System'));
const YoutubeInfo = lazy(() => import('./YoutubeInfo'));
const Party = lazy(() => import('./Party'));
const Drink = lazy(() => import('./Drink'));
const Food = lazy(() => import('./Food'));
const Event = lazy(() => import('./Event'));
const PlayMusicInfo = lazy(() => import('./PlayMusicInfo'));
const QaByAi = lazy(() => import('./QaByAi'));
// const MakeMusicMelo = lazy(() => import('./MakeMusicMelo'));
const LoadingComponent  = () => <div>Loading...</div>

const container = document.getElementById("app")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        {/* <App /> */}
        <BrowserRouter>
          <Header />
          <Suspense fallback={LoadingComponent()}>
            <div id="wrapper">
              <Routes>
                <Route path="/" Component={Top} ></Route>
                <Route path="/nango" Component={Top} ></Route>
                <Route path="/nango/" Component={Top} ></Route>
                <Route path="/nango/:id" Component={Top} ></Route>
                {/* <Route path="/nango/rt/board_nango_temp" Render={() => <CommentBox url="get_board_cmt" pollInterval={20000} />}></Route> */}
                <Route path="/nango/rt/info_nango_temp" Component={Info} ></Route>
                <Route path="/nango/rt/system_nango_temp" Component={System} ></Route>
                <Route path="/nango/rt/youtube_info_nango_temp" Component={YoutubeInfo} ></Route>
                <Route path="/nango/rt/party_nango_temp" Component={Party} ></Route>
                <Route path="/nango/rt/drink_nango_temp" Component={Drink} ></Route>
                <Route path="/nango/rt/food_nango_temp" Component={Food} ></Route>
                <Route path="/nango/rt/event_nango_temp" Component={Event} ></Route>
                <Route path="/nango/rt/play_music_info_nango_temp" Component={PlayMusicInfo} ></Route>
                {/* <Route path="/nango/rt/test_temp" render={() => <h1>皆様よろしくお願いします&#x1f647;</h1>}></Route> */}
                <Route path="/nango/rt/qa_by_ai_temp" Component={QaByAi} ></Route>
                {/* <Route path="/nango/rt/make_music_melo_temp" Component={MakeMusicMelo} ></Route> */}
              </Routes>
              <Sidebar />
            </div>
            <Footer />
          </Suspense>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


