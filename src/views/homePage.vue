<script setup>
import { ref, onMounted, computed } from 'vue'
import { showGuest, searchGuest, deleteGuest } from '../services/authService'
import HeaderComponent from '@/components/headerComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'

const token = localStorage.getItem('token')
const guests = ref([]) // Untuk menyimpan semua guests
const searchQuery = ref('') // Query untuk mencari guest
const searchResults = ref([]) // Hasil pencarian guest

// Ambil semua guests saat halaman dimuat
onMounted(async () => {
  try {
    const response = await showGuest(token)
    guests.value = response.data.guests
  } catch (error) {
    console.error('Failed to fetch guests:', error.response.data.message)
    alert('Failed to fetch guests.')
  }
})

// Computed untuk menentukan data mana yang akan ditampilkan di tabel
const displayedGuests = computed(() => {
  return searchQuery.value ? searchResults.value : guests.value
})

// Fungsi untuk mencari guest
const handleSearchGuest = async () => {
  try {
    const response = await searchGuest(searchQuery.value, token)
    searchResults.value = response.data.guests
  } catch (error) {
    console.error('Failed to search guest:', error.response.data.message)
    alert('No guests found with the given name.')
  }
}

const handleDeleteGuest = async (id) => {
  if (confirm('Are you sure you want to delete this guest?')) {
    try {
      await deleteGuest(id, token)
      // Hapus guest dari daftar lokal
      guests.value = guests.value.filter((guest) => guest.id !== id)
      alert('Guest deleted successfully.')
    } catch (error) {
      console.error('Failed to delete guest:', error.response.data.message)
      alert('Failed to delete guest.')
    }
  }
}
</script>

<template>
  <div class="h-screen bg-gradient-to-br flex items-center flex-col w-full bg-gray-100">
    <HeaderComponent />
    <!-- Form untuk Search Guest -->
    <div class="flex items-start flex-col w-full px-10 mb-3 mt-6">
      <div class="mb-1 ml-1">
        <h1 class="font-bold text-xl">Data Guest</h1>
      </div>
      <form @submit.prevent="handleSearchGuest" class="flex gap-2">
        <input
          v-model="searchQuery"
          placeholder="Search by Name"
          required
          class="pl-2 outline-none border w-full rounded-lg py-2"
        />
        <button
          class="bg-green-400 px-2 rounded-lg font-bold hover:bg-green-700 hover:text-white"
          type="submit"
        >
          Search
        </button>
        <p class="bg-green-400 px-2 rounded-lg font-bold hover:bg-green-700 flex items-center">
          <router-link to="/add" class="text-nowrap">Add Guest</router-link>
        </p>
      </form>
    </div>

    <!-- Daftar Guests -->
    <div class="rounded-lg flex-grow bg-gray-100 w-full overflow-x-auto px-10">
      <table class="w-full shadow-lg">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
            <th class="py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
            <th class="py-4 px-6 text-left text-gray-600 font-bold uppercase">Date of Birth</th>
            <th class="py-4 px-6 text-left text-gray-600 font-bold uppercase">ID Card Number</th>
            <th class="py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="guest in displayedGuests" :key="guest.id">
            <td class="py-4 px-6 border-b border-gray-200">{{ guest.name }}</td>
            <td class="py-4 px-6 border-b border-gray-200 truncate">{{ guest.email }}</td>
            <td class="py-4 px-6 border-b border-gray-200">{{ guest.date_of_birth }}</td>
            <td class="py-4 px-6 border-b border-gray-200">{{ guest.id_card_number }}</td>
            <td class="py-4 px-6 border-b border-gray-200">
              <button @click="handleDeleteGuest(guest.id)" class="bg-red-400 p-2 rounded-lg">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tombol Logout -->
    <!-- <button @click="handleLogout">Logout</button> -->

    <FooterComponent />
  </div>
</template>
