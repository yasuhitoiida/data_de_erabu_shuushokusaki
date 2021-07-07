<template>
  <div>
    <b>要素間の相対評価</b>
    <v-container>
      <p>要素F<sub>1</sub>を要素F<sub>2</sub>と比較したとき、要素F<sub>1</sub>の「要素F<sub>2</sub>に対するスコア」は以下のとおりである</p>
      <v-sheet
        color="#f5f5f5"
        rounded
        class="px-4 pt-5 pb-1"
      >
        <div>
          <p>要素F<sub>1</sub>が要素F<sub>2</sub>に対して</p>
          <ul>
            <li>とても優れているとき：7点</li>
            <li>優れているとき：5点</li>
            <li>やや優れているとき：3点</li>
            <li>同程度であるとき：1点</li>
            <li>やや劣っているとき：1/3点</li>
            <li>劣っているとき：1/5点</li>
            <li>とても劣っているとき：1/7点</li>
          </ul>
        </div>
      </v-sheet>
      <br>
      <ul>
        <li>たとえば、「労働時間」が「収入」より<b>とても優れている</b>(とても重要である)とき、労働時間の「収入に対するスコア」は<b>7点</b>、収入の「労働時間に対するスコア」は<b>1/7点</b></li>
        <li>また、ある評価基準の下で「A社」が「B社」より<b>やや劣っている</b>とき、A社の「B社に対するスコア」は<b>1/3点</b>、B社の「A社に対するスコア」は<b>3点</b></li>
      </ul>
      <p>なお、ある要素の、それ自身に対するスコアは1点である。</p>
    </v-container>
    <b>幾何平均</b>
    <v-container>
      <p>n個の要素(F<sub>1</sub>, F<sub>2</sub>, ..., F<sub>n</sub>)で要素間の比較を行ったとき、ある要素F<sub>k</sub>はn個のスコア(S<sub>1</sub>, S<sub>2</sub>, ..., S<sub>n</sub> = それぞれF<sub>1</sub>, F<sub>2</sub>, ..., F<sub>n</sub>に対するスコア)を持つ。このとき、</p>
      <v-sheet
        color="#f5f5f5"
        rounded
        class="px-4 pt-5 pb-1"
      >
        <div>
          <p>要素F<sub>k</sub>の幾何平均G<sub>k</sub> = (S<sub>1</sub> × S<sub>2</sub> × ... × S<sub>n</sub>)^(1/n)</p>
        </div>
      </v-sheet>
    </v-container>
    <b>重要度</b>
    <v-container>
      <p>重要度の算出方法として、本サービスでは幾何平均法を用いる。</p>
      <v-sheet
        color="#f5f5f5"
        rounded
        class="px-4 pt-5 pb-1"
      >
        <div>
          <p>要素F<sub>k</sub>の重要度I<sub>k</sub> = 幾何平均G<sub>k</sub> / 全要素の幾何平均の合計</p>
        </div>
      </v-sheet>
    </v-container>
    <b>総合評点</b>
    <v-container>
      <p>n個の評価基準(C<sub>1</sub>, C<sub>2</sub>, ..., C<sub>n</sub>)の重要度をそれぞれI<sub>C1</sub>, I<sub>C2</sub>, ..., I<sub>Cn</sub>とし、評価基準C<sub>k</sub>の下での代替案Aの重要度をI<sub>Ak</sub>とすると、</p>
      <v-sheet
        color="#f5f5f5"
        rounded
        class="px-4 pt-5 pb-1"
      >
        <div>
          <p>代替案Aの総合評点T<sub>A</sub> = I<sub>C1</sub>×I<sub>A1</sub> + I<sub>C2</sub>×I<sub>A2</sub> + ... + I<sub>Cn</sub>×I<sub>An</sub></p>
        </div>
      </v-sheet>
      <br>
      <p>たとえば、「労働時間」「収入」「福利厚生」の基準でA社を評価した場合、</p>
      <v-sheet
        color="#f5f5f5"
        rounded
        class="px-4 pt-5 pb-1 overflow-x-auto"
      >
        <div>
          <p>
            A社の総合評点<br>
            = 労働時間の重要度 × 労働時間についてのA社の重要度 <br>
            + 収入の重要度 × 収入についてのA社の重要度 <br>
            + 福利厚生の重要度 × 福利厚生についてのA社の重要度
          </p>
        </div>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AboutAnalisysMethod'
}
</script>

<style scoped>
.v-sheet {
  overflow-x: auto;
}
.v-sheet div {
  min-width: 600px;
}
</style>
