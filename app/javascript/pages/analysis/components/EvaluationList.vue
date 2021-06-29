<template>
  <div>
    <div
      v-for="(item, index) in combinations"
      :key="index"
    >
      <EvaluationItem
        :combination="item"
        :list-number="listNumber"
        :item-number="index"
        @catch-value="sendData(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import EvaluationItem from './EvaluationItem.vue'
export default {
  name: 'EvaluationList',
  components: {
    EvaluationItem
  },
  props: {
    factors: {
      type: Array,
      required: true
    },
    listNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      combinations: null,
      evalListData: []
    }
  },
  created() {
    // 要素のペアを作成　ペアの数だけEvaluationItemが表示される
    this.combinations = this.$calculator.makePairs(this.factors)
  },
  methods: {
    // すべてのEvaluationItemが入力されたかを検証するメソッド
    isInputDataEnough(arr) {
      const l = arr.filter(v => v).length
      if (l == this.combinations.length) {
        return true
      } else {
        return false
      }
    },
    sendData(ind, val) {
      // EvaluationItemからの評点を配列に格納し、全部揃い次第親クラスに配列を送る
      this.evalListData[ind] = val
      if (this.isInputDataEnough(this.evalListData)) {
        this.$emit('catch-data', this.evalListData)
        console.log(this.evalListData)
      }
    }
  }
}
</script>

<style scoped>
</style>
