<template>
  <v-container>
    <TheSteppers :value="1"></TheSteppers>
    <v-row>
      <v-col
        cols="8"
        class="mx-auto alternative-forms"
      >
        <h3>STEP1 選択肢の記入</h3>
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
import TheSteppers from './components/TheSteppers.vue'
import ErrorMessage from '../../components/ErrorMessage.vue'
export default {
  name: 'AlternativeInput',
  components: {
    TheButtons,
    TheSteppers,
    ErrorMessage
  },
  data() {
    return {
      alternatives: [null, null, null], //要素の数だけフォームが表示される
      errors: null
    }
  },
  computed: {
    ...mapGetters('analysis', ['getAlternatives'])
  },
  created() {
    // 次ページから戻ってきたときに入力値が残ってるように
    if (this.getAlternatives) {
      this.alternatives = this.getAlternatives
    }
    // 選択肢が変わればそれまでの評点は意味を成さないのでいっそのこと消去
    this.$watch('alternatives', function() {
      this.setAlternativeEvaluations({eval: null, raw: null})
    })
  },
  methods: {
    addForm() {
      // 入力フォームを追加
      this.alternatives.push(null)
    },
    handleAlternative() {
      // バリデーションした上で入力値をストアに保存
      const array = this.alternatives.filter(v => v) //空要素を除去
      const s = new Set(array) //一意性の検証　Setには重複値は入らない
      if (array.length >= 2 && s.size == array.length ) {
        this.setAlternatives(array)
        this.$router.push('/analysis/step2')
        console.log(array)
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
