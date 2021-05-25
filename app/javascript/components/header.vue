<template>
  <nav class="navbar navbar-dark bg-dark">
    <span>データで選ぶ就職先</span>
    <!-- <template v-if="!isAuthenticated"> -->
    <span>
      <router-link
        to="/register"
      >ユーザー登録</router-link>
      <router-link
        to="/login"
      >ログイン</router-link>
    </span>
    <!-- </template> -->
    <!-- <template v-if="isAuthenticated"> -->
    <!-- <span>
        <router-link
          style="color: white;"
          to="#"
          @click.native="logout"
        >ログアウト</router-link>
      </span> -->
    <!-- </template> -->
  </nav>
</template>

<script>

export default {

}
</script>

<style scoped>
</style>
