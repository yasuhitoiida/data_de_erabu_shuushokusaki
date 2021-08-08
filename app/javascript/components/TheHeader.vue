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
      <v-btn
        :href="twitterLink"
        target="_blank"
        rel="noopener noreferrer"
        depressed
        class="px-0"
      >
        <v-icon color="#424242">mdi-twitter</v-icon>
      </v-btn>
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
    },
    twitterLink() {
      const endpoint = 'https://twitter.com/intent/tweet'
      const text = '%23就活%20×%20%23階層分析%0a%0a公共事業や企業活動でも用いられる意思決定法"AHP"で、後悔のない仕事選びを！%0a%0a'
      return endpoint + `?text=${text}` + '&hashtags=就活用意思決定ツール%0a,ジョブハンターズチョイス%0a,階層分析%0a' + '&url=https://jobhunters-choice.com%0a'
    },
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
