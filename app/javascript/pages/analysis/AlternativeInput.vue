<template>
  <div class="container">
    <div class="col-8 offset-2 alternative-forms">
      <h3>STEP1 就職先の選択肢を入力してください</h3>
      <div
        v-for="(item, index) in alternatives"
        :key="index"
      >
        <input
          :id="'alternative' + index"
          v-model="alternatives[index]"
          class="form-control mb-3"
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
      <template v-if="errors">
        <ErrorMessage
          :messages="errors"
        />
      </template>
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
import ErrorMessage from '../../components/ErrorMessage.vue'
export default {
  name: 'AlternativeInput',
  components: {
    TheButtons,
    ErrorMessage
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
        this.errors = ['就職先を2つ以上入力してください']
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
</style>
