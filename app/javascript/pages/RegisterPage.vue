<template>
  <v-container>
    <v-row>
      <v-col
        cols="10"
        md="6"
        class="mx-auto"
      >
        <h3>ユーザー登録</h3>
        <template v-if="errors">
          <ErrorMessage
            :messages="errors"
          />
        </template>
        <div id="register-form">
          <div class="name">
            <label for="name_form">ユーザー名</label>
            <input
              id="name_form"
              v-model="user.name"
              class="form-control mb-4"
            >
          </div>
          <div class="email-form">
            <label for="email_form">メールアドレス</label>
            <input
              id="email_form"
              v-model="user.email"
              type="email"
              class="form-control mb-4"
            >
          </div>
          <div class="password-form">
            <label for="password_form">パスワード</label>
            <input
              id="password_form"
              v-model="user.password"
              type="password"
              class="form-control mb-4"
            >
          </div>
          <div class="password-confirmation-form">
            <label for="password_confirmation-form">パスワード（確認）</label>
            <input
              id="password_confirmation-form"
              v-model="user.password_confirmation"
              type="password"
              class="form-control mb-4"
            >
          </div>
          <v-btn
            dark
            color="#6495ed"
            @click="register"
          >
            登録
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ErrorMessage from '../components/ErrorMessage.vue'
export default {
  name: 'Register',
  components: {
    ErrorMessage
  },
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
      })
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 50px auto;
}
</style>
