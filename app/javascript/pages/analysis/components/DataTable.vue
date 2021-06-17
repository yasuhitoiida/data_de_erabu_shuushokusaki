<template>
  <v-card
    class="overflow-x-auto mb-5"
    max-width="100%"
  >
    <v-data-table
      :headers="headers"
      :items="items"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>
</style>
