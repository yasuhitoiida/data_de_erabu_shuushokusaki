<template>
  <v-card
    class="overflow-x-auto my-7 px-6 pt-6"
    max-width="100%"
  >
    <div>
      {{ title }}
    </div>
    <v-data-table
      fixed-header
      mobile-breakpoint="10"
      :headers="headers"
      :items="items"
    />
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
  }
}
</script>

<style scoped>
.v-data-table--fixed-header >>> th:nth-child(1) {
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    z-index: 3;
    background: white;
}
.v-data-table--fixed-header >>> td:nth-child(1) {
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    z-index: 3;
    background: white;
}
</style>
