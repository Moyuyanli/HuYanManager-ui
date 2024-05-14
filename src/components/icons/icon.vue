<template>
  <el-icon>
    <component :is="props.icon"/>
  </el-icon>
</template>

<script setup lang="ts">



import {Comment} from "@element-plus/icons-vue";

const props = defineProps({
  /**
   * 图标
   */
  icon:{
    type:String,
    required:true
  }
});

</script>


<style scoped>

</style>
