<template>
  <v-container>
    <v-col
      cols="12"
      md="10"
      class="mx-auto"
    >
      <h1>JobHunter<span>'</span>s Choice</h1>
      <v-row>
        <v-col align="center" class="mt-10">
          <h5>お仕事選びをデータで後押し</h5>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
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
        </v-col>
      </v-row>
      <v-row class="my-7">
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
            <v-card-title>ベストな選択肢を提案</v-card-title>
            <v-card-text>
              企業活動や公共事業でも用いられる意思決定法「AHP」により、複数の志望先からベストな選択肢を提案。<br>あなたの企業研究の成果を元に、根拠あるデータで意思決定をサポートします。
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
              <AboutAHP></AboutAHP>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-col>
  </v-container>
</template>

<script>
import AboutAHP from '../components/AboutAHP.vue'
export default {
  name: 'Home',
  components: {
    AboutAHP,
  }
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
#analysis-btn {
  font-size: 28px;
  border-radius: 5px;
}
</style>
