<template>
  <v-alert
    dark
    color="#6495ed"
  >
    <li
      v-for="message in messages"
      :key="message"
      class="error-message"
    >
      {{ message }}
    </li>
  </v-alert>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    messages: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
