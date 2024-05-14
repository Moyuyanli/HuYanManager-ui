<template>
  <el-icon
      :class="['custom-icon', props.class]"
      :color="props.color"
      :size="props.size"
  >
    <component :is="props.icon"/>
  </el-icon>
</template>

<script lang="ts" setup>
const props = defineProps({
  /**
   * 图标
   */
  icon: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 20,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    default: '',
    required: false,
  },
});
</script>


<style>

</style>
