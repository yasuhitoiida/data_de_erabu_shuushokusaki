<template>
  <v-card
    class="overflow-x-auto mb-5"
    max-width="100%"
  >
    <div>
      {{ title }}
    </div>
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
    title: {
      type: String,
      required: true
    },
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
