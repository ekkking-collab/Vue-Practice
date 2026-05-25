<script setup>
import { artGetChannle } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String],
  },
})

const emit = defineEmits(['update:modelValue'])

const ChannelList = ref([])

const getChannelList = async () => {
  const res = await artGetChannle()
  ChannelList.value = res.data.data
  console.log(ChannelList)
}

getChannelList()
</script>

<template>
  <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <el-option
      v-for="channel in ChannelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
