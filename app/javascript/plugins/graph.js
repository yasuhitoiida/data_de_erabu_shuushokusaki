import * as palette from 'google-palette'

export default {
  createResultChartData(array) {
    const labels = array[0].data.map(f => { return f.name })
    const bgColors = palette('mpn65', array.length).map(
      function(hex) {
        return '#' + hex
      }
    )
    const datasets = array.map(f => {
      const data = f.data.map(g => g.score)
      return { label: f.criterion, data: data }
    })
    for(let i = 0; i < datasets.length; i++) {
      datasets[i].backgroundColor = bgColors[i]
    }
    return { labels: labels, datasets: datasets}
  }
}
