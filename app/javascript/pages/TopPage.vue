<template>
  <v-container>
    <v-col
      cols="12"
      md="10"
      class="mx-auto"
    >
      <h1>JobHunter<span>'</span>s Choice</h1>
      <div class="headings">
        <h5>お仕事選びをデータで後押し</h5>
      </div>
      <div style="text-align:center;">
        <v-btn
          id="analysis-btn"
          to="/analysis/step1"
          color="#6495ed"
          height="70"
          width="260"
          dark
          large
        >
          Start
        </v-btn>
      </div>
      <div class="contents">
        <v-row>
          <v-col
            cols="8"
            lg="4"
            class="mx-auto"
          >
            <v-card
              width="400"
              height="550"
            >
              <img src="../../assets/images/undraw_Travel_mode_re_2lxo.svg">
              <v-divider />
              <v-card-title>こんなあなたに</v-card-title>
              <v-card-text>
                <div>
                  <v-icon>mdi-hexagon-multiple-outline</v-icon>
                  <span>
                    複数の求人で迷っている
                  </span>
                </div>
                <p />
                <div>
                  <v-icon>mdi-file-document-multiple-outline</v-icon>
                  <span>
                    エントリー先の優先順位を決めたい
                  </span>
                </div>
                <p />
                <div>
                  <v-icon>mdi-bug</v-icon>
                  <span>
                    将来への迷いを断ち切りたい
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="8"
            lg="4"
            class="mx-auto"
          >
            <v-card
              width="400"
              height="550"
            >
              <img src="../../assets/images/undraw_Metrics_re_6g90.svg">
              <v-divider />
              <v-card-title>あなたの志望度を数値化</v-card-title>
              <v-card-text>
                企業活動や公共事業でも用いられる意思決定法「AHP」により、志望先ごとに志望度を数値化。<br>あなたの企業研究を元にした根拠あるデータで意思決定をサポートします。
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="8"
            lg="4"
            class="mx-auto"
          >
            <v-card
              width="400"
              height="550"
            >
              <img src="../../assets/images/undraw_Projections_re_1mrh.svg">
              <v-divider />
              <v-card-title center>
                簡単に、スピーディーに
              </v-card-title>
              <v-card-text>
                分析にかかわる煩雑なデータ処理はすべてアプリにおまかせ。最小限の作業で分析結果が取得できます。
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-col
        cols="12"
        md="10"
        class="mx-auto"
      >
        <v-expansion-panels>
          <v-expansion-panel depressed>
            <v-expansion-panel-header>
              AHP（階層分析法）とは？
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <b>AHPとは</b>
              <p>
                AHP（階層分析法）は複雑な状況での意思決定を行うための構造化法の1つである。AHPは個人的な決定問題で大いに役立つが、複雑な決定問題に取り組む集団意思決定場面で大きな効果を発揮する。例えば利害関係がある場合、人間の認知や判断に頼らざるを得ない場合、さらにはその結果が長期にわたり影響を与える場合に大きな成果をあげている。
              </p>
              <b>AHPの活用場面</b>
              <ul>
                <li>
                  選択 － 複数の代替案の中から1つの代替案を選択する。
                </li>
                <li>
                  順位付け － 代替案を最も望ましくないものから順に並べる。
                </li>
                <li>
                  優先順位付け－ 各代替案に対し、代替案間での相対的な重要度を決定する。
                </li>
                <li>
                  資源配分 － 代替案間で資源を配分する。
                </li>
                <li>
                  ベンチマーク － 他の組織の優れたやり方を、自分の組織のやり方と比較する。
                </li>
                <li>
                  品質マネジメント－ 多次元からみた品質のあり方や品質改善を扱う。
                </li>
              </ul>
              <b>AHPの活用例</b>
              <ul>
                <li>
                  世界的な気候変動の影響を減らす最良の方法は何か（Fondazione Eni Enrico Mattei）
                </li>
                <li>
                  ソフトウェアシステムの総合品質の数量化（マイクロソフト株式会社）
                </li>
                <li>
                  大学教授の選抜（Bloomsburg University of Pennsylvania）
                </li>
                <li>
                  海外製造工場の建設場所の選定（ケンブリッジ大学）
                </li>
                <li>
                  全国を横断する石油パイプライン運用のリスク査定（アメリカ土木学会）
                </li>
                <li>
                  アメリカ合衆国の分水点に関する最良なマネジメント法の策定（アメリカ農務省）
                </li>
              </ul>
              <b>AHPの手順</b>
              <ol>
                <li>
                  目標達成のためのいくつかの代替案と、それら代替案を評価するためのいくつかの評価基準を設定する
                </li>
                <li>
                  複数ある評価基準の間での重要度を決定する
                </li>
                <li>
                  代替案がそれぞれの評価基準についてどれだけの評価を持つかを表した相対評点を求める
                </li>
                <li>
                  優先度と相対評点を用いて各代替案の総合評点を求め、最も評点の高い代替案を選択する
                </li>
              </ol>
              <img src="../../assets/images/1247472500567252cb2c0370609f634c.png" style="height:auto;"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
h1 {
  margin: 50px auto;
  font-size: 70px;
  text-align: center;
}
h1 span {
  color: #6495ed;
}
img {
  max-width: 100%;
  height: 300px;
  width /***/:auto;
}
.headings {
  text-align: center;
  margin: 60px auto;
}
.contents {
  margin: 30px auto;
}
#analysis-btn {
  font-size: 28px;
  border-radius: 5px;
}
</style>
