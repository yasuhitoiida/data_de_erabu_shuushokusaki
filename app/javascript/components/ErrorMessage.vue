<template>
  <div class="alert alert-info">
    <li
      v-for="message in messages"
      :key="message"
      class="error-message"
    >
      {{ message }}
    </li>
  </div>
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
