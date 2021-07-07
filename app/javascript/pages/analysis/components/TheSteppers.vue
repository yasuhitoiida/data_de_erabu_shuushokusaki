<template>
  <div>
    <v-stepper
      :value="value"
      flat
    >
      <v-stepper-header>
        <v-stepper-step
          step="1"
          color="#6495ed"
        >
          選択肢の入力
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          step="2"
          color="#6495ed"
        >
          評価基準の選択
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          step="3"
          color="#6495ed"
        >
          評価基準の重要度評価
        </v-stepper-step>

        <v-divider />

        <v-stepper-step
          step="4"
          color="#6495ed"
        >
          選択肢の評価
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'TheSteppers',
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
