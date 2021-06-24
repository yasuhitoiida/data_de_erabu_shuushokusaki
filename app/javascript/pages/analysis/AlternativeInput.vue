<template>
  <v-container>
    <v-row>
      <v-col
        cols="8"
        class="mx-auto alternative-forms"
      >
        <h3>STEP1 現状の選択肢を教えてください</h3>
        <v-col align="center">
          <p>
            あなたが今考えている会社名や求人などを記入してください。
          </p>
        </v-col>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters('analysis', ['getAlternatives'])
  },
  created() {
    if (this.getAlternatives) {
      this.alternatives = this.getAlternatives
    }
    this.$watch('alternatives', function() {
      this.setAlternativeEvaluations({eval: null, raw: null})
    })
  },
  methods: {
    addForm() {
      this.alternatives.push(null)
    },
    handleAlternative() {
      const array = this.alternatives.filter(v => v)
      const s = new Set(array)
      if (array.length >= 2 && s.size == array.length ) {
        this.setAlternatives(array)
        this.$router.push('/analysis/step2')
      } else if (array.length >= 2) {
        this.errors = ['入力内容に重複があります']
      } else {
        this.errors = ['就職先を2つ以上入力してください']
      }
    },
    ...mapActions('analysis', ['setAlternatives', 'setAlternativeEvaluations'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
