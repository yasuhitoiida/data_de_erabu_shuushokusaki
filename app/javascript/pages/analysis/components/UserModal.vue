<template>
    <v-row>
      <v-dialog
        v-model="dialog"
        @click:outside="closeModal"
        :width="width"
      >
        <v-card>
          <div id="user-modal">
            <v-row>
              <v-col
                align="right"
                class="pb-0"
              >
                <v-btn
                  @click="closeModal"
                  icon
                ><v-icon>mdi-close</v-icon></v-btn>
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
                <label for="register_name_form">ユーザー名</label>
                <input
                  id="register_name_form"
                  v-model="userRegister.name"
                  class="form-control mb-4"
                >
                <label for="register_email_form">メールアドレス</label>
                <input
                  id="register_email_form"
                  v-model="userRegister.email"
                  type="email"
                  class="form-control mb-4"
                >
                <label for="register_password_form">パスワード</label>
                <input
                  id="register_password_form"
                  v-model="userRegister.password"
                  type="password"
                  class="form-control mb-4"
                >
                <label for="register_password_confirmation_form">パスワード（確認）</label>
                <input
                  id="register_password_confirmation_form"
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
                <label for="login_email_form">メールアドレス</label>
                <input
                  id="login_email_form"
                  v-model="userLogin.email"
                  type="email"
                  class="form-control mb-4"
                >
                <label for="login_password_form">パスワード</label>
                <input
                  id="login_password_form"
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
        case 'lg': return '40%'
        case 'xl': return '40%'
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
        this.$router.push('/login');
        console.log(res);
      })
      .catch(err => {
        this.errors = err.response.data;
        console.log(err);
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
