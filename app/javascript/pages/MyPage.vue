<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="10"
        class="mx-auto"
      >
        <h3>{{ userParams.name }}</h3>
        <v-row v-if="chart">
          <v-col
            cols="12"
            md="8"
            class="mx-auto my-auto"
          >
            <h4>{{ dateFormat(createdAt) }}の分析結果</h4>
            <BarGraph
              :chart-data="barChartData"
              title="総合評点"
            />
          </v-col>
          <v-col
            cols="8"
            md="4"
            class="mx-auto my-auto"
          >
            <DoughnutGraph
              :chart-data="doughnutChartData"
              title="重視する条件"
            />
          </v-col>
        </v-row>
        <v-row v-if="chart">
          <v-col
            align="center"
            class="mb-7"
          >
            <v-btn
              icon
              :href="twitterLink"
            ><v-icon>mdi-twitter</v-icon></v-btn>
            <v-btn
              icon
              @click="analysisDestroy(analysisId)"
            ><v-icon>mdi-trash-can</v-icon></v-btn>
          </v-col>
        </v-row>
        <h4>分析履歴</h4>
        <v-card>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, index) in analyses"
                :key="index"
              >
                <v-list-item-content @click="showAnalysis(item.id)">
                  <v-list-item-title>{{ dateFormat(item.created_at) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-col
          cols="10"
          md="6"
          class="p-0"
        >
          <h3>登録情報</h3>
          <div id="update-form">
            <label for="name-form">ユーザー名</label>
            <input
              id="name-form"
              :value="userParams.name"
              type="name"
              class="form-control mb-4"
              @input="userParams.name=$event.target.value"
            >
            <label for="email-form">メールアドレス</label>
            <input
              id="email-form"
              :value="userParams.email"
              type="email"
              class="form-control mb-4"
              @input="userParams.email=$event.target.value"
            >
            <template v-if="errors">
              <ErrorMessage
                :messages="errors"
              />
            </template>
            <v-btn
              dark
              color="#6495ed"
              @click="userUpdate(currentUserId)"
            >
              更新
            </v-btn>
          </div>
          <v-btn
            @click="userDestroy(currentUserId)"
            color="red lighten-2"
            outlined
            class="mt-12"
          >退会</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import DoughnutGraph from '../components/DoughnutGraph.vue'
import BarGraph from '../components/BarGraph.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
export default {
  name: 'MyPage',
  components: {
    DoughnutGraph,
    BarGraph,
    ErrorMessage
  },
  data() {
    return {
      analyses: null,
      createdAt: null,
      criterionImportance: null,
      result: null,
      doughnutChartData: null,
      barChartData: null,
      chart: null,
      errors: null,
    }
  },
  computed: {
    userParams() {
      return {
        name: this.getCurrentUser.name,
        email: this.getCurrentUser.email
      }
    },
    currentUserId() {
      return this.getCurrentUser.id
    },
    twitterLink() {
      const endpoint = 'https://twitter.com/intent/tweet'
      const cri = this.criterionImportance.reduce((str,i) => str + `${i.name}:${(i.weight*100).toFixed(1)+'％'}%0a`, '')
      const res = this.result.reduce((str,i) => str + `${i.name}:${i.total}%0a`, '')
      const text = 'ジョブハンターズチョイスはこんなデータで仕事選びをサポート！%0a' + '%0aマッチ度%0a' + res + '%0a重視する基準%0a' + cri
      return endpoint + `?text=${text}` + '&hashtags=就活用意思決定ツール%0a,ジョブハンターズチョイス%0a' + '&url=https://jobhunters-choice.com%0a'
    },
    ...mapGetters('users', ['getCurrentUser'])
  },
  watch: {
    // エラー防止の為、値がセットされてからグラフ作成用のメソッドを発火させる
    criterionImportance(v) {
      this.doughnutChartData = this.$chart.createDoughnutChartData(v)
    },
    result(v) {
      this.barChartData = this.$chart.createBarChartData(v)
      this.chart = true
    }
  },
  created() {
    // 分析履歴を取得したあとに最新の分析結果を取得
    this.$axios.get('analyses')
    .then(res => {
      this.analyses = res.data
      this.showAnalysis(res.data[0].id)
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },
  methods: {
    dateFormat(t) {
      const month = t.substr(5, 2)
      const date = t.substr(8, 2)
      return Number(month) + '/' + Number(date)
    },
    showAnalysis(id) {
      this.chart = false
      this.$axios.get(`analyses/${id}`)
      .then(res => {
        this.analysisId = res.data.analysis.id
        this.createdAt = res.data.analysis.created_at
        this.criterionImportance = res.data.criterionImportances
        this.result = res.data.alternativeResults
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    analysisDestroy(id) {
      this.$axios.delete(`analyses/${id}`)
      .then(res => {
        location.href = '/mypage'
      })
      .catch(err => {
        console.log(err)
      })
    },
    async userUpdate(id) {
      try {
        await this.updateUser({ id: id, user: this.userParams })
        location.href = '/mypage'
      } catch(err) {
        console.log(err)
        this.errors = err.response.data
      }
    },
    userDestroy(id) {
      if (window.confirm('退会してもよろしいですか？')) {
        this.$axios.delete(`users/${id}`)
        .then(res => {
          this.logoutUser()
          location.href = '/'
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    ...mapActions('analyses', ['setCriterionImportances']),
    ...mapActions('users', ['updateUser', 'logoutUser'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
