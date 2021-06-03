<template>
  <div class="buttons">
    <router-link
      type="button"
      class="btn btn-outline-secondary"
      :to="previewPagePath"
    >
      戻る
    </router-link>
    <button
      type="button"
      class="btn btn-info"
      @click="ok"
    >
      決定
    </button>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: {
    previewPagePath: {
      type: String,
      required: true
    }
  },
  methods: {
    ok() {
      this.$emit('ok-button')
    }
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 10px;
}
</style>
