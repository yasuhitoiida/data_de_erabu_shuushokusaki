<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      :width="width"
      @click:outside="closeModal"
    >
      <v-card>
        <div id="user-modal">
          <v-row>
            <v-col
              align="right"
              class="pb-0"
            >
              <v-btn
                icon
                @click="closeModal"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-col>
            <h3>ユーザー登録</h3>
            <template v-if="errors">
              <ErrorMessage
                :messages="errors"
              />
            </template>
            <div id="register-form">
              <label for="register-name-form">ユーザー名</label>
              <input
                id="register-name-form"
                v-model="userRegister.name"
                class="form-control mb-4"
              >
              <label for="register-email-form">メールアドレス</label>
              <input
                id="register-email-form"
                v-model="userRegister.email"
                type="email"
                class="form-control mb-4"
              >
              <label for="register-password-form">パスワード</label>
              <input
                id="register-password-form"
                v-model="userRegister.password"
                type="password"
                class="form-control mb-4"
              >
              <label for="register-password_confirmation-form">パスワード（確認）</label>
              <input
                id="register-password_confirmation-form"
                v-model="userRegister.password_confirmation"
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
              <label for="login-email-form">メールアドレス</label>
              <input
                id="login-email-form"
                v-model="userLogin.email"
                type="email"
                class="form-control mb-4"
              >
              <label for="login-password-form">パスワード</label>
              <input
                id="login-password-form"
                v-model="userLogin.password"
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
        </div>
      </v-card>
    </v-dialog>
  </v-row>
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
      userRegister: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      userLogin: {
        email: '',
        password: ''
      },
      errors: null,
    }
  },
  computed: {
    dialog() {
      return this.display
    },
    width() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs': return '100%'
        case 'sm': return '80%'
        case 'md': return '60%'
        default: return '40%'
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    register() {
      this.$axios.post('users', { user: this.userRegister })
      .then(res => {
        this.errors = ['登録が完了しました','ログインをお願いします']
        console.log(res)
      })
      .catch(err => {
        this.errors = err.response.data;
        console.log(err)
      })
    },
    async login() {
      try {
        await this.loginUser(this.userLogin)
        this.$emit('authenticated')
        console.log(res)
      } catch(err) {
        this.errors = ['メールアドレス、パスワードのどちらかに誤りがあります']
        this.userLogin.password = null
        console.log(err)
      }
    },
    ...mapActions('users', ['loginUser'])
  }
}
</script>

<style scoped>
h3 {
  margin-top: 16px;
  text-align: center;
}
</style>
