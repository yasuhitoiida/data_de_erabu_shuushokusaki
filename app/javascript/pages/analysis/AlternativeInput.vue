<template>
  <div class="container">
    <div class="col-8 offset-2 alternative-forms">
      <h3>STEP1 就職先の選択肢を入力してください</h3>
      <template v-if="errors">
        <li
          class="error-message"
        >
          就職先は2つ以上選択してください
        </li>
      </template>
      <div
        v-for="(item, index) in alternatives"
        :key="index"
      >
        <input
          :id="'alternative' + index"
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
      <TheButtons
        preview-page-path="/"
        @ok-button="handleAlternative"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheButtons from './components/TheButtons.vue'
export default {
  name: 'AlternativeInput',
  components: {
    TheButtons
  },
  data() {
    return {
      alternatives: [null, null, null],
      errors: null
    }
  },
  methods: {
    addForm() {
      this.alternatives.push(null)
    },
    handleAlternative() {
      const array = this.alternatives.filter(v => v)
      if (array.length >= 2 ) {
        this.setAlternatives(array)
        this.$router.push('/analysis/step2')
      } else {
        this.errors = true
      }
    },
    ...mapActions('analysis', ['setAlternatives'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
input {
  margin-bottom: 10px;
}
</style>
