<script setup>
import { ref, onMounted } from 'vue'
import { logout, showGuest, addGuest, searchGuest } from '../services/authService'
import { useRouter } from 'vue-router'
// import '../assets/style.css'

const router = useRouter()
const token = localStorage.getItem('token')

const guests = ref([]) // Untuk menyimpan semua guests
const newGuest = ref({
  name: '',
  email: '',
  date_of_birth: '',
  id_card_number: '',
}) // Data untuk menambah guest
const searchQuery = ref('') // Query untuk mencari guest
const searchResults = ref([]) // Hasil pencarian guest

// Ambil semua guests saat halaman dimuat
onMounted(async () => {
  try {
    const response = await showGuest(token)
    guests.value = response.data.guests // Sesuaikan format data dari API Anda
  } catch (error) {
    console.error('Failed to fetch guests:', error.response.data.message)
    alert('Failed to fetch guests.')
  }
})

// Fungsi untuk menambah guest
const handleAddGuest = async () => {
  try {
    await addGuest(newGuest.value, token); // Tambah guest baru
    alert('Guest added successfully!');

    // Refresh data tamu
    const response = await showGuest(token); 
    guests.value = response.data.guests;

    // Reset form
    newGuest.value = { name: '', email: '', date_of_birth: '', id_card_number: '' };
  } catch (error) {
    console.error('Failed to add guest:', error.response?.data?.message || error.message);
    alert('Failed to add guest.');
  }
}

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

// Fungsi untuk logout
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
  <div class="home-container">
    <h1>Welcome to Home</h1>

    <!-- Form untuk Menambah Guest -->
    <div>
      <h2>Add Guest</h2>
      <form @submit.prevent="handleAddGuest">
        <input v-model="newGuest.name" placeholder="Name" required />
        <input v-model="newGuest.email" placeholder="Email" type="email" required />
        <input v-model="newGuest.date_of_birth" placeholder="Date of Birth" type="date" required />
        <input
          v-model="newGuest.id_card_number"
          placeholder="ID Card Number"
          type="number"
          required
        />
        <button type="submit">Add Guest</button>
      </form>
    </div>

    <!-- Form untuk Search Guest -->
    <div>
      <h2>Search Guest</h2>
      <form @submit.prevent="handleSearchGuest">
        <input v-model="searchQuery" placeholder="Search by Name" required />
        <button type="submit">Search</button>
      </form>
      <ul>
        <li v-for="guest in searchResults" :key="guest.id">{{ guest.name }} - {{ guest.email }}</li>
      </ul>
    </div>

    <!-- Daftar Guests -->
    <div>
      <h2>All Guests</h2>
      <ul>
        <li v-for="guest in guests" :key="guest.id">{{ guest.name }} - {{ guest.email }}</li>
      </ul>
    </div>

    <!-- Tombol Logout -->
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<!-- <style scoped>
/* Tambahkan styling Anda di sini */
</style> -->
