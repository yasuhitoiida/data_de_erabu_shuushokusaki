<template>
  <div>
    <div
      v-for="(item, index) in combinationArray"
      :key="index"
    >
      <EvaluationItem
        :combination="item"
        :name="listNumber + '-' + index"
        @catch-value="sendData(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import EvaluationItem from './EvaluationItem.vue'
export default {
  name: 'EvaluationList',
  components: {
    EvaluationItem
  },
  props: {
    combinationArray: {
      type: Array,
      required: true
    },
    listNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      evaluationListData: []
    }
  },
  methods: {
    sendData(ind, val) {
      this.evaluationListData[ind] = val
      this.$emit('catch-data', this.evaluationListData)

      // const radioChange = document.querySelectorAll("input");
    	// for(var elem of radioChange) {
    	// 	elem.addEventListener('change',function(){
    	// 		if( this.checked ) {
    	// 			console.log(this.value);
    	// 		}
    	// 	});
    	// }
    }
  }
}
</script>

<style scoped>
</style>
