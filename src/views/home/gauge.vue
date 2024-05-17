<template>
  <div class="frame">
    <div ref="gauge" class="gauge">
    </div>
    <div class="title">{{ props.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import echarts from "@/components/echarts";
import {type EChartsOption} from "echarts";


const gauge = ref()


const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

onMounted(() => {
  let infoEl = gauge.value;
  let userEc = echarts.init(infoEl, "light");
  const option = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.6, '#67e0e3'],
              [0.9, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -7,
          length: 5,
          lineStyle: {
            color: '#ffffff',
            width: 2
          }
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: 'rgba(255,255,255,0)',
            width: 4
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 20,
          fontSize: 16
        },
        detail: {
          valueAnimation: true,
          fontSize: 16,
          formatter: '{value} %',
          color: 'inherit'
        },
        data: [
          {
            value: props.value
          }
        ]
      }
    ]
  };

  userEc.setOption(option);

  setInterval(function () {
    userEc.setOption<EChartsOption>({
      series: [
        {
          data: [
            {
              value: +(Math.random() * 100).toFixed(2)
            }
          ]
        }
      ]
    });
  }, 2000);
})


</script>


<style lang="scss" scoped>
@use "@/assets/scss/theme.scss" as *;

.frame {
  width: 25%;
  height: 100%;

  font-family: 'miaozi', sans-serif;

  .gauge {
    width: 100%;
    height: 90%;
    border-radius: 50px;
    background: $bg-transparent-color;
    box-shadow: $shadow;
  }
}


.title {
  position: relative;
  top: -60px;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
}
</style>
