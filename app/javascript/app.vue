<template>
  <v-app id="app">
    <TheHeader />
    <v-main>
      <router-view />
    </v-main>
    <TheFooter />
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
#app fieldset {
  border: 1px solid #cccccc;
}
</style>
