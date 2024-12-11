<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

const form = ref({
  email: '',
  password: '',
})

const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await login(form.value)
    const token = response.data.token
    localStorage.setItem('token', token) // Simpan token di localStorage
    alert('Login successful!')
    router.push('/home') // Redirect ke halaman Home
  } catch (error) {
    alert(error.response.data.message || 'Invalid credentials.')
  }
}
</script>
<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="form.email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="form.password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<style scoped>
/* Tambahkan styling Anda di sini */
</style>
