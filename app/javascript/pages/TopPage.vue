<template>
  <v-container>
    <v-col
      cols="12"
      md="10"
      class="mx-auto"
    >
      <h2>JobHunter<span>'</span>s Choice</h2>
      <v-row>
        <v-col align="center">
          <h5>仕事選びのための意思決定ツール</h5>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="8"
          align="center"
          class="graphs"
        >
          <v-card>
            <img src="../../assets/images/toppage_graphs.png" />
          </v-card>
        </v-col>
        <v-col
          align="center"
          cols="12"
          md="4"
        >
          <v-btn
            id="analysis-btn"
            to="/step1"
            color="#6495ed"
            height="70"
            width="260"
            dark
            large
          >
            START
          </v-btn>
          <v-btn
            v-if="isAuthenticated"
            to="/mypage"
            outlined
            color="#6495ed"
            height="70"
            width="260"
            class="mt-3"
            large
          >
            マイページ
          </v-btn>
          <v-btn
            v-if="!isAuthenticated"
            to="/register"
            outlined
            color="#6495ed"
            height="70"
            width="260"
            class="mt-3"
            large
          >
            ユーザー登録
          </v-btn>
          <v-btn
            v-if="!isAuthenticated"
            to="/login"
            outlined
            color="#6495ed"
            height="70"
            width="260"
            class="mt-3"
            large
          >
            ログイン
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="my-7 description">
        <v-col
          cols="12"
          lg="4"
          align="center"
        >
          <v-card
            width="400"
            height="550"
          >
            <img src="../../assets/images/undraw_Travel_mode_re_2lxo.svg">
            <v-divider />
            <v-card-title><h5>就職先選びでお悩みの方へ</h5></v-card-title>
            <v-card-text align="left">
              <div>
                <v-icon>mdi-hexagon-multiple-outline</v-icon>
                <span>
                  内定がいくつか出ている
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
          cols="12"
          lg="4"
          align="center"
        >
          <v-card
            width="400"
            height="550"
          >
            <img src="../../assets/images/undraw_Metrics_re_6g90.svg">
            <v-divider />
            <v-card-title><h5>ベストな選択肢を算出</h5></v-card-title>
            <v-card-text align="left">
              企業活動や公共事業でも用いられる意思決定法「AHP」により、複数の志望先からベストな選択肢を算出。<br>あなたの企業研究の成果を元に、根拠あるデータで意思決定をサポートします。
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          lg="4"
          align="center"
        >
          <v-card
            width="400"
            height="550"
          >
            <img src="../../assets/images/undraw_Projections_re_1mrh.svg">
            <v-divider />
            <v-card-title center>
              <h5>簡単に、スピーディーに</h5>
            </v-card-title>
            <v-card-text align="left">
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
              <AboutAHP />
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
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['users/getLoginUser']
    },
  }
}
</script>

<style scoped>
h2 {
  margin: 40px auto;
  font-size: 70px;
  text-align: center;
}
h2 span {
  color: #6495ed;
}
.graphs img {
  max-width: 100%;
  width /***/:auto;
}
.description img {
  max-width: 100%;
  height: 300px;
  width /***/:auto;
}
#analysis-btn {
  font-size: 28px;
  border-radius: 5px;
}
</style>
