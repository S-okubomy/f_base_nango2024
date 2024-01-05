import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-bootstrap';
import { Sampler, context, Transport, Part } from 'tone'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { melo, mapItaToToneScale, cordProgreList, sampMusList, } from './common/musConst';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import * as instruments from './common/instruments';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    ButtonPerChord, SelectCordProgre, SelSampMus, SelectShowCol, SelInst, SelCapo, PrintArea, FileOpBtn // コンポーネント
    , getMeloPerBar, getMeloByCordProgres, getCodeForToneJs, getChordObjListForTone, eventName // メソッド
    , meloNumPerBar, expanSign, dlFileName // 定数
} from './common/ComMusicPart';

const isAreart = (state, barStrArr) => { 
  return !state.isPlaying && (barStrArr.length === 0 || !state.bpmNum || isNaN(state.bpmNum));
}

class MakeMusicMelo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        btnArr:[],
        textAreaArr: [],
        contTextAreaArr: [], // テキストエリアの中身の文字用
        cordProgressId: 0, // コード進行セレクトボックス用
        bpmNum: 100,
        isPlaying: false,
        chordChecked: true,
        meloChecked: false,
        chordVol: 30, // ボリューム 0〜100
        meloVol: 70, // メロディ 0〜100
        showCol: 2, // 表示列数
        memo: "", // メモ
        loadingCode: true,
        loadingMelo: true,
        instVal: "Piano",
        instCode: this.setInstCode("Piano"),
        instMelo: this.setInstMelo("Piano"),
        gTabId: 0, // サンプル曲 セレクトボックス用
        isAlertOpen: false, // アラート用
        capo: 0, // カポ
      };
      this.addTextArea = this.addTextArea.bind(this);
      this.makeBtnChords = this.makeBtnChords.bind(this);
      this.onTextAreaChange = this.onTextAreaChange.bind(this);
      this.getTextAreaPerBar = this.getTextAreaPerBar.bind(this);
      this.clearHandle = this.clearHandle.bind(this);
      this.selectProgHandle = this.selectProgHandle.bind(this);
      this.playMusHandle = this.playMusHandle.bind(this);
      this.onBpmNumChange = this.onBpmNumChange.bind(this);
      this.onChordChkBoxChange = this.onChordChkBoxChange.bind(this);
      this.onMeloChkBoxChange = this.onMeloChkBoxChange.bind(this);
      this.chordVolHandle = this.chordVolHandle.bind(this);
      this.meloVolHandle = this.meloVolHandle.bind(this);
      this.selShowColOnChange = this.selShowColOnChange.bind(this);
      this.onMemoChange = this.onMemoChange.bind(this);
    }
  
    componentDidMount() {
      this.makeBtnChords();
      // ユーザイベントの後に AudioContext の resume が必要なため。
      window.addEventListener(eventName, this.resumeAudioContext)
    }

    componentWillUnmount() {
      this.handleMusStop()
    }

    componentDidUpdate(prevProps) {
      window.addEventListener(eventName, this.resumeAudioContext)
    }

    resumeAudioContext = () => {
      context.resume()
      window.removeEventListener(eventName, this.resumeAudioContext)
    }

    handleMusChgPlaying = (state) => this.setState({ isPlaying: state });
    handleMusStop = () => {
      Transport.stop()
      Transport.cancel()
      Transport.clear()
      this.handleMusChgPlaying(false)
    }

    setInstCode = (type, setLoading = true) => {
      try {
        if (setLoading && this.state && this.state.loadingCode === false) this.setState({ loadingCode: true })
        const onLoad = () => this.setState({ loadingCode: false })
        return new Sampler(...instruments.types(onLoad)[type]).toDestination();
      } catch(e) {
        console.log("catch Error!!!!!!!")
      }
    }

    setInstMelo = (type, setLoading = true) => {
      try {
        if (setLoading && this.state && this.state.loadingMelo === false) this.setState({ loadingMelo: true })
        const onLoad = () => this.setState({ loadingMelo: false })
        return new Sampler(...instruments.types(onLoad)[type]).toDestination();
      } catch(e) {
        console.log("catch Error!!!!!!!")
      }
    }

    selInstOnChange = (e) => {
      e.preventDefault();
      this.setState({
        instVal: e.target.value
      }, () => {
        this.setState({
          instCode: this.setInstCode(this.state.instVal),
          instMelo: this.setInstMelo(this.state.instVal),
        });
      });
    }

    selCapoOnChange = (e) => {
      e.preventDefault();
      this.setState({
        capo: e.target.value
      }, () => {
      });
    }

    addTextArea(codeKey, e) {
      e.preventDefault();
      const meloPerBar = getMeloPerBar(codeKey, meloNumPerBar);
      const txtAriaCont = codeKey + expanSign.repeat(7) + "\n" + meloPerBar["melos"]; // expanSign（"~"）を7個つける

      this.setState({
        contTextAreaArr: this.state.contTextAreaArr.concat(txtAriaCont), // コードボタンが押されたら、テキストエリアに文字をセット
      },() =>{ // setStateは非同期のため、コールバック関数にする。
        const textAreaId = this.state.textAreaArr.length;
        this.setState({
          textAreaArr: this.state.textAreaArr.concat(this.getTextAreaPerBar(textAreaId)),
        });
      });
    }

    makeBtnChords() {
      const curArr = Object.assign([], this.state.textAreaArr);
      Object.keys(melo).map((codeKey, keyInd) => {
        curArr.push(<ButtonPerChord key={keyInd} codeKey={codeKey} addTextArea={(e) => this.addTextArea(codeKey, e)}/>)
      });
      this.setState({
        btnArr: curArr,
      });
    }

    onTextAreaChange(e, textAreaId){
      e.preventDefault();
      const copyContTextAreaArr = [...this.state.contTextAreaArr];
      copyContTextAreaArr[textAreaId] = e.target.value;

      this.setState({
        contTextAreaArr: copyContTextAreaArr,
      }, () => {
        const newTextAreaArr = [...this.state.textAreaArr]
        newTextAreaArr[textAreaId] = this.getTextAreaPerBar(textAreaId) // これがないとテキストエリアが再レンダーされない
        this.setState({textAreaArr: newTextAreaArr})
      });
    }
    
    getTextAreaPerBar(textAreaId) {
      const showCol = Math.round(12 / this.state.showCol);
        return (
          <Col xs={showCol} sm={showCol} md={showCol} lg ={showCol} style={{ margin: "0px" ,padding: "0px"}}>
            <TextField key={`textId-${textAreaId}`} required id="filled-basic" multiline variant="filled" margin="normal" 
              fullWidth
              style={{ margin: "3px 0px 3px 0px" ,padding: "0px"}}
              label={`第${textAreaId+1}小節`}
              value={this.state.contTextAreaArr[textAreaId]}
              onChange={(e) => this.onTextAreaChange(e, textAreaId)}
            />
          </Col>
        );
    }

    clearHandle(e) {
      e.preventDefault();
      this.setState({
        textAreaArr: [],
        contTextAreaArr: [], // テキストエリアの中身の文字用
      },() =>{
      });
    }

    playMusHandle(e) {
      e.preventDefault();
      
      const barStrArr = [];
      const meloStrArr = [];
      this.state.contTextAreaArr.map(tAreaStr => {
        const [chords, melos] = tAreaStr.split(/\n/);
        barStrArr.push(chords.trim());
        meloStrArr.push(melos.trim());
      })

      if (isAreart(this.state, barStrArr)) {
        this.setState({
          isAlertOpen: true,
        },() => {
          return;
        });
      }

      // 不正の場合、Alertダイアログでアラートは出るが、処理が止まらないため、ここでストップさせる。
      if (isAreart(this.state, barStrArr)) return;

      if (this.state.isPlaying) {
        this.setState({
          isPlaying: false,
        }, () => {
          Transport.stop();
          //イベントクリア
          Transport.cancel();
          Transport.clear()
          return;
        });
      } else {
        this.setState({
          isPlaying: true,
        }, () => {
          // コードのインスタンス
          const chordObjListForTone = getChordObjListForTone(barStrArr, getCodeForToneJs, this.state.chordVol, this.state.capo); // 関数を引数として渡す
          console.log("chordObjListForTone: ", chordObjListForTone)
          const synthForCode = this.state.instCode;
          const toneForChord = new Part((time, note) => {
            synthForCode.triggerAttackRelease(note.note, note.duration, time, note.velocity);
          }, chordObjListForTone);

          // メロディーのインスタンス
          const meloObjListForTone = getChordObjListForTone(meloStrArr, melo => mapItaToToneScale[melo], this.state.meloVol, this.state.capo); // 関数を引数として渡す
          console.log("meloObjListForTone: ", meloObjListForTone)
          const synthForMelo = this.state.instMelo;
          const toneForMelo = new Part((time, note) => {
            synthForMelo.triggerAttackRelease(note.note, note.duration, time, note.velocity);
          }, meloObjListForTone);

          if (this.state.chordChecked) {
            //コード再生
            toneForChord.start();
          }
          if (this.state.meloChecked) {
            toneForMelo.start();
          }
          //テンポ
          Transport.bpm.value = this.state.bpmNum;
          // Tone.Transport.bpm.rampTo(this.state.bpmNum, 0.01);
          //再生実行
          Transport.start("+0.3"); // (注): start('1m')と書くと停止後、再スタートできなくなる。
        });
      }
    }

    onBpmNumChange (e){
      this.setState({ bpmNum: e.target.value });
    }

    onMemoChange (e){
      this.setState({ memo: e.target.value });
    }

    onMeloChkBoxChange (e){
      this.setState({ meloChecked: e.target.checked });
    }

    onChordChkBoxChange (e){
      this.setState({ chordChecked: e.target.checked });
    }

    selectProgHandle(e) {
      e.preventDefault();
      this.setState({
        cordProgressId: e.target.value, // 1step: まず、コード進行のidをstateにセット
      },() =>{
        const addContTextAreaArrByCordProgres = getMeloByCordProgres(cordProgreList[this.state.cordProgressId]);
        this.setState({
          contTextAreaArr: this.state.contTextAreaArr.concat(addContTextAreaArrByCordProgres), // 2step: コールバック関数内でテキストエリアにセットする文字列をstateにセット
        }, () => {
          const startTextAreaIndex = this.state.textAreaArr.length;
          const addTextAreaArr = addContTextAreaArrByCordProgres.map((item,ind) => {
            return this.getTextAreaPerBar(startTextAreaIndex+ind);
          })
          this.setState({
            textAreaArr: this.state.textAreaArr.concat(addTextAreaArr), // 3step: 更にネストされたコールバック関数内でコンポーネント（テキストエリア）をstateにセット
          });
        });
      });
    }

    selSampleHandle = (e) => {
      e.preventDefault();
      this.setState({
        gTabId: e.target.value, // 1step: まず、コード進行のidをstateにセット
      },() =>{
        const addContTextAreaArrByGtab = sampMusList[this.state.gTabId]["musCont"];
        this.setState({
          contTextAreaArr: this.state.contTextAreaArr.concat(addContTextAreaArrByGtab), // 2step: コールバック関数内でテキストエリアにセットする文字列をstateにセット
        }, () => {
          const startTextAreaIndex = this.state.textAreaArr.length;
          const addTextAreaArr = addContTextAreaArrByGtab.map((item,ind) => {
            return this.getTextAreaPerBar(startTextAreaIndex+ind);
          })
          this.setState({
            textAreaArr: this.state.textAreaArr.concat(addTextAreaArr), // 3step: 更にネストされたコールバック関数内でコンポーネント（テキストエリア）をstateにセット
          });
        });
      });
    }

    selShowColOnChange(e){
      e.preventDefault();
      this.setState({ showCol: e.target.value }, () => {
      });
    }

    chordVolHandle(event, newValue) {
        this.setState({ chordVol: newValue }, () => {
        });
    }

    meloVolHandle(event, newValue) {
      this.setState({ meloVol: newValue }, () => {
      });
    }

    handleAlertClose = () => {
      this.setState({ isAlertOpen: false }, () => {
      });
    };

    fSaveHandle = (e) => {
      const content = {
        memoTxt: this.state.memo,
        musCont: this.state.contTextAreaArr,
      }
      const blob = new Blob([ JSON.stringify(content) ], { "type" : "text/plain" });
      if (window.navigator.msSaveBlob) { 
          window.navigator.msSaveBlob(blob, dlFileName); 
          // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
          window.navigator.msSaveOrOpenBlob(blob, dlFileName); 
      } else {
          document.getElementById("dlMusicfile").href = window.URL.createObjectURL(blob);
      }
    }

    handleReadFile = (fileObj) => {
      let reader = new FileReader();
      reader.readAsText(fileObj, 'UTF-8');
      let readJsonObj = "";
      reader.onload = () =>{
        readJsonObj = JSON.parse(reader.result);
        console.log("readJsonObj: ", readJsonObj );

        const addContTextAreaArrByGtab = readJsonObj["musCont"];
        this.setState({
          contTextAreaArr: this.state.contTextAreaArr.concat(addContTextAreaArrByGtab), // 2step: コールバック関数内でテキストエリアにセットする文字列をstateにセット
        }, () => {
          const startTextAreaIndex = this.state.textAreaArr.length;
          const addTextAreaArr = addContTextAreaArrByGtab.map((item,ind) => {
            return this.getTextAreaPerBar(startTextAreaIndex+ind);
          })
          this.setState({
            memo: readJsonObj["memoTxt"],
            textAreaArr: this.state.textAreaArr.concat(addTextAreaArr), // 3step: 更にネストされたコールバック関数内でコンポーネント（テキストエリア）をstateにセット
          }, () => {
          });
        });
      }
    }
  
    render() {
      const ClearBtn = () => {
        const useStyles = makeStyles((theme) => ({
          root: {
            textTransform: 'none',
          },
        }));
      
        const classes = useStyles();
        return (
          <Button variant="contained" color="secondary" onClick={this.clearHandle} className={classes.root}>
            全部削除
          </Button>
        );
      }

      const MusicPlayBtn = () => {
        const useStyles = makeStyles((theme) => ({
          root: {
            display: 'inline',
            '& > *': {
              margin: theme.spacing(0),
            },
            textTransform: 'none',
          },
        }));
      
        const classes = useStyles();
        return (
          <div className={classes.root}>
            <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
              <Button onClick={this.playMusHandle}>
                {this.state.isPlaying ? "停止" : "再生"}
              </Button>
            </ButtonGroup>
          </div>
        );
      }

      const VolSlider = (props) => {
        const useStyles = makeStyles({
          root: {
            width: 100,
          },
        });
        const classes = useStyles();
    
        return (
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider value={props.vol} onChange={props.volHandle} aria-labelledby="continuous-slider" />
              </Grid>
              <Grid item>
                {props.lblName}
              </Grid>
            </Grid>
          </div>
        );
      }

      const PrintBtn = (props) => {
        const useStyles = makeStyles((theme) => ({
          root: {
            textTransform: 'none',
          },
        }));
      
        const classes = useStyles();
        return (
          <Button variant="contained" color="primary" onClick={props.printHandle} className={classes.root}>
            印刷
          </Button>
        );
      }

      const AlertDialog = (props) => {
        return (
          <div>
            <Dialog
              open={this.state.isAlertOpen}
              onClose={this.handleAlertClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"設定が不正です!!!!!"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  コード又はBpmが設定されていません。以下を確認してください。
                  (1)コードボタンを押す又はサンプル曲を選択してください。
                  (2)Bpmが空の場合は、数字を入力してください。例: 75
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleAlertClose} color="primary" autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }

      return (
        <div id="content">
          <section>
            <h2 className="title">■AI 南郷君 コードからメロディ作ります。</h2>
            <ul className="post">
              <img src="/static/hp_nango/images/ai_robot_b.png" width="120" />
              <li>
                コードのボタンを押すと、そのコード&#x1f916;<br/>
                の構成音と長さをランダム表示します。<br/>
                作成中なので時間ある時に改良予定です。<br/>
                ※ コードを設定して再生ボタン押すと音がでます。<br/>
              </li>
              <li style={{ padding: "3px 0px 3px 0px" }}>
                <div style={{ margin: "0px 0px 0px 0px"}}>
                  <div style={{ display: "inline-block", margin: "0px 2px 3px 0px" }}>
                    <TextField required id="outlined-required" label="メモ書けます。" multiline
                      style = {{width: "200px"}} 
                      variant="filled" value={this.state.memo} onChange={this.onMemoChange}
                    />
                  </div>
                  <div style={{ display: "inline-block", margin: "0px 3px 3px 2px" }}>
                    <SelectShowCol showCol={this.state.showCol} selShowColOnChange={(e) => this.selShowColOnChange(e)} />
                  </div>
                  <div style={{ display: "inline-block", margin: "5px 0px 15px 3px" ,padding: "0px", position: "relative", top: "7px" }}>
                    <FileOpBtn handleReadFile={this.handleReadFile} fSaveHandle={this.fSaveHandle} />
                  </div>
                  <div style={{ display: "inline-block", margin: "5px 0px 15px 3px" ,padding: "0px", position: "relative", top: "7px" }}>
                    <ReactToPrint content={() => this.componentRef}>
                      <PrintContextConsumer>
                        {({ handlePrint }) => (
                          <PrintBtn printHandle={handlePrint}/> 
                        )}
                      </PrintContextConsumer>
                    </ReactToPrint>
                  </div>
                </div>
                <div style={{ margin: "0px 0px 5px 0px"}}>
                  <div style={{ display: "inline-block" }}>
                    <SelectCordProgre cordProgressId={this.state.cordProgressId} selectOnChange={(e) => this.selectProgHandle(e)} />
                  </div>
                  <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px" }}>
                    <TextField required id="outlined-required" label="bpm"
                      style = {{width: "100px"}} 
                      variant="filled" value={this.state.bpmNum} onChange={this.onBpmNumChange}
                    />
                  </div>
                  <div style={{ display: "inline-block", margin: "5px 0px 3px 3px" ,padding: "0px", position: "relative", top: "17px" }}>
                    <MusicPlayBtn/>
                  </div>
                  <div style={{ display: "inline-block", margin: "5px 0px 10px 3px" ,padding: "0px" }}>
                    <FormGroup>
                    <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.chordChecked} onChange={this.onChordChkBoxChange}
                          />
                        } label="コード再生"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.meloChecked} onChange={this.onMeloChkBoxChange}
                          />
                        } label="メロディ再生"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div style={{ margin: "10px 3px 3px 2px" }}>
                  <div style={{ display: "inline-block", margin: "0px 3px 3px 0px", padding: "0px", position: "relative", top: "-25px"}}>
                    <SelSampMus gTabId={this.state.gTabId} selSampleHandle={(e) => this.selSampleHandle(e)} />
                  </div>
                  <div style={{ display: "inline-block", margin: "0px 3px 3px 0px", padding: "0px", position: "relative", top: "-25px"}}>
                    <SelInst instVal={this.state.instVal} selInstOnChange={(e) => this.selInstOnChange(e)} />
                  </div>
                  <div style={{ display: "inline-block", margin: "0px 3px 3px 0px", padding: "0px", position: "relative", top: "-25px"}}>
                    <SelCapo capo={this.state.capo} selCapoOnChange={(e) => this.selCapoOnChange(e)} />
                  </div>
                  <div style={{ display: "inline-block", margin: "0px 10px 3px 0px" }}>
                    <VolSlider vol={this.state.chordVol} volHandle={this.chordVolHandle} lblName="コード" />
                    <VolSlider vol={this.state.meloVol} volHandle={this.meloVolHandle} lblName="メロ" />
                  </div>
                </div>
                <div>
                  {this.state.btnArr}
                </div>
              </li>
              <div>
                <div style={{ display: "inline-block" }}>
                  <ClearBtn/>
                </div>
              </div>
              <div style={{ display: "none" }}>
                <AlertDialog/>
              </div>
              <PrintArea textAreaArr={this.state.textAreaArr} memo={this.state.memo} ref={el => (this.componentRef = el)}/>
            </ul>
          </section>

          <section>
            <ul className="post">
              <span style={{ fontSize: "5px" }}>
                  ※作成中のため、一部内容が古い場合がございますが、<br/>
                  ご了承お願い致します&#x1f647;
              </span>
            </ul>
          </section>
        </div>
      );
    };
}

export default MakeMusicMelo;