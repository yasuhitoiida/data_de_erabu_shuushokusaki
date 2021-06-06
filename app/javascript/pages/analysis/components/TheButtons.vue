<template>
  <div class="buttons">
    <v-btn
      :to="previewPagePath"
    >
      戻る
    </v-btn>
    <v-btn
      dark
      elevation="4"
      color="#6495ed"
      @click="ok"
    >
      決定
    </v-btn>
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
