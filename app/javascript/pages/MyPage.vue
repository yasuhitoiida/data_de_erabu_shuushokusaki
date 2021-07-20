<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="10"
        class="mx-auto"
      >
        <h3>{{ getLoginUser.name }}</h3>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import DoughnutGraph from '../components/DoughnutGraph.vue'
import BarGraph from '../components/BarGraph.vue'
export default {
  name: 'MyPage',
  components: {
    DoughnutGraph,
    BarGraph
  },
  data() {
    return {
      analyses: null,
      createdAt: null,
      criterionImportance: null,
      result: null,
      doughnutChartData: null,
      barChartData: null,
      chart: null
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
  watch: {
    criterionImportance(v) {
      this.doughnutChartData = this.$chart.createDoughnutChartData(v)
    },
    result(v) {
      this.barChartData = this.$chart.createBarChartData(v)
      this.chart = true
    }
  },
  computed: {
    ...mapGetters('users', ['getLoginUser'])
  },
  methods: {
    dateFormat(t) {
      const month = t.substr(5, 2)
      const date = t.substr(8, 2)
      return Number(month) + '/' + date
    },
    showAnalysis(id) {
      this.chart = false
      this.$axios.get(`analyses/${id}`)
      .then(res => {
        this.createdAt = res.data.analysis.created_at
        this.criterionImportance = res.data.criterion_importances
        this.result = res.data.alternative_results
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    ...mapActions('analyses', ['setCriterionImportances'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
