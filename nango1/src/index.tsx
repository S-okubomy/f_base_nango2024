import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import App from "./App";
// import "./index.css";
import "./css/rt.css";
import "./css/myStyle.css";
// import { BrowserRouter } from 'react-router-dom'

import React, {lazy,Suspense} from "react";
// import ReactDOM from "react-dom";
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';

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
const InfoReg = lazy(() => import('./InfoReg'));
// const MakeMusicMelo = lazy(() => import('./MakeMusicMelo'));
const RegDbTopInfo = lazy(() => import('./RegDbTopInfo'));
const EditInfoList = lazy(() => import('./EditInfoList'));
const Login = lazy(() => import('./Login'));

const LoadingComponent  = () => <div>Loading...</div>

const container = document.getElementById("app")!;
const root = createRoot(container);



root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <Grid container spacing={2} >
            <Grid xs={12} >
              <Header />
            </Grid>
            <Suspense fallback={LoadingComponent()}>

              <Grid xs={12} md={8} mdOffset={0} >
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
                  <Route path="/nango/rt/info_reg" Component={InfoReg} ></Route>
                  <Route path="/nango/rt/regdb_top_info" Component={RegDbTopInfo} ></Route>
                  <Route path="/nango/rt/edit_info" Component={EditInfoList} ></Route>
                  <Route path="/nango/rt/login" Component={Login} ></Route>
                  {/* <Route path="/nango/rt/make_music_melo_temp" Component={MakeMusicMelo} ></Route> */}
                </Routes>
              </Grid>
              <Grid xs={12} md={4} >
                <Sidebar />
              </Grid>
                
              <Grid xs={12} md={12} >
                <Footer />
              </Grid>
            </Suspense>
          </Grid>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


