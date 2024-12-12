<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addGuest } from '../services/authService'

import HeaderComponent from '@/components/headerComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'

const token = localStorage.getItem('token')

const router = useRouter()

const newGuest = ref({
  name: '',
  email: '',
  date_of_birth: '',
  id_card_number: '',
}) 

// Fungsi untuk menambah guest
const handleAddGuest = async () => {
  try {
    await addGuest(newGuest.value, token) // Tambah guest baru
    alert('Guest added successfully!')
    // Reset form
    newGuest.value = { name: '', email: '', date_of_birth: '', id_card_number: '' }
    router.push('/home')
  } catch (error) {
    console.error('Failed to add guest:', error.response?.data?.message || error.message)
    alert('Failed to add guest.')
  }
}
</script>

<template>
  <div class="h-screen bg-gradient-to-br flex items-center flex-col w-full bg-gray-100">
    <HeaderComponent />
    <div class="w-full flex flex-col justify-center h-screen px-32">
      <div class="flex justify-end px-2 py-3">
        <p class="bg-blue-400 px-2 rounded-lg inline-block hover:bg-blue-700"><router-link to="/home" class="text-nowrap text-medium font-bold text-white">Back</router-link></p>
      </div>
      <form @submit.prevent="handleAddGuest" class="bg-white px-10 py-4 rounded-xl shadow-xl">
        <div class="flex items-center justify-center mb-4">
          <h2 class="font-bold text-xl">Add Guest</h2>
        </div>
        <div class="mb-2">
          <label for="name">Name</label>
            <input
              v-model="newGuest.name"
              placeholder="Name"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
        </div>
        <div class="mb-2">
          <label for="email">Email</label>
            <input
              v-model="newGuest.email"
              placeholder="Email"
              type="email"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
        </div>
        <div class="mb-2">
          <label for="date_of_birth">Date of Birth</label>
            <input
              v-model="newGuest.date_of_birth"
              placeholder="Date of Birth"
              type="date"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
        </div>
        <div class="mb-2">
          <label for="id_card_number">ID Card Number<span></span></label>
            <input
              v-model="newGuest.id_card_number"
              placeholder="ID Card Number"
              type="number"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
        </div>
        <div class="flex items-center justify-center">
            <button type="submit" class="text-nowrap bg-blue-500 p-2 rounded-lg font-bold text-white hover:bg-blue-700">
              Add Guest
            </button>
        </div>
      </form>
    </div>
    <div class="flex-grow"></div>
    <FooterComponent />
  </div>
</template>
