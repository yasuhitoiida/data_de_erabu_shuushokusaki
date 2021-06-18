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
  abs(val) {
    return val < 0 ? -val : val
  },
  geomean(arr) {
    let n = arr.reduce((a,b) => {
      return a * b
    })
    return n ** (1 / (arr.length+1))
  },
  weightCalculation(factors, evalData) {
    let h, i, j, k, m
    const array = factors.map(f => {
      const scoreString = {}
      for (h = 0; h < factors.length; h++) {
        scoreString[factors[h]] = '1'
      }
      return { name: f, scoreString: scoreString, score: [], geomean: null, weight: null}
    })
    for(i = 0; i < factors.length-1; i++) {
      const a = evalData.splice(0, factors.length-1-i)
      for(j = 0; j < a.length; j++) {
        const value = a[j]
        const abs = this.abs(value - 4)
        const score = 2 * abs + 1
        if (value < 4) {
          array[i].score.push(score)
          array[i+j+1].score.push(1 / score)
          array[i].scoreString[array[i+j+1].name] = `${score}`
          array[i+j+1].scoreString[array[i].name] = `1/${score}`
        } else if (value == 4) {
          array[i+j+1].score.push(score)
          array[i].score.push(score)
          array[i].scoreString[array[i+j+1].name] = `${score}`
          array[i+j+1].scoreString[array[i].name] = `${score}`
        } else {
          array[i+j+1].score.push(score)
          array[i].score.push(1 / score)
          array[i].scoreString[array[i+j+1].name] = `1/${score}`
          array[i+j+1].scoreString[array[i].name] = `${score}`
        }
      }
    }
    for(k = 0; k < array.length; k++) {
      array[k].geomean = this.geomean(array[k].score)
    }
    for(m = 0; m < array.length; m++) {
      let geomeanTotal = array.reduce((sum, f) => sum + f.geomean, 0)
      array[m].weight = array[m].geomean / geomeanTotal
    }
    return array
  },
  resultCalculation(criImp, altEval) {
    let i, j
    const array = altEval[0].data.map(alt => {
      return { name: alt.name, result:{}, total: 0 }
    })
    for (i = 0; i < altEval.length; i++) {
      const criweight = criImp.find(cri => cri.name === altEval[i].criterion).weight
      const d = altEval[i].data
      for (j = 0; j < d.length; j++) {
        const a = array.find(arr => arr.name === d[j].name)
        a.result[altEval[i].criterion] = d[j].weight * criweight
        a.total += d[j].weight * criweight
      }
    }
    return array
  },
  totalCalculation(result, alt) {
    for(let i = 0; i < result.length; i++) {
      const a = result[i].data.map(f => {
        return f.find(g => g.name === alt[i])
      })
      const score = a.reduce((sum, f) => sum + f.score, 0)
      array.push({ alternative: alt[i], score: score })
    }
    return array
  }
}
