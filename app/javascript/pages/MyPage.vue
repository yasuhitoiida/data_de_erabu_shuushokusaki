<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        lg="10"
        class="mx-auto"
      >
        <h3>マイページ</h3>
        <v-row
          v-if="chart"
        >
          <v-col
            cols="12"
            md="8"
            class="mx-auto my-auto"
            v-if="chart"
          >
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
        <v-card>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, index) in analyses"
                :key="index"
              >
                <v-list-item-content @click="showAnalysis(item.id)">
                  <v-list-item-title>{{ timeFormat(item.created_at) }}</v-list-item-title>
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
      criImp: null,
      result: null,
      chart: false
    }
  },
  created() {
    this.$axios.get('../../api/analyses')
    .then(res => {
      this.analyses = res.data
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },
  computed: {
    doughnutChartData() {
      return this.$chart.createDoughnutChartData(this.criImp)
    },
    barChartData() {
      return this.$chart.createBarChartData(this.result)
    }
  },
  methods: {
    timeFormat(t) {
      const month = t.substr(5, 2)
      const date = t.substr(8, 2)
      return Number(month) + '/' + date
    },
    showAnalysis(id) {
      this.chart = false
      this.$axios.get(`../../api/analyses/${id}`)
      .then(res => {
        this.criImp = res.data.criterion_importances
        this.result = res.data.alternative_results
        this.chart = true
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
