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
              title="条件の重要度"
            />
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
              @click="userUpdate(getCurrentUser.id)"
            >
              更新
            </v-btn>
          </div>
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
    ...mapGetters('users', ['getCurrentUser'])
  },
  watch: {
    criterionImportance(v) {
      this.doughnutChartData = this.$chart.createDoughnutChartData(v)
    },
    result(v) {
      this.barChartData = this.$chart.createBarChartData(v)
      this.chart = true
    }
  },
  created() {
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
        this.createdAt = res.data.analysis.created_at
        this.criterionImportance = res.data.criterionImportances
        this.result = res.data.alternativeResults
        console.log(res)
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
    ...mapActions('analyses', ['setCriterionImportances']),
    ...mapActions('users', ['updateUser'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
