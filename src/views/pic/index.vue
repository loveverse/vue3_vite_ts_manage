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
  </el-card>
</template>

<script setup lang="ts">

interface User {
  id: string;
  type: string;
  url: string;
  putaway: string;
}

const filterTag = (value: string, row: User) => {
  return row.putaway === value;
};

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
