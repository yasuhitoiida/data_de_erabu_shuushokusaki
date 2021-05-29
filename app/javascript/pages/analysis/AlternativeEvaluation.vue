<template>
  <div class="container">
    <h3>STEP4 条件ごとにどちらの就職先が優れているか比較してください</h3>
    <div class="col-8 offset-2">
      <div
        v-for="(item, index) in combinationArray"
        :key="index"
        class="row"
      >
        <div class="col">
          <span>
            {{ item[0] }}
          </span>
        </div>
        <div class="col">
          <span
            v-for="n in 7"
            :key="n"
            class="input-inline"
          >
          <input
            v-model="inputValues[index]"
            type="radio"
            :value="n"
            >
          </span>
        </div>
        <div class="col">
          <span>
            {{ item[1] }}
          </span>
        </div>
      </div>
      <router-link
        type="button"
        class="btn btn-secondary"
        to="/analysis/step2"
      >
        戻る
      </router-link>
      <button
        type="button"
        class="btn btn-success"
        @click="handleCriteriaPriority"
      >
        決定
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'AlternativeEvaluation',
  data() {
    return {
      combinationArray: [],
      inputValues: [],
      errors: null
    }
  },
  created() {
    const cri = this.getCriteria
    let i, j
    for(i = 1; i < cri.length; i++){
      const arr = cri.slice(i-1)
      for(j = 1; j < arr.length; j++){
        this.combinationArray.push([arr[0], arr[j]])
      }
    }
  },
  computed: {
    ...mapGetters('analysis', ['getCriteria'])
  },
  methods: {
    abs(val) {
      return val < 0 ? -val : val
    },
    handleErrors() {
      this.errors = null
    },
    handleCriteriaPriority() {
      const com = this.combinationArray
      const criArray = this.getCriteria
      const criHash = {}
      let j, k
      for(j = 0; j < criArray.length; j++){
        criHash[criArray[j]] = 1
      }
      for(k = 0; k < com.length; k++){
        const criLeft = com[k][0]
        const criRight = com[k][1]
        const value = this.inputValues[k]
        const abs = this.abs(value - 4)
        const score = 2 * abs + 1
        if (value < 4) {
          criHash[criLeft] *= score
          criHash[criRight] *= 1 / score
        } else {
          criHash[criRight] *= score
          criHash[criLeft] *= 1 / score
        }
      }
      const geomeans = {}
      let geomeanTotal = 0
      for(let key in criHash) {
        geomeans[key] = criHash[key] ** (1 / Object.keys(criHash).length)
        geomeanTotal += geomeans[key]
      }
      const priority = {}
      for(let key in geomeans) {
        priority[key] = geomeans[key] / geomeanTotal
      }
      console.log(priority)
      this.setPriority(priority)
    },
    ...mapActions('analysis', ['setPriority'])
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
.col {
  text-align: center;
}
</style>
