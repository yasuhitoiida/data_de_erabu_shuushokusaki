<template>
  <div>
    <v-app-bar
      app
    >
      <v-toolbar-title>
        <v-btn
          id="logo"
          @click="topPage"
        >
          JobHunter<span>'</span>s&nbsp;Choice
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items
        v-if="isAuthenticated"
      >
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              color="secondary"
              dark
              v-bind="attrs"
              style="text-transform: none;"
              v-on="on"
            >
              {{ isAuthenticated.name }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn
                text
                to="/mypage"
              >
                マイページ
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                text
                to="#"
                @click.native="logout"
              >
                ログアウト
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-toolbar-items
        v-else
      >
        <v-btn
          text
          to="/register"
          class="list-inline-item"
        >
          ユーザー登録
        </v-btn>
        <v-btn
          text
          to="/login"
          class="list-inline-item"
        >
          ログイン
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  computed: {
    // ...mapGetters('users', ['loginUser']),
    isAuthenticated() {
      return this.$store.getters['users/getLoginUser']
    }
  },
  methods: {
    topPage() {
      location.href = '/'
    },
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
#logo {
  font-size: 18px;
}
#logo span {
  color: #6495ed;
}
</style>
