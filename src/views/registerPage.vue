<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/authService'

const form = ref({
  name: '',
  email: '',
  password: '',
})

const router = useRouter()

const handleRegister = async () => {
  try {
    await register(form.value)
    alert('Registration successful!')
    router.push('/login')
  } catch (error) {
    alert(error.response.data.message || 'Something went wrong.')
  }
}
</script>

<template>
  <div
    class="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full"
  >
    <form @submit.prevent="handleRegister">
      <div class="bg-white px-10 py-4 rounded-xl w-screen shadow-xl max-w-sm">
        <div class="flex justify-center items-center">
          <h1 class="font-bold text-3xl">Register</h1>
        </div>
        <div class="mt-3">
          <label for="name">Name</label>
          <input
            type="text"
            v-model="form.name"
            id="name"
            required
            class="pl-2 outline-none border w-full rounded-lg py-2"
          />
        </div>
        <div class="mt-3">
          <label for="email">Email</label>
          <input type="email" v-model="form.email" id="email" required class="pl-2 outline-none border w-full rounded-lg py-2"/>
        </div>
        <div class="mt-3">
          <label for="password">Password</label>
          <input type="password" v-model="form.password" id="password" required class="pl-2 outline-none border w-full rounded-lg py-2"/>
        </div>
        <div class="mt-3 flex justify-center items-center">
          <button type="submit" class="bg-green-400 w-full p-2 rounded-xl text-white hover:bg-green-700 font-bold">Register</button>
        </div>
        <div class="flex justify-center items-center text-sm mt-2">
          <p>Already have an account? <router-link to="/login" class="text-blue-400 hover:text-blue-700">Login here</router-link></p>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Tambahkan styling Anda di sini */
</style>
