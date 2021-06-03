<template>
  <!-- <nav class="navbar">
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
  </nav> -->
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-navbar-brand href="#">
        データで選ぶ就職先
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          v-if="isAuthenticated"
          right
        >
          <b-nav-item-dropdown>
            <template #button-content>
              {{ isAuthenticated.name }}
            </template>
            <b-dropdown-item to="/mypage">
              マイページ
            </b-dropdown-item>
            <b-dropdown-item
              to="#"
              @click.native="logout"
            >
              ログアウト
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav-item>
        <b-nav-item
          v-else
          class="list-inline"
          right
        >
          <b-nav-item
            to="/register"
            class="list-inline-item"
          >
            ユーザー登録
          </b-nav-item>
          <b-nav-item
            to="/login"
            class="list-inline-item"
          >
            ログイン
          </b-nav-item>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
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
