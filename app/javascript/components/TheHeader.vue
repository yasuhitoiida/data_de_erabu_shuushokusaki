<template>
  <nav class="navbar navbar-dark bg-dark">
    <span>データで選ぶ就職先</span>
    <template v-if="!isAuthenticated">
      <span>
        <router-link
          to="/register"
        >ユーザー登録</router-link>
        <router-link
          to="/login"
        >ログイン</router-link>
      </span>
    </template>
    <template v-if="isAuthenticated">
      <span>
        <router-link
          to="/mypage"
        >{{ isAuthenticated.name }}</router-link>
        <router-link
          to="#"
          @click.native="logout"
        >ログアウト</router-link>
      </span>
    </template>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    // ...mapGetters('users', ['loginUser']),
    isAuthenticated() {
      return this.$store.getters['users/loginUser']
    }
  },
  methods: {
    // ...mapActions('users', ['logoutUser']),
    async logout() {
      try {
        await this.$store.dispatch('users/logoutUser')
        this.$router.push('/')
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
