<template>
  <ECharts class="chart" :options="options"></ECharts>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
export default {
  name: 'Charts',
  props: {
    id: {
      type: String
    },
    options: {
      type: Object
    }
  },
  components: {
    ECharts
  },
}
</script>
