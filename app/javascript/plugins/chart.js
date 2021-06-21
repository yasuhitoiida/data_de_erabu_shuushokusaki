import palette from 'google-palette'
Chart.defaults.global.defaultFontSize = 18

export default {
  backgroundColor(length) {
    return palette('cb-Set2', length).map(hex => {
      return '#' + hex
    })
  },
  createBarChartData(array) {
    const labels = array.map(f => { return f.name })
    const datasets = Object.keys(array[0].result).map(key => {
      const data = array.map(arr => { return arr.result[key] })
      return { label: key, data: data }
    })
    const bgColors = this.backgroundColor(datasets.length)
    for(let i = 0; i < datasets.length; i++) {
      datasets[i].backgroundColor = bgColors[i]
    }
    return { labels: labels, datasets: datasets }
  },
  createDoughnutChartData(array) {
    const labels = array.map(f => { return f.name })
    const data = array.map(f => { return f.weight })
    const bgColors = this.backgroundColor(array.length)
    const datasets = [{ data: data, backgroundColor: bgColors }]
    return { labels: labels, datasets: datasets }
  },
  createTableHeaderWeight(hash) {
    const array = Object.keys(hash.scoreString).map(key => {
      return {text: `'${key}'に対するスコア`, value: `scoreString.${key}`, width: '120px', align: 'center'}
    })
    array.unshift({ text: '要素名', value: 'name', width: '150px'})
    array.push(
      { text: '幾何平均', value: 'geomean', width: '150px'},
      { text: '重要度', value: 'weight', width: '150px'}
    )
    return array
  },
  createTableHeaderResult(hash) {
    const array = Object.keys(hash.result).map(key => {
      return {text: key, value: `result.${key}`, width: '120px', align: 'center'}
    })
    array.unshift({ text: '要素名', value: 'name', width: '150px'})
    array.push(
      { text: '総合評点', value: 'total', width: '150px', align: 'center'}
    )
    return array
  },

}
