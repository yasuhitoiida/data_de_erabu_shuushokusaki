<template>
  <v-app id="app">
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
    <TheFooter />
    <v-dialog
      v-model="dialog"
      persistent
      width="360"
    >
      <v-card
        align="center"
      >
        <v-card-title>
          最初からやり直してください
        </v-card-title>
        <v-card-text>
          不正な操作により入力データが破損しています。
        </v-card-text>
        <v-btn
          @click="retry"
          outlined
          color="red lighten-2"
          class="mb-3"
        >OK</v-btn>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter
  },
  data() {
    return {
      dialog: false,
    }
  },
  errorCaptured() {
    this.dialog = true
  },
  methods: {
    retry() {
      this.dialog = false
      location.href = 'step1'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, sans-serif, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app a {
  text-decoration: none;
}
</style>
