<template>
  <div class="col-4 offset-4">
    <h1>ユーザー登録</h1>
    <template v-if="errors">
      <li
        v-for="error in errors"
        :key="error"
        class="error-message"
      >
        {{ error }}
      </li>
    </template>
    <div id="register-form">
      <div class="name">
        <label for="name_form">ユーザー名</label>
        <input
          id="name_form"
          v-model="user.name"
          class="form-control"
        >
      </div>
      <div class="email-form">
        <label for="email_form">メールアドレス</label>
        <input
          id="email_form"
          v-model="user.email"
          type="email"
          class="form-control"
        >
      </div>
      <div class="password-form">
        <label for="password_form">パスワード</label>
        <input
          id="password_form"
          v-model="user.password"
          type="password"
          class="form-control"
        >
      </div>
      <div class="password-confirmation-form">
        <label for="password_confirmation-form">パスワード（確認）</label>
        <input
          id="password_confirmation-form"
          v-model="user.password_confirmation"
          type="password"
          class="form-control"
        >
      </div>
      <button
        type="button"
        class="btn btn-success"
        @click="register"
      >
        登録
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: null
    }
  },
  methods: {
    register() {
      this.$axios.post('users', { user: this.user })
      .then(res => {
        this.$router.push('/login');
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        this.errors = err.response.data;
      });
    },
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>
