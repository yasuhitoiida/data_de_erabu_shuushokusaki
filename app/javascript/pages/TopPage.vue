<template>
  <v-container>
    <v-col
      align="center"
    >
      <v-row>
        <v-col
          align="center"
          class="mt-10"
        >
          <h5>就活用意思決定ツール</h5>
          <h2>JobHunter<span>'</span>s Choice</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          md="10"
          sm="7"
        >
          <v-card elevation="4">
            <v-row
              class="my-7"
              justify="center"
              align="center"
            >
              <v-col
                cols="12"
                md="5"
                class="py-0 description"
              >
                <v-carousel
                  interval="10000"
                  height="450"
                  hide-delimiters
                  show-arrows-on-hover
                  cycle
                >
                  <v-carousel-item>
                    <v-card
                      width="400"
                      height="450"
                      color="#6495ed"
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
                  </v-carousel-item>
                  <v-carousel-item>
                    <v-card
                      width="400"
                      height="450"
                      color="orange"
                    >
                      <img src="../../assets/images/undraw_Metrics_re_6g90.svg">
                      <v-divider />
                      <v-card-title><h5>ベストな選択肢を算出</h5></v-card-title>
                      <v-card-text align="left">
                        企業活動や公共事業でも用いられる意思決定法「AHP」により、複数の志望先からベストな選択肢を算出。<br>あなたの企業研究の成果を元に、根拠あるデータで意思決定をサポートします。
                      </v-card-text>
                    </v-card>
                  </v-carousel-item>
                  <v-carousel-item>
                    <v-card
                      width="400"
                      height="450"
                      color="pink lighten-2"
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
                  </v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col
                cols="12"
                md="7"
                class="py-0 image"
              >
                <v-col
                  cols="12"
                  md="9"
                >
                  <BarGraph
                    :chart-data="demo"
                    title="分析結果の例"
                  />
                  このように複数の選択肢を順位付けします！
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          align="center"
          cols="12"
          sm="8"
        >
          <v-btn
            id="analysis-btn"
            to="/step1"
            onclick="gtag('event', 'click', {'event_category': 'link','event_label': '/step1','value': '1'});"
            color="#6495ed"
            height="70"
            width="100%"
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
            width="100%"
            class="mt-3 mb-6"
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
            width="100%"
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
            width="100%"
            class="mt-3 mb-6"
            large
          >
            ログイン
          </v-btn>
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
import BarGraph from '../components/BarGraph.vue'
export default {
  name: 'Home',
  components: {
    AboutAHP,
    BarGraph
  },
  data() {
    return {
      resultExampleModal: false,
      demo: {
        labels: ['会社A','会社B','会社C','会社D'],
        datasets: [
          { label:'労働時間', data:[0.17,0.23,0.09,0.31], backgroundColor:'#4169e1'},
          { label:'通勤時間', data:[0.13,0.19,0.21,0.28], backgroundColor:'#ffa500'},
          { label:'雇用の安定', data:[0.17,0.23,0.12,0.31], backgroundColor:'#ff69b4'},
          { label:'収入', data:[0.13,0.23,0.09,0.31], backgroundColor:'#708090'}
        ]
      }
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['users/getCurrentUser']
    },
    modalWidth() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs': return '100%'
        case 'sm': return '80%'
        case 'md': return '60%'
        default: return '40%'
      }
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 60px;
}
h2 span {
  color: #6495ed;
}
.v-divider {
  margin-bottom: 0;
}
.v-card__title {
  background-color: rgba(255,255,255, 0.5);
}
.v-card__text {
  height: 170px;
  background-color: rgba(255,255,255, 0.5);
}
.description img {
  padding-top: 16px;
  max-width: 80%;
  height: 200px;
  width /***/:auto;
}
.image img {
  max-width: 100%;
  max-height: 100%;
}
#analysis-btn {
  font-size: 28px;
  border-radius: 5px;
}
</style>
