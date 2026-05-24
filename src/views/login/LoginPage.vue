<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterResver, userLoginResver } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router/index'

const isRegister = ref(false)

// 存储表单数据
const formModel = ref({
  username: '',
  password: '',
  repassword: '',
}) // 🛠️ 修复：补全了这里的右括号

const form = ref()

// 注册函数
const register = async () => {
  await form.value.validate()
  await userRegisterResver(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = false
}
// 登录函数
const login = async () => {
  await form.value.validate()
  const res = await userLoginResver(formModel.value)
  useStore.setToken(res.data.token)
  router.push('/')
}

watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: '',
  }
})

// 存入token
const useStore = useUserStore()

// 校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 5, max: 10, message: '长度在 5-10 个字符', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'change' },
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 1. 注册表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
            v-model="formModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space
            >注册</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <!-- 🛠️ 修复：underline="never" -->
          <el-link type="info" underline="never" @click="isRegister = false">← 返回</el-link>
        </el-form-item>
      </el-form>

      <!-- 2. 登录表单 -->
      <!-- 🛠️ 修复：为登录表单也绑定上 :model 和 :rules -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <!-- 🛠️ 修复：underline="never" -->
            <el-link type="primary" underline="never">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <!-- 🛠️ 修复：underline="never" -->
          <el-link type="info" underline="never" @click="isRegister = true">注册账号 →</el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  } // 🛠️ 修复：补全了原本丢失的闭合花括号
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  } // 🛠️ 修复：补全了原本丢失的闭合花括号
}
</style>
