import palette from 'google-palette'
Chart.defaults.global.defaultFontSize = 18

export default {
  backgroundColor(arr) {
    return palette('cb-Set2', arr.length).map((hex) => {
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
  }
}
