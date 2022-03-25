<template>
  <el-table
    ref="tableRef"
    row-key="id"
    :data="tableData.list"
    style="width: 100%"
  >
    <el-table-column
      prop="id"
      label="ID"
      sortable
      width="180"
      column-key="id"
      align="center"
    />
    <el-table-column prop="url" label="预览" align="center">
      <template #default="scope">
        <el-image
          style="width: 160px; height: 90px"
          :src="scope.row.url"
          :preview-src-list="srcList.src"
          v-model:initial-index="currentPic"
          fit="cover"
          @click="perviewHandler(scope.row.url)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型" width="180" align="center">
      <template #default>
        <el-tag>null</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="putaway"
      label="状态"
      width="100"
      align="center"
      :filters="[
        { text: '1', value: '1' },
        { text: '0', value: '0' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.putaway === 1 ? '' : 'success'"
          disable-transitions
          >{{ scope.row.putaway }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150" align="center">
      <template #default="scope">
        <el-button size="small" type="primary" plain :disabled="Boolean(scope.row.putaway)" @click="handlerPut(scope.row, 1)">上架</el-button>
        <el-button size="small" type="info" plain :disabled="Boolean(!scope.row.putaway)" @click="handlerPut(scope.row, 0)">下架</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="limit"
    :page-sizes="[50, 100, 200, 300, 400]"
    :small="true"
    :disabled="disabled"
    background
    layout="->, sizes, prev, pager, next, total"
    :total="total"
    style="margin-top: 10px"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { reqPicData,reqUpdatePic } from "../../api/index";
import { ElMessage } from 'element-plus'

interface User {
  id: number;
  url: string;
  type: null;
  putaway: number;
}

const filterTag = (value: string, row: User) => {
  return String(row.putaway) === value;
};
let srcList = reactive({
  src: Array<string>(),
});
let currentPage = ref(1);
const limit = ref(50);
const disabled = ref(false);
const total = ref(0);
let tableData = reactive({
  list: Array<any>(),
});
let currentPic = ref(0);
function perviewHandler(url: string) {
  currentPic.value = srcList.src.findIndex((item) => item === url);
}
async function handlerPut(info:User, flag:number){
  const result:any = await reqUpdatePic(info.id, flag)
  if(result.code === 200){
    ElMessage({
      message: flag === 1? '上架成功！': '下架成功！',
      type: 'success'
    })
    handleCurrentChange(currentPage.value || 1);
  }
}

// 修改显示条数
const handleSizeChange = async (val: number) => {
  limit.value = val;
  const result: any = await reqPicData(val, currentPage.value);
  tableData.list = result.list;
  total.value = result.total;
  tableData.list.forEach((item) => srcList.src.push(item.url));
};
// 修改当前页
const handleCurrentChange = async (val: number = 1) => {
  currentPage.value = val;
  const result: any = await reqPicData(limit.value, currentPage.value);
  tableData.list = result.list;
  total.value = result.total;
  tableData.list.forEach((item) => srcList.src.push(item.url));
  // console.log(srcList.src);
};

onMounted(() => {
  handleCurrentChange(currentPage.value || 1);
});
</script>

<style lang="less" scoped>
/deep/.el-table__cell {
  position: static;
}
</style>
