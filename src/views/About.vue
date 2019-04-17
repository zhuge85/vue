<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Chart :options="polar" />
  </div>
</template>
<script>
// import Chart from '@/components/Charts'
const Chart = () => import('@c/Charts');
export default {
  name: 'About',
  components: {
    Chart
    // Chart: resolve => require(['@c/Charts'], resolve)
  },
  data() {
    let data = []
    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    // console.log(data)
    return {
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  },
  created() {
  }
}
</script>
<style>
</style>