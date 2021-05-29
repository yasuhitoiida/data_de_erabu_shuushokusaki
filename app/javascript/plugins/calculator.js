export default {
  makePairs(arr) {
    const newArray = []
    let i, j
    for(i = 1; i < arr.length; i++){
      const f = arr.slice(i-1)
      for(j = 1; j < arr.length; j++){
        newArray.push([a[0], a[j]])
      }
    }
    return newArray
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
    const array = []
    let i, j, k, m
    for(i = 0; i < factors.length; i++){
      array.push({ name: factors[i], score: []})
    }
    for(j = 0; j < evalData.length; j++) {
      const factorA = array.find(f => f.name === evalData[j].combination[0])
      const factorB = array.find(f => f.name === evalData[j].combination[1])
      const value = evalData[j].score
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
  }
}
