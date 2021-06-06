<template>
  <v-app id="app">
    <TheHeader />
    <router-view />
  </v-app>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
export default {
  components: {
    TheHeader,
  },
}
</script>

<style>
#app {
  font-family: sans-serif, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app a {
  text-decoration: none;
}
</style>
