<template>
  <v-container>
    <TheSteppers :value="1" />
    <v-row>
      <v-col
        cols="9"
        md="6"
        class="mx-auto alternative-forms"
      >
        <h3>STEP1 選択肢の記入</h3>
        <v-row>
          <v-col
            align="center"
          >
            <p>
              あなたが今選択肢として考えている会社名を記入欄に記入してください。<br>
              <b>ご自身で判別できる形であれば、形式は自由です。</b>
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="mt-5">
            <p>過去の入力履歴（ログイン時に利用可能）</p>
            <v-card
              v-show="!alternativeHistory"
              class="px-4 py-4"
              elevation="1"
            >
              <h6>no data</h6>
            </v-card>
            <v-btn
              v-for="(item, index) in alternativeHistory"
              :key="index"
              height="24"
              outlined
              color="#6495ed"
              depressed
              class="mr-1 history"
              @click="pickUpFromHistory(item)"
            >
              {{ item }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mt-5">
            <p>会社名をイニシャルで入力する</p>
            <v-btn
              v-for="(item, index) in alphabets"
              :key="index"
              outlined
              :color="palette[index]"
              class="mr-2 mb-1"
              min-width="24"
              width="24"
              @click="inputInitial(item)"
            >
              {{ item }}
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="mt-3">
          <div>
            <p>記入欄</p>
            <v-text-field
              v-for="(item, index) in alternatives"
              :id="'alternative' + index"
              :key="index"
              v-model="alternatives[index]"
              outlined
              hide-details
              dense
              color="#6495ed"
              class="my-4"
              maxlength="50"
            />
          </div>
          <div>
            <router-link
              to="#"
              @click.native="addForm"
            >
              記入欄を追加
            </router-link>
          </div>
        </v-col>
        </v-row>
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
import palette from 'google-palette'
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
    alphabets() {
      const c = 'A'.charCodeAt(0)
      return Array.apply(null, new Array(26)).map((v, i) => {
        return String.fromCharCode(c + i)
      })
    },
    palette() {
      const colors = palette('cb-Set2', 8).map(hex => {
        return '#' + hex
      })
      const array = []
      for (let n = 0; n < 27; n++) {
        array.push(colors[n%8])
      }
      return array
    },
    ...mapGetters('analyses', ['getAlternatives']),
    ...mapGetters('users', ['getCurrentUser'])
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
    if (this.getCurrentUser) {
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
    inputFromButton(item) { // alternativesにnullがあれば最初のnullと置換、なければpush
      const ind = this.alternatives.findIndex(f => f === null)
      if (ind >= 0) {
        this.alternatives.splice(ind, 1, item)
      } else {
        this.alternatives.push(item)
      }
    },
    inputInitial(item) {
      const i = "会社" + `${item}`
      this.inputFromButton(i)
    },
    pickUpFromHistory(item) {
      this.inputFromButton(item)
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
