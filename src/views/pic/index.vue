<template>
  <el-card shadow="always">
    <el-table
      ref="tableRef"
      row-key="id"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        sortable
        width="180"
        column-key="id"
      />
      <el-table-column prop="type" label="类型" width="180" />
      <el-table-column prop="url" label="预览" />

      <el-table-column
        prop="putaway"
        label="状态"
        width="100"
        :filters="[
          { text: '1', value: '1' },
          { text: '0', value: '0' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.putaway === '1' ? '' : 'success'"
            disable-transitions
            >{{ scope.row.putaway }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <el-button size="small" type="primary" plain>上架</el-button>
        <el-button size="small" type="info" plain>下架</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="true"
      :disabled="disabled"
      background
      layout="->, sizes, prev, pager, next, total"
      :total="400"
      style="margin-top: 10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';
interface User {
  id: string;
  type: string;
  url: string;
  putaway: string;
}

const filterTag = (value: string, row: User) => {
  return row.putaway === value;
};


const currentPage4 = ref(4)
const pageSize4 = ref(100)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const tableData: User[] = [
  {
    id: "0",
    type: "Tom",
    url: "No. 189, Grove St, Los Angeles",
    putaway: '1',
  },
  {
    id: "1",
    type: "Tom",
    url: "No. 189, Grove St, Los Angeles",
    putaway: '0',
  },
  {
    id: "2",
    type: "Tom",
    url: "No. 189, Grove St, Los Angeles",
    putaway: '1',
  },
  {
    id: "3",
    type: "Tom",
    url: "No. 189, Grove St, Los Angeles",
    putaway: '0',
  },
];
</script>

<style lang="less" scoped>
.el-card {
  height: 99%;
}

</style>
