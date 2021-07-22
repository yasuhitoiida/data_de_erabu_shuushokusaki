<template>
  <v-dialog
    width="500"
    hide-overlay
  >
    <v-card>
      <v-col align="center">
        <v-col>
          {{ clickOrOnMouse }}
        </v-col>
        <v-btn-toggle
          borderless
          tile
          color="deep-purple accent-3"
          name="#"
        >
          <v-tooltip
            v-for="n in 7"
            :key="n"
            bottom
            :open-on-click="true"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-1"
                elevation="4"
                :min-width="width"
                v-on="on"
              >
                {{ n }}
              </v-btn>
            </template>
            {{ tooltip[n-1] }}
          </v-tooltip>
        </v-btn-toggle>
        <v-col align="center" class="mt-4 pb-1">
          <v-tooltip
          bottom
          max-width="80%"
          :open-on-click="true"
          :open-on-hover="false"
          >
          <template #activator="{ on, attrs }">
            <a
            class="ml-3"
            v-bind="attrs"
            v-on="on"
            >
            for example..
          </a>
        </template>
        <v-card width="600">
          <v-col>
            <p>
              {{ tooltipDescription }}
            </p>
            <img
            :src="require(`../../../../assets/images/${tooltipImage}`)"
            style="width:100%"
            >
          </v-col>
        </v-card>
      </v-tooltip>
        </v-col>
      </v-col>
    </v-card>
    <template #activator="{ on, attrs }">
      <v-btn
        color="red lighten-2"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        HELP
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
import isMobile from 'ismobilejs'
export default {
  name: 'HowToCompare',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tooltipImp: [
        '左側がとても重要',
        '左側が重要',
        '左側がやや重要',
        '両方同じくらい重要',
        '右側がやや重要',
        '右側が重要',
        '右側がとても重要'
      ],
      tooltipEval: [
        '左側がとても優れている',
        '左側が優れている',
        '左側がやや優れている',
        '同程度',
        '右側がやや優れている',
        '右側が優れている',
        '右側がとても優れている'
      ],
      tooltipImageImp: 'b245b040c198967969f8819e201edc3f.png',
      tooltipImageEval: '6df413eb6a048f8dca2df5b18d6241b2.png',
      tooltipDescriptionImp: '労働時間が通勤時間よりやや重要であるとき',
      tooltipDescriptionEval: '労働時間においてA社がB社よりとても優れているとき'
    }
  },
  computed: {
    width() {
      return this.$vuetify.breakpoint.width <= 450 ? 36 : 48
    },
    clickOrOnMouse() {
      return isMobile.any ? 'CLICK!' : 'ON-MOUSE!'
    },
    tooltip() {
      return this.type === 'importance' ? this.tooltipImp : this.tooltipEval
    },
    tooltipImage() {
      return this.type === 'importance' ? this.tooltipImageImp : this.tooltipImageEval
    },
    tooltipDescription() {
      return this.type === 'importance' ? this.tooltipDescriptionImp : this.tooltipDescriptionEval
    }
  }
}
</script>

<style scoped>
</style>
