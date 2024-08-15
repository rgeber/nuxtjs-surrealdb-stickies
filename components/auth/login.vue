<template>
  <div class="flex flex-col mt-12 justify-between">
    <div class="flex flex-col gap-3">
      <h3 class="px-3 pb-3 text-neutral-500">
        Got an account?
        <span class="text-3xl block text-slate-800">Login!</span>
      </h3>
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password" v-model="password">
    </div>

    <button class="mt-5" @click="executeLogin">
      Login
    </button>
  </div>
</template>

<script setup>

const username = ref(null)
const password = ref(null)

const executeLogin = () => {
  console.debug('Logging in')
}

</script>

<style>
input {
  @apply bg-white border rounded-full px-5 text-neutral-700 py-2
}

button {
  @apply bg-blue-400 hover:bg-blue-700 text-white py-1 text-center rounded-full w-full mt-2
}
</style>