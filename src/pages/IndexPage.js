/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var CandidateStore = require("../stores/CandidateStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");

module.exports = React.createClass({
  displayName: "IndexPage",

  getInitialState () {
    return {
      candidates: CandidateStore.getAll()
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {candidates} = state;
    var result = candidates.map((c) => {
      return <Link key={c.id} to="policies" params={{candidateId: c.id}}>
        <div className='index_c_item md-whiteframe-z1'>
            <img src={c.avatar} />
            <div className="index_c_item_name">{c.name}</div>
        </div>
      </Link>;
    });
    return <div id="content">
    <div className="page_wrapper index_section">
    <div className="wrapper">
            <div className="index_content md-whiteframe-z1">
            <div className="index_subsection">
                <div className="index_maintitle">
                   <h1>市長給問嗎！最後一役 政策問答大亂鬥</h1>
                   <h3>[蘋果 x 沃草 x Google] 共同主辦</h3>
                </div>
                <p>選戰進入倒數，問題還沒問完嗎？看了政見有滿腹疑問，想要進一步追問或釐清？覺得政策不可行，想要挑戰候選人？</p>
                <p>「市長給問嗎！最後一役」，邀請你把所有還來不及說出口的疑問和質疑一次提出！</p>
            </div>
            <div className="index_subsection">
                <div className="index_title">活動說明</div>
                <p>即日起，於網站上提問、連署，候選人將依連署票數高低回答市民提問。</p>
                <p>提問日期：
                    <ul>
                    <li>馮光遠：即日起～ 11/18 17:00</li>
                    <li>連勝文：即日起～ （邀約中，時間確定中）</li>
                    <li>柯文哲：即日起～ （邀約中，時間未定）</li>
                    </ul>
                </p>
                <p>直播日期：
                    <ul>
                    <li>馮光遠：11/18 21:00</li>
                    <li>連勝文：（邀約中，時間確定中）</li>
                    <li>柯文哲：（邀約中，時間未定）</li>
                    </ul>
                </p>
                <p><div>直播頻道：</div><a className="live-link" href="http://live.appledaily.com.tw/livechannel/subject/108" target="_blank">http://live.appledaily.com.tw/livechannel/subject/108</a>
                </p>
            </div>
            <div className="index_subsection">
                <div className="index_title">提問規範</div>
                <ol>
                    <li><b>本次提問僅針對政策，請勿詢問與政策無關之提問</b></li>
                    <li>請勿發表廣告、商業宣傳或競選文案</li>
                    <li>請勿留下任何自己或他人之電話、聯絡方式等私人資訊</li>
                    <li>請勿發表涉及人身攻擊、謾罵、惡意攻訐與恐嚇等之言論</li>
                    <li>請勿進行洗版與重複發問</li>
                    <li>請勿使用有關性別、民族、族群或國籍等歧視性用語</li>
                </ol>
                <p>註：若候選人團隊認為提問不符上述規範，可拒絕回答該題。</p>
            </div>
            <div className="index_subsection">
                <div className="index_title">考前惡補</div>
                <p>一個好的提問至關重要！沒有頭緒？請看我們為你準備的<Link to="qa">發問指南</Link>。</p>
            </div>
        </div>
        <div className="l_center"><h2>開始發問</h2></div>
        <div className="l_center">
                {result}
        </div>

    </div>
    </div>

</div>
  }
});
