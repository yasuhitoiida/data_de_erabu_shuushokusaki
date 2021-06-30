import palette from 'google-palette'
Chart.defaults.global.defaultFontSize = 18

export default {
  backgroundColor(length) {
    // 棒グラフの背景色
    return palette('cb-Set2', length).map(hex => {
      return '#' + hex
    })
  },
  createBarChartData(array) {
    // array == [
    //   {name:選択肢α, result:{評価基準A:..., 評価基準B:...}, total:総合評点},
    //   {name:選択肢β, result:{評価基準A:..., 評価基準B:...}, total:総合評点},
    // ]
    const labels = array.map(f => { return f.name })
    // 評価基準ごとに各選択肢の加重平均をまとめる
    const datasets = Object.keys(array[0].result).map(key => {
      const data = array.map(arr => { return arr.result[key] })
      return { label: key, data: data }
    })
    // datasets == [
    //   { label:評価基準A, data:[選択肢αの加重平均,選択肢βの加重平均]}
    //   { label:評価基準B, data:[選択肢αの加重平均,選択肢βの加重平均]}
    // ]
    const bgColors = this.backgroundColor(datasets.length)
    // 各評価基準に棒グラフの背景色を割り当てる
    for(let i = 0; i < datasets.length; i++) {
      datasets[i].backgroundColor = bgColors[i]
    }
    // datasets == [
    //   { label:評価基準A, data:[選択肢αの加重平均,選択肢βの加重平均], backgroundColor:#xxx}
    //   { label:評価基準B, data:[選択肢αの加重平均,選択肢βの加重平均], backgroundColor:#yyy}
    // ]
    // labels == [選択肢α,選択肢β]
    return { labels: labels, datasets: datasets }
  },
  createDoughnutChartData(array) {
    // array == [
    //   {name:評価基準A, weight:評価基準Aの重要度}, // geomeanなどは省略
    //   {name:評価基準B, weight:評価基準Bの重要度}
    // ]
    const labels = array.map(f => { return f.name })
    const data = array.map(f => { return f.weight })
    const bgColors = this.backgroundColor(array.length)
    const datasets = [{ data: data, backgroundColor: bgColors }]
    // labels == [評価基準A,評価基準B]
    // datasets == [{
    //   data:[評価基準Aの重要度,評価基準Bの重要度],
    //   backgroundColor:[#xxx,#yyy]
    // }]
    return { labels: labels, datasets: datasets }
  },
  createTableHeaderWeight(hash) {
    // hash == {
    //   scoreString:{要素a:要素aに対するスコア, 要素b:要素bに対するスコア}, geomeanなどは省略
    // }

    // 要素名をヘッダーのカラムに反映させる
    const array = Object.keys(hash.scoreString).map(key => {
      return {text: `'${key}'に対するスコア`, value: `scoreString.${key}`, width: '120px', align: 'center'}
    })
    array.unshift({ text: '要素名', value: 'name', width: '150px'})  // 最初のカラム
    array.push(
      { text: '幾何平均', value: 'geomean', width: '150px'},
      { text: '重要度', value: 'weight', width: '150px'}  // 最後のカラム
    )
    return array
    // array == [
    //   { text: '要素名', value: 'name', width: '150px'},
    //   { text: '要素A'に対するスコア, value: `scoreString.要素A`, width: '120px', align: 'center'}
    //   { text: '要素B'に対するスコア, value: `scoreString.要素B`, width: '120px', align: 'center'}
    //   { text: '幾何平均', value: 'geomean', width: '150px'},
    //   { text: '重要度', value: 'weight', width: '150px'}
    // ]
  },
  createTableHeaderResult(hash) {
    // hash == {name:選択肢α, result:{評価基準A:..., 評価基準B:...}, total:総合評点}
    const array = Object.keys(hash.result).map(key => {
      return {text: key, value: `result.${key}`, width: '120px', align: 'center'}
    })
    array.unshift({ text: '要素名', value: 'name', width: '150px'})
    array.push(
      { text: '総合評点', value: 'total', width: '150px', align: 'center'}
    )
    return array
    // array == [
    //   { text: '要素名', value: 'name', width: '150px'},
    //   { text: '評価基準A', value: `result.評価基準A`, width: '120px', align: 'center'},
    //   { text: '評価基準B', value: `result.評価基準B`, width: '120px', align: 'center'},
    //   { text: '総合評点', value: 'total', width: '150px', align: 'center'}
    // ]
  }
}
