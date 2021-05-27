<template>
  <div class="col-4 offset-4">
    <h1>トップページ</h1>
    <router-link
      to="/analysis/step1"
      class="btn btn-success"
    >
      スタート
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>
