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
              v-model="value"
              tile
              borderless
              color="deep-purple accent-3"
              :name="name"
            >
              <v-btn
                v-for="n in 7"
                :key="n"
                :id="n"
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
  watch: {
    value: 'sendValue'
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
