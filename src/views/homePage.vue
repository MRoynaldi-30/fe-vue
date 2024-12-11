<script setup>
import { useRouter } from 'vue-router'
import { logout } from '../services/authService'

const router = useRouter()

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token')
    await logout(token)
    localStorage.removeItem('token') // Hapus token dari localStorage
    alert('Logged out successfully!')
    router.push('/login')
  } catch (error) {
    alert('Failed to logout.')
  }
}
</script>
<template>
  <div class="home-container">
    <h1>Welcome to the Home Page</h1>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<style scoped>
/* Tambahkan styling Anda di sini */
</style>
