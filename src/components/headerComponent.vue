<script setup>
import { logout} from '../services/authService'
import { useRouter } from 'vue-router'
// import { ref, onMounted } from 'vue'

const router = useRouter()
const token = localStorage.getItem('token')

const handleLogout = async () => {
  try {
    await logout(token)
    localStorage.removeItem('token') // Hapus token dari localStorage
    router.push('/login') // Redirect ke halaman login
  } catch (error) {
    console.error('Logout failed:', error.response.data.message)
    alert('Logout failed.')
  }
}
</script>

<template>
    <header class="bg-[#19B562] h-20 py-4 rounded-b-full flex items-center justify-between w-full">
        <div class="flex items-center px-10 h-full w-full justify-between">
            <h1 class="text-white text-2xl font-bold mb-1">Welcome</h1>
            <button @click="handleLogout" class="bg-red-400 text-white px-2 rounded-lg py-1 hover:bg-red-700 font-bold">Logout</button>
        </div>
    </header>
</template>