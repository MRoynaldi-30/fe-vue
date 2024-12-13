<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { updateGuest, showGuest } from '../services/authService'
import FooterComponent from '@/components/footerComponent.vue'
import HeaderComponent from '@/components/headerComponent.vue'

const route = useRoute()
const router = useRouter()
const token = localStorage.getItem('token')

const guest = ref({
  name: '',
  email: '',
  date_of_birth: '',
  id_card_number: '',
})

// Ambil data berdasarkan ID dari parameter
onMounted(async () => {
  try {
    const response = await showGuest(token)
    const currentGuest = response.data.guests.find((g) => g.id === parseInt(route.params.id))
    if (currentGuest) {
      guest.value = { ...currentGuest }
    } else {
      alert('Guest not found!')
      router.push('/home')
    }
  } catch (error) {
    console.error('Failed to fetch guest:', error.response.data.message)
    alert('Failed to fetch guest data.')
  }
})

// Update data guest
const handleUpdateGuest = async () => {
  try {
    await updateGuest(route.params.id, guest.value, token)
    alert('Guest updated successfully.')
    router.push('/home') // Kembali ke halaman home setelah berhasil update
  } catch (error) {
    console.error('Failed to update guest:', error.response.data.message)
    alert('Failed to update guest.')
  }
}
</script>

<template>
  <div class="h-screen bg-gradient-to-br flex items-center flex-col w-full bg-gray-100">
    <HeaderComponent />
      <div class="w-full flex flex-col justify-center h-screen px-32">
        <div class="flex justify-end px-2 py-3">
          <p class="bg-blue-400 px-2 rounded-lg inline-block hover:bg-blue-700">
            <router-link to="/home" class="text-nowrap text-medium font-bold text-white"
              >Back</router-link
            >
          </p>
        </div>
        <form @submit.prevent="handleUpdateGuest" class="px-10 py-4 rounded-xl shadow-xl">
          <div class="flex items-center justify-center mb-4">
            <h2 class="font-bold text-xl">Update Guest</h2>
          </div>
          <div class="mb-2">
            <label for="name">Name</label>
            <input
              v-model="guest.name"
              placeholder="Name"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
          </div>
          <div class="mb-2">
            <label for="email">Email</label>
            <input
              v-model="guest.email"
              placeholder="Email"
              type="email"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
          </div>
          <div class="mb-2">
            <label for="date_of_birth">Date of Birth</label>
            <input
              v-model="guest.date_of_birth"
              placeholder="Date of Birth"
              type="date"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
          </div>
          <div class="mb-2">
            <label for="id_card_number">ID Card Number<span></span></label>
            <input
              v-model="guest.id_card_number"
              placeholder="ID Card Number"
              type="number"
              required
              class="pl-2 outline-none border w-full rounded-lg py-2"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              type="submit"
              class="text-nowrap bg-blue-500 p-2 rounded-lg font-bold text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    <FooterComponent />
  </div>
</template>
