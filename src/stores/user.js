import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfo } from '@/api/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newtoken) => {
      token.value = newtoken
    }
    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref('')
    const getInfo = async () => {
      const res = await userGetInfo()
      userInfo.value = res.data.data
    }
    return {
      token,
      setToken,
      removeToken,
      getInfo,
      userInfo,
    }
  },
  {
    persist: true,
  },
)
