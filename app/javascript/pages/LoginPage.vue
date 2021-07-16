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
          <div class="email-form">
            <label for="email_form">メールアドレス</label>
            <input
              id="email_form"
              v-model="user.email"
              type="email"
              class="form-control mb-4"
              @focus="errors=null"
            >
          </div>
          <div class="password-form">
            <label for="password_form">パスワード</label>
            <input
              id="password_form"
              v-model="user.password"
              type="password"
              class="form-control mb-4"
              @focus="errors=null"
            >
          </div>
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
}
</style>
