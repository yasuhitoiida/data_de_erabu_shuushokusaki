<template>
  <div class="row">
    <div class="col">
      <span>
        {{ combination[0] }}
      </span>
    </div>
    <div class="col">
      <span
        v-for="n in 7"
        :key="n"
        class="input-inline"
      >
        <input
          @change="sendValue(n)"
          type="radio"
          :name="name"
          :value="n"
        >
      </span>
    </div>
    <div class="col">
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
      type: Number,
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
