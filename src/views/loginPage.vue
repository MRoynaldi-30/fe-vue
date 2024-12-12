<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'
// import '../assets/style.css'

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
  <div
    class="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full"
  >
    <form @submit.prevent="handleLogin" class="">
      <div class="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
        <div class="flex justify-center items-center">
          <h1 class="font-bold text-xl">Login</h1>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="form.email" id="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="form.password" id="password" required />
        </div>
        <button type="submit">Login</button>
        <div class="flex justify-center items-center mt-4">
          <p class="inline-flex items-center text-gray-700 font-medium text-xs text-center">
            <span class="ml-2"
              >You don't have an account?<a
                href="#"
                class="text-xs ml-2 text-blue-500 font-semibold"
                ><router-link to="/register">Register here</router-link> &rarr;</a
              >
            </span>
          </p>
        </div>
      </div>
    </form>
    <!-- <p>Don't have an account? </p> -->
  </div>
</template>

<!-- <style scoped>
/* Tambahkan styling Anda di sini */
</style> -->
