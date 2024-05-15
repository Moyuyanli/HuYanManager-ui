<template>
  <div ref="cpu" class="cpu"></div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import echarts from "@/components/echarts";


const cpu = ref()

onMounted(() => {

  let infoEl = cpu.value;

  //  light dark
  let userEc = echarts.init(infoEl, "light");

  const option = {
    title: {
      text: 'CPU 性能图'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [80, 70, 60, 50, 40, 30, 20],
      type: 'line'
    }]
  }

  userEc.setOption(option);
})
</script>


<style scoped>
.cpu {
  width: 30%;
  height: 25vh;
}
</style>
