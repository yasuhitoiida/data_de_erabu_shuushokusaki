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
      <div>
        <router-link
          to="#"
          @click.native="addForm"
        >
          記入欄を追加
        </router-link>
      </div>
      <router-link
        type="button"
        class="btn btn-secondary"
        to="/"
      >
        戻る
      </router-link>
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
  name: 'AlternativeInput',
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
