import React, { useRef, useState }  from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { melo, cordProgreList, sampMusList, } from './musConst';
import { Chord, Note } from "@tonaljs/tonal";
import ButtonGroup from '@material-ui/core/ButtonGroup';

const meloNumPerBar = 4; // メロディーの個数 4拍子で固定
const expanSign = "~";  // 小節内の伸ばす記号
const basePitch = 4; // tonejsに渡すbaseの高さ 例: 4→C4, 7→C7
const dlFileName = "makeMelo.json"; // ダウンロードファイルのファイル名

export { meloNumPerBar, expanSign, dlFileName }

const chordCnstNum = Object.keys(melo["C"]);
const cnstLen = chordCnstNum.length;

const getMeloPerOne = (code, num) => melo[code][num];

const getRndCnstNum = () => {
  const ind = Math.floor(Math.random() * (cnstLen-1)); // ※7度は省く
  return chordCnstNum[ind];
}

const getMeloPerBar = (code, lenPerBar) => {
  const item = {
    key: "",
    melos: [],
  };
  let meloStr = getStartBeat(code); // 1拍子目
  for (let i=1; i<lenPerBar; i++) { // 2拍子目以降
    meloStr = meloStr + getMeloPerOneBeat(code);
  }
  item["key"] = code;
  item["melos"] = meloStr;
  return item;
}

const getStartBeat = (code) => {
  const startNote = getMeloPerOne(code, getRndCnstNum()); // 1の時は階名、2の時は"~" でスタート
  const secondNote = Math.floor(Math.random() * 2) === 1 ? getMeloPerOne(code, getRndCnstNum()) : expanSign; // 1の時は階名、2の時は"~" でスタート
  return startNote + secondNote;
}

const getMeloPerOneBeat = (code) => {
  const startNote = Math.floor(Math.random() * 2) === 1 ? getMeloPerOne(code, getRndCnstNum()) : expanSign; // 1の時は階名、2の時は"~" でスタート
  if (startNote !== expanSign) { // "ド~"又は"ドミ"等
    const secondNote = Math.floor(Math.random() * 2) === 1 ? getMeloPerOne(code, getRndCnstNum()) : expanSign; // 1の時は階名、2の時は"~" でスタート
    return startNote + secondNote;
  } else { // "~~"だけ！！！！！
    return expanSign.repeat(2);
  }
}

const getMeloByCordProgres = (cordProgItem) => {
  const melos = cordProgItem["cordP"].map(codeKey => {
    const meloPerBar = getMeloPerBar(codeKey, meloNumPerBar);
    return codeKey + expanSign.repeat(7) + "\n" + meloPerBar["melos"]; // expanSign（"~"）を7個つける
  })
  return melos;
}

const getCodeForToneJs = (codeKey) => {
  const chordToneArr = Chord.get(`${codeKey}`).notes.map(note => `${note}${basePitch}`);
  return chordToneArr;
}

// capoで音程をずらす
const cnvToneNoteByCapo = (notes, capo = 0) => {
  if (Array.isArray(notes)) {
    return notes.map(note => Note.fromMidi(Note.midi(note) + Number(capo)))
  } else {
    return Note.fromMidi(Note.midi(notes) + Number(capo))
  }
}

/**
 * 楽譜からobject（chordとbeat長）リストを返却します。
 *
 * @param {*} trgStr 例: "Cm~  A♭~ Gm~E# Am"
 * @return {*} 例: [{"Cm": "4n"}, {"A♭": "4n"}, {"Gm": "4n"}, {"E#": "8n"}, {"Am": "8n"}]
 */
const getBeatForTone = (trgStr) => {
  const minorSign = "m";
  const sharpSign = "[#♭b]";
  const chordSigns = "([A-Za-zドレミソラシ]|(ファ))";
  const tensionSigh = "[4-9]";
  const regSplitPerChord = new RegExp(`(${chordSigns}${sharpSign}?${minorSign}?${tensionSigh}?)${expanSign}+|(${chordSigns}${sharpSign}?${minorSign}?${tensionSigh}?)`, 'g');
  const splitPerChordArr = trgStr.match(regSplitPerChord);

  const regExpanSign = new RegExp(expanSign, 'g');
  const codeObj = splitPerChordArr.map(chStr => {
    const m = chStr.match(regExpanSign);
    const beatLen = String(roundNum(8/(m ? m.length+1 : 1), 5)) + "n";
    const codeKey = chStr.replace(regExpanSign,"");
    return { [codeKey]: beatLen };
  });

  return codeObj;
}

/**
 * Tone.js用の次のtimeを生成する
 *
 * @param {*} befTimeStr 例: "3:2.8:0"
 * @param {*} beatStr 例: "2n"
 * @return {*} nextTime 例: "4:0.8:0"
 */
const getNextTimeForTone = (befTimeStr, beatStr) => {
  const [barTime, beatTime, hfBeatTime] = befTimeStr.split(/:/).map(time => Number(time.trim()));
  const dt = roundNum(4/Number(beatStr.replace(/[\sn]/g, '')), 2);  
  const decNextTime = Number(beatTime + dt);
  const dtBarTime = Math.floor(decNextTime / meloNumPerBar); // 小節
  const dtBeatTime = roundNum(decNextTime % meloNumPerBar, 2); // 拍子
  const nextBarTime = barTime + dtBarTime;
  const nextBeatTime = dtBeatTime;

  return `${nextBarTime}:${nextBeatTime}:0`;
}

const getChordObjListForTone = (barStrArr, funcCodeForTone, vol, capo) => {
  const chordObjListForTone = [];
  let timeStr = '0:0:0';
  const volForTone = vol/100;
  for (const barStr of barStrArr) {
    getBeatForTone(barStr).map(itemObj => {
      Object.keys(itemObj).map(codeKey => {
        const chordArrOrSingle = cnvToneNoteByCapo(funcCodeForTone(codeKey), capo);
        if (chordArrOrSingle) {
          // 休符("x")は、tone.js再生リストに追加しない
          const chordObj = {'time': timeStr, 'note': chordArrOrSingle, 'duration': itemObj[codeKey],'velocity': volForTone};
          chordObjListForTone.push(chordObj);
        }
        timeStr = getNextTimeForTone(timeStr, itemObj[codeKey]);
      })
    });
  }
  return chordObjListForTone;
}

const roundNum = (value, digit) => {
  const roundNum = 10**digit;
  return Math.round(value * roundNum) / roundNum;
}

const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup'

export { getMeloPerOne, getRndCnstNum, getMeloPerBar, getMeloByCordProgres, getCodeForToneJs, getBeatForTone, getNextTimeForTone
       , getChordObjListForTone, getMeloPerOneBeat, cnvToneNoteByCapo, eventName
};

// 以下はコンポーネント------------------------------------------------------------------------------------------------------------

function ButtonPerChord(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      textTransform: 'none',
    },
  }));
  const classes = useStyles();

  return (
    <Button variant="contained" color="primary" onClick={props.addTextArea} className={classes.root}>
      {props.codeKey}
    </Button>
  );
}

function SelectCordProgre(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">コード進行</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={props.cordProgressId}
        onChange={props.selectOnChange}
      >
        {
          cordProgreList.map((item) => {
            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>;
          })
        }
      </Select>
    </FormControl>
  );
}

function SelSampMus(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">サンプル曲</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={props.gTabId}
        onChange={props.selSampleHandle}
      >
        {
          sampMusList.map((item) => {
            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>;
          })
        }
      </Select>
    </FormControl>
  );
}

function SelectShowCol(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 70,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">表示列数</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={props.showCol}
        onChange={props.selShowColOnChange}
      >
        {
          [1,2,3,4,6].map((colNum) => {
            return <MenuItem key={colNum} value={colNum}>{String(colNum) + "列"}</MenuItem>;
          })
        }
      </Select>
    </FormControl>
  );
}

function SelInst(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 100,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">楽器</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={props.instVal}
        onChange={props.selInstOnChange}
      >
        <MenuItem value="Piano">ピアノ</MenuItem>
        <MenuItem value="Guitar">ギター</MenuItem>
        <MenuItem value="Strings">Strings</MenuItem>
      </Select>
    </FormControl>
  );
}

function SelCapo(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 80,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));
  const classes = useStyles();

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">カポ</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={props.capo}
        onChange={props.selCapoOnChange}
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
      </Select>
    </FormControl>
  );
}

function FileOpBtn(props) {
  const fileInput = useRef();
  const fOpenHandle = (e) => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
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
        <Button onClick={fOpenHandle}>
          開く
        </Button>
        <Button id="dlMusicfile" href="#" download={dlFileName} onClick={props.fSaveHandle}>
          保存
        </Button>
      </ButtonGroup>
      <form style={{ display: 'none' }}>
        <input
          type="file"
          accept=".json"
          ref={fileInput}
          onChange={(e) => {
            e.preventDefault()
            props.handleReadFile(e.currentTarget.files[0])
          }}
        />
      </form>
    </div>
  );
}

class PrintArea extends React.Component {
  render() {
    return (
      <Container>
        <div>
          {this.props.memo}
        </div>
        <Row>
          {this.props.textAreaArr}
        </Row>
      </Container>
    );
  }
}

export { ButtonPerChord, SelectCordProgre, SelSampMus, SelectShowCol, SelInst
  , SelCapo, FileOpBtn, PrintArea
};