<template>
  <v-container>
    <TheSteppers :value="1" />
    <v-row>
      <v-col
        cols="8"
        class="mx-auto alternative-forms"
      >
        <h3>STEP1 選択肢の記入</h3>
        <v-row>
          <v-col align="center">
            <p>
              あなたが今考えている会社名や求人などを記入してください。
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="mb-6"
          >
            <v-btn
              v-for="(item, index) in alternativeHistory"
              @click="pickUpFromHistory(item)"
              outlined
              color="#6495ed"
              height="24"
              class="mr-1"
            >{{ item }}</v-btn>
          </v-col>
        </v-row>
        <div>
          <input
            v-for="(item, index) in alternatives"
            :key="index"
            :id="'alternative' + index"
            v-model="alternatives[index]"
            class="form-control mb-3"
            maxlength="50"
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
      errors: null,
      alternativeHistory: null
    }
  },
  computed: {
    ...mapGetters('analyses', ['getAlternatives']),
    ...mapGetters('users', ['getLoginUser'])
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
    // 分析履歴のある選択肢を取得
    if (this.getLoginUser) {
      this.$axios.get('alternatives')
      .then(res => {
        this.alternativeHistory = new Set(res.data)
        console.log(res)
      })
      .catch(err => { console.log(err) })
    }
  },
  methods: {
    addForm() {
      // 入力フォームを追加
      this.alternatives.push(null)
    },
    isUnique(arr) {
      const s = new Set(arr) //一意性の検証　Setには重複値は入らない
      return s.size == arr.length ? true : false
    },
    isEnough(arr) {
      return arr.length >= 2 ? true : false
    },
    pickUpFromHistory(item) {
      this.alternatives.unshift(item)
    },
    handleAlternative() {
      // バリデーションした上で入力値をストアに保存
      const alt = this.alternatives.filter(v => v && v.match(/\S/g)) // blankを除去
      if (this.isEnough(alt) && this.isUnique(alt)) {
        this.setAlternatives(alt)
        this.$router.push('/step2')
        console.log(alt)
      } else if (this.isEnough(alt)) {
        this.errors = ['入力内容に重複があります']
      } else {
        this.errors = ['選択肢を2つ以上入力してください']
      }
    },
    ...mapActions('analyses', ['setAlternatives', 'setAlternativeEvaluations'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
  text-align: center;
}
</style>
