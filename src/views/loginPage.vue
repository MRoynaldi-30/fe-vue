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
      <div class="bg-white px-10 py-4 rounded-xl w-screen shadow-xl max-w-sm">
        <div class="flex justify-center items-center">
          <h1 class="font-bold text-3xl">Login</h1>
        </div>
        <div class="mt-3">
          <label for="email">Email</label>
          <input
            type="email"
            class="pl-2 outline-none border w-full rounded-lg py-2"
            v-model="form.email"
            id="email"
            required
          />
        </div>
        <div class="mt-3">
          <label for="password" class="mt-3">Password</label>
          <input
            type="password"
            class="pl-2 outline-none border w-full rounded-lg py-2"
            v-model="form.password"
            id="password"
            required
          />
        </div>
        <div class="flex justify-center items-center mt-3">
          <button
            type="submit"
            class="bg-green-400 p-2 rounded-xl text-white hover:bg-green-700 font-bold"
          >
            Login
          </button>
        </div>
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
