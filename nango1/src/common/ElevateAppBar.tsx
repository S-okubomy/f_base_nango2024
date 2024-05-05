import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function ElevateAppBar(props: Props) {
  return (
    <React.Fragment>
        <AppBar position="static" {...props}>
          <Toolbar>
            <Typography variant="h6" component="div">
              フォーク酒場　“南郷７丁目”の店内風景です。
            </Typography>
          </Toolbar>
        </AppBar>
      <Toolbar />
      <Container>
      <Box sx={{ my: 0 }}>
          {[...new Array(1)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box>

        <div>

          <ul style={{ listStyle: "none" }} >
            <li>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜気楽、和気あいあいを大切に＞</span><br/>
                  当店は初めての方でも、気楽に楽しいひと時をモットー<br/>
                  にしております。また、楽器演奏有無、年齢問わず<br/>
                  老若男女、和気あいあいとした雰囲気です。<br/>
                  是非、お気軽にお越しください。<br/>
                  { /* TODO 一旦無効化しているので戻す  AI南郷君のお家!!!!!!!! */ }
                  {/* <AnimeNangoAi /> */}
            </li>
            <li>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜リーズナブルな価格＞</span><br/>
                当店はリーズナブルな価格で楽しいひと時のご提供を<br/>
                心がけております。<br/>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} > チャージ料金 1500円</span>、ビール等の<br/>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} >アルコール類を500円より</span><br/>
                提供しております。演奏代無料で楽器演奏できます。<br/>
            </li>
            <li>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜楽器は自由に、未経験でもOK＞</span><br/>
                お店の楽器は自由に使えます。店内には<br/>
                アコースティックギター、エレキギター、ベース、<br/>
                ピアノ等あります。手ぶらで大丈夫ですので、特に<br/>
                平日仕事帰り等でもふらっと寄って気軽に弾けます。<br/>
                タンバリンもありますので、楽器経験が無い方も<br/>
                楽しめます。<br/>
            </li>
            <li>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜ライブ配信及び動画収録＞</span><br/>
                新型コロナ対応によるイベント自粛要請により、<br/>
                イベント等が敬遠されております。<br/>
                当店はそのような中、初心者からプロの<br/>
                ミュージシャンまで幅広く、<br/>
                音楽活動等ができるよう応援したく考えております。<br/>
                このような考えで、ライブ配信及び動画収録サービス<br/>
                を開始いたしました。<br/>
                詳細は
                <Link to="/nango/rt/youtube_info_nango_temp" ><span style={{ fontWeight: "bold", color: "blue" }} >こちら</span></Link>
                をご覧ください。
            </li>
            <li>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜衛生対策に関しまして＞</span><br/>
                ◆店内の消毒について<br/>
                &nbsp;&nbsp;お客様にご安心してご利用いただけるよう、<br/>
                &nbsp;&nbsp;店内を消毒するなど<span style={{ fontSize: "20px", fontWeight: "bold", color: "red" }} >新型コロナウイルス対策</span><br/>
                &nbsp;&nbsp;を徹底しております。<br/>
                ◆店頭でのアルコール消毒設置について<br/>
                &nbsp;&nbsp;店頭にお客様用アルコール消毒液の設置<br/>
                &nbsp;&nbsp;を強化しています。ご自由にご使用ください。<br/>
                ◆従業員について<br/>
                &nbsp;&nbsp;出勤時に必ず健康チェック<br/>
                &nbsp;&nbsp;を行っています。<br/>
                &nbsp;&nbsp;手洗いは石鹸液と消毒液による<br/>
                &nbsp;&nbsp;洗浄と殺菌を徹底し、こまめに行っています。<br/>
                &nbsp;&nbsp;予防対策として、マスクを着用し、<br/>
                &nbsp;&nbsp;ご対応させていただく場合がございます。<br/>
                
                ご不便をおかけしますが、<br/>
                何卒ご理解頂けますようお願いいたします。<br/>
            </li>
            <li>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }} >＜アクセスの良さ＞</span><br/>
                当店はJR吉祥寺駅より徒歩3分とアクセスしやすい立地となっております。<br/>
                <table>
                  <tbody>
                    <tr><td><img src="/static/hp_nango/images/map2.jpg" alt="" width="400" /></td></tr>
                    <tr><td><Link to="/nango/rt/info_nango_temp" ><span style={{ fontWeight: "bold", color: "blue" }} >詳細はこちらをクリック</span></Link></td></tr>
                  </tbody>
                </table>
            </li>
          </ul>
        </div>
      </Container>
    </React.Fragment>
  );
}