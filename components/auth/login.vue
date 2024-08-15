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

    <button class="mt-5 flex items-center justify-center min-h-8" @click="executeLogin">
      <icon v-if="auth.authInProgress" name="line-md:loading-twotone-loop" />
      <template v-else>Login</template>
    </button>
  </div>
</template>

<script setup>
const username = ref('admin')
const password = ref('123')

const auth = useAuth()

const executeLogin = async () => {
  console.debug('Logging in')

  auth.signin('user', username.value, password.value)
}

</script>

<style scoped>
input {
  @apply bg-white border rounded-full px-5 text-neutral-700 py-2
}

button {
  @apply bg-blue-400 hover:bg-blue-700 text-white py-1 text-center rounded-full w-full mt-2
}
</style>