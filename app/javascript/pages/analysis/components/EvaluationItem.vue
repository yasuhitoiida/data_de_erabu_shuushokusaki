<template>
  <div>
    <v-card
      rounded
      elevation="2"
      class="text-center"
      style="margin: 30px auto;"
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
              tile
              borderless
              color="deep-purple accent-3"
              :name="name"
            >
              <v-btn
                v-for="n in 7"
                :key="n"
                :id="n"
                elevation="4"
                class="mr-1"
                @click="sendValue(n)"
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
  // data() {
  //   return {
  //     btnLabel: [
  //       '≫',
  //       '>',
  //       '≥',
  //       '=',
  //       '≤',
  //       '<',
  //       '≪'
  //     ]
  //   }
  // },
  methods: {
    sendValue(val) {
      this.$emit('catch-value', val)
    }
  }
}
</script>

<style scoped>
</style>
