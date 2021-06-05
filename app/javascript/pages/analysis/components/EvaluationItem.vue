<template>
  <div class="row">
    <div class="col-2">
      <span>
        {{ combination[0] }}
      </span>
    </div>
      <div class="col-8">
        <b-form-radio-group
          :name="name"
        >
          <b-form-radio
            v-for="n in 7"
            :key="n"
            :value="n"
            @change="sendValue(n)"
          />
      </b-form-radio-group>
      <!-- <span
        :class="name"
      > -->
        <!-- <input
          v-for="n in 7"
          :id="n-1"
          :key="n"
          type="radio"
          :name="name"
          :value="n"
          @change="sendValue(n)"
        > -->
      </span>
    </div>
    <div class="col-2">
      <span>
        {{ combination[1] }}
      </span>
    </div>
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
  methods: {
    sendValue(val) {
      this.$emit('catch-value', val)
    }
  }
}
</script>

<style scoped>
</style>
