<template>
  <v-container>
    <v-row>
      <v-col
        cols="10"
        md="6"
        class="mx-auto"
      >
        <h3>ログイン</h3>
        <div id="login-form">
          <label for="email-form">メールアドレス</label>
          <input
            id="email-form"
            v-model="user.email"
            type="email"
            class="form-control mb-4"
            @focus="errors=null"
          >
          <label for="password-form">パスワード</label>
          <input
            id="password-form"
            v-model="user.password"
            type="password"
            class="form-control mb-4"
            @focus="errors=null"
          >
          <template v-if="errors">
            <ErrorMessage
              :messages="errors"
            />
          </template>
          <v-btn
            dark
            color="#6495ed"
            @click="login"
          >
            ログイン
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorMessage from '../components/ErrorMessage.vue'
export default {
  name: 'Login',
  components: {
    ErrorMessage
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: null
    }
  },
  methods: {
    async login() {
      try {
        await this.loginUser(this.user)
        this.$router.push('/')
      } catch(err) {
        console.log(err)
        this.errors = ['メールアドレス、パスワードのどちらかに誤りがあります']
        this.user.password = null
      }
    },
    ...mapActions('users', ['loginUser'])
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
  text-align: center;
}
</style>
