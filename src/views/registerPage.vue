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
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">Name</label>
        <input type="text" v-model="form.name" id="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="form.email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="form.password" id="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>
  </div>
</template>


<style scoped>
/* Tambahkan styling Anda di sini */
</style>
