export default {
  makePairs(arr) {
    const newArray = []
    let i, j
    for(i = 1; i < arr.length; i++){
      const a = arr.slice(i-1)
      for(j = 1; j < a.length; j++){
        newArray.push([a[0], a[j]])
      }
    }
    return newArray
  },
  createEvalData(com, val) {
    let obj = {}
    obj.combination = com
    obj.value = val
    return obj
  },
  abs(val) {
    return val < 0 ? -val : val
  },
  geomean(arr) {
    let n = arr.reduceRight((a,b) => {
      return a * b
    })
    return n ** (1 / arr.length)
  },
  weightCalculation(factors, evalData) {
    let i, j, k, m
    const array = factors.map(f => {
      return { name: f, score: [], geomean: null, weight: null }
    })
    for(j = 0; j < evalData.length; j++) {
      const factorA = array.find(f => f.name === evalData[j].combination[0])
      const factorB = array.find(f => f.name === evalData[j].combination[1])
      const value = evalData[j].value
      const abs = this.abs(value - 4)
      const score = 2 * abs + 1
      if (value < 4) {
        factorA.score.push(score)
        factorB.score.push(1 / score)
      } else {
        factorB.score.push(score)
        factorA.score.push(1 / score)
      }
    }
    for(k = 0; k < array.length; k++) {
      array[k].geomean = this.geomean(array[k].score)
    }
    for(m = 0; m < array.length; m++) {
      let geomeanTotal = array.reduce((sum, f) => sum + f.geomean, 0);
      array[m].weight = array[m].geomean / geomeanTotal
    }
    return array
  },
  // resultCalculation(cri, alt) {
  //   for(let i = 0; i < cri.length; i++) {
  //     const altData = alt.find(f => f.criterion === cri[i].name).data
  //     for(let j = 0; j < altData.length; j++) {
  //       cri[i].weight *
  // }
}
