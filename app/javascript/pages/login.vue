<template>
  <div class="col-4 offset-4">
    <h1>ログイン</h1>
    <template v-if="errors">
      <li
        class="error-message"
      >
        パスワードが一致しません
      </li>
    </template>
    <div id="login-form">
      <div class="email-form">
        <label for="email_form">メールアドレス</label>
        <input
          id="email_form"
          v-model="user.email"
          type="email"
          class="form-control"
          @input="handleErrors"
        >
      </div>
      <div class="password-form">
        <label for="password_form">パスワード</label>
        <input
          id="password_form"
          v-model="user.password"
          type="password"
          class="form-control"
          @input="handleErrors"
        >
      </div>
      <button
        type="button"
        class="btn btn-success"
        @click="login"
      >
        ログイン
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
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
    handleErrors() {
      this.errors = null
    },
    async login() {
      try {
        await this.loginUser(this.user)
        this.$router.push('/')
      } catch(err) {
        console.log(err)
        this.errors = err
        this.user.password = null
      }
    },
    ...mapActions('users', ['loginUser'])
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>
