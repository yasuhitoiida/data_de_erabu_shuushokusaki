<template>
  <div>
    <v-card
      rounded
      elevation="2"
      class="text-center my-8"
    >
      <div>
        <v-row>
          <v-col cols="3">
            {{ combination[0] }}
          </v-col>
          <v-col
            cols="3"
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
              v-model="value"
              tile
              borderless
              color="deep-purple accent-3"
              :name="name"
            >
              <v-btn
                v-for="n in 7"
                :id="n"
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
    name: {
      type: String,
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
    const m = this.name.substr(0, this.name.indexOf('-'))
    const n = this.name.substring(this.name.indexOf('-')+1, this.name.length)
    if (this.getImpRawData && this.$route.path === '/analysis/step3') {
        this.value = this.getImpRawData[n]
    } else if ( this.getEvalRawData && this.$route.path === '/analysis/step4') {
        this.value = this.getEvalRawData[m][n]
    }
  },
  methods: {
    sendValue() {
      this.$emit('catch-value', this.value)
    }
  }
}
</script>

<style scoped>
</style>
