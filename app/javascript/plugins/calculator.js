export default {
  makePairs(arr) {
    // arr: [a,b,c,d]
    const newArray = []
    let i, j
    for(i = 1; i < arr.length; i++){
      const a = arr.slice(i-1)
      for(j = 1; j < a.length; j++){
        newArray.push([a[0], a[j]])
      }
    }
    return newArray
    //newArray: [[a,b],[a,c],[a,d],[b,c],[b,d],[c,d]]
  },
  abs(val) {
    // 絶対値を返す
    return val < 0 ? -val : val
  },
  geomean(arr) {
    // 幾何平均を返す
    // arr: [a,b,c]
    let n = arr.reduce((a,b) => {
      return a * b
    })
    return n ** (1 / (arr.length))
    // a*b*cの3乗根（幾何平均）
  },
  weightCalculation(factors, evalData) {
    // factors: [a,b,c]
    // evalData: [a対bの評点,a対cの評点,b対cの評点]
    let h, i, j, k, l
    // 要素ごとにデータを格納するためのハッシュを用意する
    const array = factors.map(f => {
      const scoreString = {}
      for (h = 0; h < factors.length; h++) {
        scoreString[factors[h]] = '1' // 1は自身に対するスコア
      }
      return {
        name: f, // 要素名
        scoreString: scoreString, // 文字列型のスコア　データテーブルに使う
        score: [1], // 数値型のスコア 1は自身に対するスコア
        geomean: null, // 幾何平均
        weight: null // 重要度
      }
    })
    // データの格納
    // たとえばa対bの評点をもとに、aのハッシュとbのハッシュにそれぞれデータを格納する
    for(i = 0; i < factors.length-1; i++) {
      const a = evalData.splice(0, factors.length-1-i)
      for(j = 0; j < a.length; j++) {
        const value = a[j] // 評点
        const abs = this.abs(value - 4) //評点-4の絶対値
        const score = 2 * abs + 1 // 評点が1ならscoreの値は7　6なら5
        if (value < 4) { // 評点が4未満=左側の要素が優れるとき
          // 左側の要素にscoreを追加し、右側の要素に1/scoreを追加
          array[i].score.push(score)
          array[i+j+1].score.push(1 / score)
          // 文字列としても同様に追加
          array[i].scoreString[array[i+j+1].name] = `${score}`
          array[i+j+1].scoreString[array[i].name] = `1/${score}`
        } else if (value == 4) { // 評点が4=左右とも同程度であるとき
          // 両方の要素にscore=1を追加
          array[i+j+1].score.push(score)
          array[i].score.push(score)
          // 文字列としても同様に追加
          array[i].scoreString[array[i+j+1].name] = `${score}`
          array[i+j+1].scoreString[array[i].name] = `${score}`
        } else { // 評点が4より大きい=右側の要素が優れるとき
          // 右側の要素にscoreを追加し、左側の要素に1/scoreを追加する
          array[i+j+1].score.push(score)
          array[i].score.push(1 / score)
          // 文字列としても同様に追加
          array[i].scoreString[array[i+j+1].name] = `1/${score}`
          array[i+j+1].scoreString[array[i].name] = `${score}`
        }
      }
    }
    // 要素ごとに幾何平均を算出
    for(k = 0; k < array.length; k++) {
      array[k].geomean = this.geomean(array[k].score)
    }
    // 要素ごとに重要度を算出
    for(l = 0; l < array.length; l++) {
      let geomeanTotal = array.reduce((sum, f) => sum + f.geomean, 0)
      array[l].weight = array[l].geomean / geomeanTotal
    }
    return array
    // array: [
    //   { name:a,
    //     scoreString:{a:aに対するスコア, b:bに対するスコア, c:cに対するスコア},
    //     score:[aに対するスコア, bに対するスコア, cに対するスコア],
    //     geomean:aの幾何平均,
    //     weight:aの重要度
    //   },
    //   { name:b,
    //     scoreString:{a:aに対するスコア,b:bに対するスコア,c:cに対するスコア},
    //     score:[aに対するスコア,bに対するスコア,cに対するスコア],
    //     geomean:bの幾何平均,
    //     weight:bの重要度
    //   },
    //   { name:c,
    //     scoreString:{a:aに対するスコア,b:bに対するスコア,c:cに対するスコア},
    //     score:[aに対するスコア,bに対するスコア,cに対するスコア],
    //     geomean:cの幾何平均,
    //     weight:cの重要度
    //   }
    // ]
  },
  resultCalculation(criImp, altEval) {
    // criImp: [
    //   {name:評価基準A, weight:評価基準Aの重要度}, // geomeanなどは省略
    //   {name:評価基準B, weight:評価基準Bの重要度}
    // ]
    // altEval: [
    //   { criterion:評価基準A,
    //     data:[
    //       {name:選択肢α, weight:選択肢αの重要度}, // geomeanなどは省略
    //       {name:選択肢β, weight:選択肢βの重要度},
    //     ]
    //   },
    //   { criterion:評価基準B,
    //     data:[
    //       {name:選択肢α, weight:選択肢αの重要度},
    //       {name:選択肢β, weight:選択肢βの重要度},
    //     ]
    //   }
    // ]
    let i, j, k
    // 選択肢ごとにデータを格納するためのハッシュを用意する
    const array = altEval[0].data.map(alt => {
      return { name: alt.name, multipledWeight:[], total: 0 }
    })
    // 選択肢ごとに総合評点を算出
    for (i = 0; i < altEval.length; i++) {
      const criweight = criImp.find(cri => cri.name === altEval[i].criterion).weight // 評価基準名で検索し重要度を取得
      const d = altEval[i].data
      for (j = 0; j < d.length; j++) {
        const a = array.find(alt => alt.name === d[j].name)　// 選択肢名で格納用ハッシュを検索
        // 重要度の積と総合評点を算出
        const weight = Number((d[j].weight * criweight).toFixed(3))　// 小数点3桁に整形
        a.multipledWeight.push({criterion:altEval[i].criterion, value:weight}) // 評価基準名と重要度の積をmultipledWeightに格納
        a.total += weight // 総合評点として加算していく
      }
    }
    // 総合評点を改めて小数点3桁に整形
    for (k = 0; k < array.length; k++) {
      array[k].total = Number(array[k].total.toFixed(3))
    }
    return array
    // array: [
    //   { name:選択肢α,
    //     multipledWeight:[
    //       {criterion:評価基準A, value:重要度の積（A,α）},{criterion:評価基準B, value:重要度の積（B,α）}
    //     ],
    //     total:総合評点
    //   },
    //   { name:選択肢β,
    //     multipledWeight:[
    //       {criterion:評価基準A, value:重要度の積（A,β）},{criterion:評価基準B, value:重要度の積（B,β）}
    //     ],
    //     total:総合評点
    //   },
    // ]
  },
  bestChoice(result) {
    // result: [
    //   {name:選択肢α, total:総合評点}, // multipledWeightは省略
    //   {name:選択肢β, total:総合評点}
    // ]
    // 総合評点がもっとも高かった選択肢の名前を返す
    var best = [result[0]] // 最初の選択肢を一旦ベストとする
    for (let i = 1; i < result.length; i++) {
      if (best[0].total < result[i].total) { // 他の選択肢の総合評点が高いとき
        best = [result[i]]　// その選択肢に入れ替える
      } else if (best[0].total == result[i].total) { // 他の選択肢と総合評点が等しいとき
        best.push(result[i]) //　その選択肢をベストの中に加える
      } else { // 他の選択肢の総合評点が低いとき
        ; // 何もしない
      }
    }
    return best.map(f => f.name)
    // ベストな選択肢名の配列
  }
}
