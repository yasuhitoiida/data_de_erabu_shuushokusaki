import palette from 'google-palette'
Chart.defaults.global.defaultFontSize = 18

export default {
  backgroundColor(arr) {
    return palette('cb-Set2', arr.length).map(hex => {
      return '#' + hex
    })
  },
  createBarChartData(array) {
    const labels = array[0].data.map(f => { return f.name })
    const bgColors = this.backgroundColor(array)
    const datasets = array.map(f => {
      const data = f.data.map(g => g.overall)
      return { label: f.criterion, data: data }
    })
    for(let i = 0; i < datasets.length; i++) {
      datasets[i].backgroundColor = bgColors[i]
    }
    return { labels: labels, datasets: datasets}
  },
  createDoughnutChartData(array) {
    const labels = array.map(f => { return f.name })
    const data = array.map(f => { return f.weight })
    const bgColors = this.backgroundColor(array)
    const datasets = [{ data: data, backgroundColor: bgColors }]
    return { labels: labels, datasets: datasets }
  },
  createTableHeaders(hash) {
    const array = Object.keys(hash.scoreString).map(key => {
      return {text: `'${key}'に対するスコア`, value: `scoreString.${key}`, width: '120px', align: 'center'}
    })
    array.unshift({ text: '要素名', value: 'name', width: '150px'})
    array.push(
      { text: '幾何平均', value: 'geomean', width: '150px'},
      { text: '重要度', value: 'weight', width: '150px'}
    )
    return array
  }
}
