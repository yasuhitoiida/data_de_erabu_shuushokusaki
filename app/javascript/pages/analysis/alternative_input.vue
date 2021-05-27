<template>
  <div class="container">
    <h3>STEP1 就職先の選択肢を入力してください</h3>
    <div class="col-8 offset-2">
      <div
        v-for="(item, index) in alternatives"
        :key="index"
      >
        <input
          v-model="alternatives[index]"
          class="form-control"
        >
      </div>
      <button
        type="button"
        class="btn btn-success"
        @click="addForm"
      >
        追加
      </button>
      <button
        type="button"
        class="btn btn-success"
        @click="handleAlternative"
      >
        決定
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      alternatives: [null, null, null],
      errors: null
    }
  },
  methods: {
    handleErrors() {
      this.errors = null
    },
    addForm() {
      this.alternatives.push(null)
    },
    handleAlternative() {
      const array = this.alternatives.filter(v => v)
      this.setAlternatives(array)
      this.$router.push('/analysis/step2')
    },
    ...mapActions('analysis', ['setAlternatives'])
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>
