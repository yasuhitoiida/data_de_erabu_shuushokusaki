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
    ...mapGetters('analysis', ['getImpRawData', 'getEvalRawData'])
  },
  watch: {
    value: 'sendValue'
  },
  created() {
    const m = this.listNumber
    const n = this.itemNumber
    if (this.getImpRawData && this.$route.path === '/analysis/step3') {
        this.value = this.getImpRawData[n]
    } else if ( this.getEvalRawData && this.$route.path === '/analysis/step4') {
        this.value = this.getEvalRawData[m][n]
    }
  },
  methods: {
    sendValue() {
      this.$emit('catch-value', this.value)
    },
    autoScroll() {
      const m = this.listNumber
      const n = this.itemNumber
      const cur = event.currentTarget.getBoundingClientRect().top
      const nxtItem = document.getElementById(`${m}-${Number(n)+1}`)
      const nxtList = document.getElementById(`${Number(m)+1}-0`)
      if (nxtItem) {
        var nxt = nxtItem.getBoundingClientRect().top
      } else if (nxtList) {
        var nxt = nxtList.getBoundingClientRect().top
      } else {
        var nxt = cur
      }
      window.scrollBy(0, nxt-cur)
    }
  }
}
</script>

<style scoped>
</style>
