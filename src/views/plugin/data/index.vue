<template>
  <div class="common-layout">
    <el-container>
      <!-- 表切换 -->
      <el-aside width="300px">
        <el-card class="card">
          <template #header>
            <div class="card-header">
              <span>数据库表</span>
            </div>
          </template>
          <div v-for="item in tableList"
               :class="{ active : item.isActive}"
               class="switch"
               @click="switchTable(item)"
          >
            {{ item.name }}
          </div>
          <template #footer>
            <div style="font-size: 16px">
              插件id: {{ props.id }}
            </div>
          </template>
        </el-card>

      </el-aside>
      <el-container>
        <!-- 搜索区 -->
        <el-header>Header</el-header>
        <!-- 表结构 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps({
  id: {
    type: String
  }
})

interface TableCard {
  name: string;
  table: string;
  isActive?: boolean;
}

const tableList = ref<TableCard[]>([
  {
    name: "单一消息",
    table: 'hy_session_single'
  },
  {
    name: "一对多消息",
    table: 'hy_session_many'
  },
  {
    name: "一对多子消息",
    table: 'hy_session_many_subItem'
  },
])

const switchTable = (table: TableCard) => {
  console.log("table", table)
  tableList.value.forEach(it => it.isActive = it.table === table.table)
}

const initTableData = () => {
  tableList.value[0].isActive = true
  switchTable(tableList.value[0])
}

initTableData()

</script>


<style lang="scss" scoped>
@use "@/assets/scss/theme.scss" as *;

.card {
  max-width: 300px;
  max-height: 80vh;
  font-size: 20px;
  text-align: center;
  background: $bg-transparent-color;

}

.switch {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;

  &:hover {
    background: $bg-hover-color;
    color: $text-hover-color;
    cursor: pointer;
  }

  &.active {
    background: $bg-light-color;
  }
}


</style>
