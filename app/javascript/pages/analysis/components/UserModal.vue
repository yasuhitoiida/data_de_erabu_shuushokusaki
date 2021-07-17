<template>
  <v-dialog
    v-model="dialog"
    width="360"
    @click:outside="closeModal"
  >
    <v-card
      align="center"
    >
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
          <label for="register_name_form">ユーザー名</label>
          <input
            id="register_name_form"
            v-model="user.name"
            class="form-control mb-4"
          >
          <label for="register_email_form">メールアドレス</label>
          <input
            id="register_email_form"
            v-model="user.email"
            type="email"
            class="form-control mb-4"
          >
          <label for="register_password_form">パスワード</label>
          <input
            id="register_password_form"
            v-model="user.password"
            type="password"
            class="form-control mb-4"
          >
          <label for="register_password_confirmation_form">パスワード（確認）</label>
          <input
            id="register_password_confirmation_form"
            v-model="user.password_confirmation"
            type="password"
            class="form-control mb-4"
          >
          <v-btn
            dark
            color="#6495ed"
            @click="register"
          >
            登録
          </v-btn>
        </div>
        <h3>ログイン</h3>
        <div id="login-form">
          <label for="login_email_form">メールアドレス</label>
          <input
            id="login_email_form"
            v-model="user.email"
            type="email"
            class="form-control mb-4"
          >
          <label for="login_password_form">パスワード</label>
          <input
            id="login_password_form"
            v-model="user.password"
            type="password"
            class="form-control mb-4"
          >
          <v-btn
            dark
            color="#6495ed"
            @click="login"
          >
            ログイン
          </v-btn>
        </div>
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import ErrorMessage from '../../../components/ErrorMessage.vue'
export default {
  name: 'UserModal',
  components: {
    ErrorMessage
  },
  props: {
    display: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: null,
    }
  },
  computed: {
    dialog() {
      return this.display
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    register() {
      this.$axios.post('users', { user: this.user })
      .then(res => {
        this.$router.push('/login');
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        // this.errors = err.response.data;
      })
    },
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

<style>
</style>
