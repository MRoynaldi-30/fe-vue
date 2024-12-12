<script setup>
import { ref, onMounted } from 'vue'
import { logout, showGuest, searchGuest } from '../services/authService'
// import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/headerComponent.vue';
import FooterComponent from '@/components/footerComponent.vue';
// import '../assets/style.css'

// const router = useRouter()
const token = localStorage.getItem('token')

const guests = ref([]) // Untuk menyimpan semua guests
// const newGuest = ref({
//   name: '',
//   email: '',
//   date_of_birth: '',
//   id_card_number: '',
// }) // Data untuk menambah guest
const searchQuery = ref('') 
const searchResults = ref([]) 

// Ambil semua guests saat halaman dimuat
onMounted(async () => {
  try {
    const response = await showGuest(token)
    guests.value = response.data.guests.data // Sesuaikan format data dari API Anda
  } catch (error) {
    console.error('Failed to fetch guests:', error.response.data.message)
    alert('Failed to fetch guests.')
  }
})

// Fungsi untuk mencari guest
const handleSearchGuest = async () => {
  try {
    const response = await searchGuest(searchQuery.value, token)
    searchResults.value = response.data.guests // Simpan hasil pencarian
  } catch (error) {
    console.error('Failed to search guest:', error.response.data.message)
    alert('No guests found with the given name.')
  }
}
</script>

<template>
  <div class="h-screen bg-gradient-to-br flex items-center flex-col w-full">
    <HeaderComponent />
    <!-- Form untuk Search Guest -->
    <div class="flex items-start flex-col w-full px-10 my-3">
      <form @submit.prevent="handleSearchGuest" class="flex gap-2">
        <input v-model="searchQuery" placeholder="Search by Name" required class="pl-2 outline-none border w-full rounded-lg py-2"/>
        <button class="bg-green-400 px-2 rounded-lg font-bold hover:bg-green-700 text-white" type="submit">Search</button>
        <p class="bg-green-400 px-2 rounded-lg font-bold hover:bg-green-700 text-white flex items-center"><router-link to="/add" class="text-blue-400 hover:text-blue-700 text-nowrap">Add Guest</router-link></p>
      </form>
      <ul>
        <li v-for="guest in searchResults" :key="guest.id">{{ guest.name }} - {{ guest.email }}</li>
      </ul>
    </div>

    <!-- Daftar Guests -->
    <div class="shadow-lg rounded-lg  mx-4 md:mx-10 flex-grow">
      <table class="w-full table-fixed">
        <thead>
          <tr class="bg-gray-100">
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Date of Birth
            </th>
            <th class="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              ID Card Number
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="guest in guests" :key="guest.id">
            <td class="py-4 px-6 border-b border-gray-200">{{ guest.name }}</td>
            <td class="py-4 px-6 border-b border-gray-200 truncate">{{ guest.email }}</td>
            <td class="py-4 px-6 border-b border-gray-200">{{ guest.date_of_birth }}</td>
            <td class="py-4 px-6 border-b border-gray-200">{{ guest.id_card_number }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tombol Logout -->
    <!-- <button @click="handleLogout">Logout</button> -->

    <FooterComponent/>
  </div>
</template>
