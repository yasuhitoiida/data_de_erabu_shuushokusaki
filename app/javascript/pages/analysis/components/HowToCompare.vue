<template>
  <v-dialog
    width="500"
    hide-overlay
  >
    <v-card>
      <v-col align="center">
        <p>
          on-mouse!
        </p>
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
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                class="mr-1"
                elevation="4"
                v-on="on"
              >
                {{ n }}
              </v-btn>
            </template>
            {{ tooltip[n-1] }}
          </v-tooltip>
          <v-tooltip bottom max-width="80%">
            <template #activator="{ on, attrs }">
              <v-icon
                class="ml-3"
                v-bind="attrs"
                v-on="on"
              >
                mdi-head-question-outline
              </v-icon>
            </template>
            <v-card width="600">
              <v-col>
                <p>
                  {{ tooltipDescription }}
                </p>
                <img :src="require(`../../../../assets/images/${tooltipImg}`)" style="width:100%" />
              </v-col>
            </v-card>
          </v-tooltip>
        </v-btn-toggle>
      </v-col>
    </v-card>
    <template #activator="{ on, attrs }">
      <v-btn
        color="red lighten-2"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        Help
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'HowToEvaluation',
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
      tooltipImgImp: 'b245b040c198967969f8819e201edc3f.png',
      tooltipImgEval: '6df413eb6a048f8dca2df5b18d6241b2.png',
      tooltipDescriptionImp: '労働時間が通勤時間よりやや重要であるとき',
      tooltipDescriptionEval: '労働時間においてA社がB社よりとても優れているとき'
    }
  },
  computed: {
    tooltip() {
      if (this.type === 'importance') {
        return this.tooltipImp
      } else {
        return this.tooltipEval
      }
    },
    tooltipImg() {
      if (this.type === 'importance') {
        return this.tooltipImgImp
      } else {
        return this.tooltipImgEval
      }
    },
    tooltipDescription() {
      if (this.type === 'importance') {
        return this.tooltipDescriptionImp
      } else {
        return this.tooltipDescriptionEval
      }
    }
  }
}
</script>

<style scoped>
</style>
