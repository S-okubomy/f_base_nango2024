import React from "react";
import { Link } from "react-router-dom";
import MyCard from "./common/MyCard";

class system extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div id="info">
        <MyCard 
          title={<h2>“いらっしゃいませ！” 　ご利用方法</h2>}
          content={
            <ul>
              <li>
                <h3>チャージ</h3>
                  チャージ料金 1500円となっております。<br/>
                  また、アルコール類を500円より提供しております。<br/>
                  演奏代無料で楽器演奏できます。
              </li>
              <li>
                <h3>カウンターセルフ</h3>
                恐れ入りますが、店主手が回らない場合は、<br/>
                配膳・下げ膳ご協力頂けますと大変助かります。
              </li>
              <li>
                <h3>喫煙に関しまして</h3>
                周りの方にご配慮頂き、ご対応お願い致します。
              </li>
            </ul>
          }
          shareUrl="https://nango7.okbmk.com/nango/rt/system_nango_temp"
          msg="フォーク酒場　“南郷７丁目”　ご利用方法"
        />

        <MyCard 
          title={<h2>お願い</h2>}
          content={
            <ul>
              <li>＜＜重要＞＞当店は、きっちとしたお店のルールは定めておりません。<br/>
                  ただ、色々なお客様が、一同に介する”呑み屋”です。<br/>
                  良いときもあれば、そうでないときもあります。<br/>
                  楽しい時間を過ごせるようにスタッフ一同、精一杯対応させて頂きますが、<br/>
                  お客様にもご配慮頂けますと助かります。<br/>
                  その方がもっと楽しく過ごせると思います。<br/>
                  わがままなお店かもしれませんが、よろしくお願い致します。
              </li>
              <li>マイクスタンド調整は丁寧にお願いします。<br/>
                  力任せに動かすと寿命が短くなります。
              </li>
              <li>楽器コード類の抜き差しは、<br/>
                  アンプの電源をOFFにするか音量を0<br/>
                  にしてから行ってください。
              </li>
              <li>当店の楽器や機材には、<br/>
                  常連さんのご好意で使わせて<br/>
                  頂いているものがたくさんあります。<br/>
                  丁寧に扱い、皆で大切に使用しましょう。
              </li>
            </ul>
          }
          shareUrl="https://nango7.okbmk.com/nango/rt/system_nango_temp"
          msg="フォーク酒場　“南郷７丁目”　ご利用方法"
        />
      </div>
    );
  };
}

export default system;