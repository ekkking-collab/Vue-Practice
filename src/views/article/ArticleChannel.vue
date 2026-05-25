<script setup>
import { ref } from 'vue'
// 🛠️ 修复 2：导入表格按钮需要的 Edit 和 Delete 图标
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannle, artDelChannelService } from '@/api/article'

// 🛠️ 修复 1：去掉空格，并将路径修正为当前目录下的 components 文件夹
import ChannelEdit from './components/ChannelEdit.vue'

import { ElMessage, ElMessageBox } from 'element-plus'

const channelList = ref([])
const dialog = ref()

const getChannel = async () => {
  const res = await artGetChannle()
  channelList.value = res.data.data
}

const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannel()
}

const onAddChannel = () => {
  dialog.value.open({})
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onSuccess = () => {
  getChannel()
}
getChannel()
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>

    <el-table :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
