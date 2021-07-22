<template>
  <div>
    <v-card
      rounded
      elevation="2"
      class="text-center my-8"
    >
      <div>
        <v-row>
          <v-col
            cols="4"
          >
            {{ combination[0] }}
          </v-col>
          <v-col
            cols="4"
            class="ml-auto"
          >
            {{ combination[1] }}
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col class="ml-auto">
            <v-btn-toggle
              :id="listNumber + '-' + itemNumber"
              v-model="value"
              tile
              borderless
              color="deep-purple accent-3"
              @change="autoScroll"
            >
              <v-btn
                v-for="n in 7"
                :key="n"
                :value="n"
                elevation="4"
                class="mr-1"
                :min-width="width"
              >
                {{ n }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EvaluationItem',
  props: {
    combination: {
      type: Array,
      required: true
    },
    listNumber: {
      type: Number,
      required: true
    },
    itemNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      value: null
    }
  },
  computed: {
    width() {
      return this.$vuetify.breakpoint.width <= 450 ? 36 : 48
    },
    ...mapGetters('analyses', ['getImpRawData', 'getEvalRawData'])
  },
  watch: {
    value: 'sendValue'
  },
  created() {
    // 他ページから移動してきたとき入力値が残ってるように
    const m = this.listNumber
    const n = this.itemNumber
    // ストアに保存した評点の配列から、自身と対応する評点を取得する
    if (this.getImpRawData && this.$route.path === '/analysis/step3') {
        this.value = this.getImpRawData[n] //評価基準の重要度の評点配列から評点を取得
    } else if ( this.getEvalRawData && this.$route.path === '/analysis/step4') {
        this.value = this.getEvalRawData[m][n] //選択肢の評価データから該当する評点配列を取得し、その中から評点を取得
    }
  },
  methods: {
    sendValue() {
      this.$emit('catch-value', this.value)
    },
    autoScroll() {
      // ボタンを押したら次のEvaluationItemへと自動スクロール
      const m = this.listNumber
      const n = this.itemNumber
      const cur = event.currentTarget.getBoundingClientRect().top //自身
      const nxtItem = document.getElementById(`${m}-${Number(n)+1}`) //自身の次のItem
      const nxtList = document.getElementById(`${Number(m)+1}-0`) //次のListの最初のItem
      if (nxtItem) { //List内に次のItemがあるとき、次のItemがターゲット
        var nxt = nxtItem.getBoundingClientRect().top
      } else if (nxtList) { //List内の最後のItemであり、かつ次のListがあるとき、次のListの最初のItemがターゲット
        var nxt = nxtList.getBoundingClientRect().top
      } else { //最後のListの最後のItemであるとき、スクロールしない
        var nxt = cur
      }
      window.scrollBy(0, nxt-cur) //ターゲットと自身のy座標の差分だけスクロール
    }
  }
}
</script>

<style scoped>
  /* // @import '~vuetify/src/styles/styles.sass';
  //
  // .custom-class {
  //   padding: $stepper-step-padding;
  // } */
  button {
    color: #6495ed;
    min-width: 60px;
  }
</style>
