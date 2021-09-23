<template>
  <v-container>
    <TheSteppers :value="2" />
    <v-row justify="center">
      <v-col cols="8">
        <h3>STEP2 評価基準の選択</h3>
        <v-row>
          <v-col align="center">
            <p>あなたが就職先を決める上で考慮する条件にチェックをつけてください。</p>
          </v-col>
        </v-row>
        <v-row>
          <v-sheet
            class="pt-3"
          >
            <p>過去のチェック履歴（ログイン時に利用可能）</p>
            <v-card
              v-show="!criterionHistory"
              class="px-4 py-4"
              elevation="1"
            >
              <h6>no data</h6>
            </v-card>
          </v-sheet>
          <v-col class="mb-10 pt-0">
            <v-btn
              v-for="(item, index) in criterionHistory"
              :key="index"
              outlined
              color="#6495ed"
              height="24"
              class="mr-1"
              @click="pickUpFromHistory(item)"
            >
              {{ item }}
            </v-btn>
          </v-col>
        </v-row>
        <v-checkbox
          v-for="(item, index) in criteria"
          :id="'criterion' + index"
          :key="item"
          v-model="selectedCriteria"
          color="orange"
          :value="item"
          :label="item"
          class="mt-0"
        />
        <div class="input-group">
          <input
            id="addedCriteria"
            v-model="addedCriteria"
            placeholder="追加したい条件を記入"
            class="form-control"
            maxlength="50"
            @focus="errors = null"
          >
          <v-btn
            @click.native="addCriterion"
          >
            条件を追加
          </v-btn>
        </div>
        <template v-if="errors">
          <ErrorMessage
            :messages="errors"
          />
        </template>
        <TheButtons
          preview-page-path="/step1"
          @ok-button="handleSelectedCriteria"
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
  name: 'CriterionSelect',
  components: {
    TheButtons,
    TheSteppers,
    ErrorMessage
  },
  data() {
    return {
      criteria: [
        '労働時間',
        '通勤時間',
        '雇用の安定',
        '仕事の裁量権',
        '社会への貢献度',
        '周囲のサポートの充実度',
        'ワークライフバランス',
        'タスク/評価基準の明確性',
        '仕事の幅広さ',
        '福利厚生',
        '達成感',
        '収入'
      ],
      selectedCriteria: [],
      addedCriteria: null,
      criterionHistory: null,
      errors: null
    }
  },
  computed: {
    ...mapGetters('analyses', ['getAlternatives', 'getCriteria']),
    ...mapGetters('users', ['getCurrentUser'])
  },
  created() {
    // 他ページから移動してきたとき入力値が残ってるように
    if (this.getCriteria) {
      this.selectedCriteria = this.getCriteria
      // ユーザーが追加した分を表示できるように
      this.criteria = this.criteria.concat(this.getCriteria.filter(f => !this.criteria.includes(f)))
    }
    // 評価基準が変わるとそれまでの評点は意味を成さないのでいっそのこと消去
    this.$watch('selectedCriteria', function() {
      this.setCriterionImportances({eval: null, raw: null})
      this.setAlternativeEvaluations({eval: null, raw: null})
    })
    // 分析履歴のある評価基準を取得
    if (this.getCurrentUser) {
      this.$axios.get('criteria')
      .then(res => {
        this.criterionHistory = new Set(res.data)
        console.log(res)
      })
      .catch(err => { console.log(err) })
    }
  },
  methods: {
    isUnique(arr) {
      const set = new Set(arr) //一意性の検証　Setには重複値は入らない
      return set.size == arr.length ? true : false
    },
    addCriterion() {
      if (!this.addedCriteria) { return } // 空要素追加防止
      // 評価基準の追加
      // 入力値がcriteriaの要素と重複していないが検証し、クリアすればselectedCriteriaに追加
      const array = this.criteria.concat(this.addedCriteria)
      if (this.isUnique(array)) {
        this.criteria.push(this.addedCriteria)
        this.selectedCriteria.push(this.addedCriteria)
      } else {
        this.errors = ['入力内容に重複があります']
      }
      this.addedCriteria = null
    },
    pickUpFromHistory(item) {
      // 履歴からの追加
      // 選択項目がcriteriaの要素と重複してるか検証し、重複がある＝デフォルトの基準ならそのままselectedCriteriaに追加
      // 重複がない＝ユーザーオリジナルの基準ならcriteriaに加えた上でselectedCriteriaに追加
      const array = this.criteria.concat([item])
      if (this.isUnique(array)) {
        this.criteria.unshift(item)
      }
      this.selectedCriteria.push(item)
    },
    handleSelectedCriteria() {
      // バリデーションした上で選択した条件をストアに保存
      const set = new Set(this.selectedCriteria) // 履歴ボタンを複数回押したときのために重複を除く
      const array = Array.from(set)
      if (array.length >= 2) {
        this.setCriteria(array)
        this.$router.push('/step3')
        console.log(array)
      } else {
        this.errors = ['条件を2つ以上選んでください']
      }
    },
    ...mapActions('analyses', ['setCriteria', 'setCriterionImportances', 'setAlternativeEvaluations'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
  text-align: center;
}
</style>
