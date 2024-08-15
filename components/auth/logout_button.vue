<template>
  <button @click="auth.signout()">Logout</button>
</template>

<script setup>
const auth = useAuth()
</script>

<style scoped>
button {
  @apply bg-emerald-400 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full shadow-lg;
}
</style>