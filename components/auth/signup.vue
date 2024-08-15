<template>
  <div class="flex flex-col mt-12 justify-between">
    <div class="flex flex-col gap-3">
      <h3 class="px-3 pb-3 text-neutral-500">
        New here?
        <span class="text-3xl block text-slate-800">Sign up :)</span>
      </h3>
      <input type="text" placeholder="Your name" v-model="name">
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password" v-model="password">
    </div>

    <button class="mt-5" @click="executeSignup">
      Signup
    </button>
  </div>
</template>

<script setup>
import Surreal from "surrealdb.js";

const name = ref('roman')
const username = ref('admin')
const password = ref('123')

const executeSignup = async () => {
  console.debug('Signing up')

  const db = new Surreal()


  // Connect to the database
  await db.connect("http://localhost:3001/rpc")
  await db.use({namespace: 'test', database: 'test'})

  try {
    const token = await db.signup({
      namespace: 'test',
      database: 'test',
      scope: 'user',
      name: name.value,
      username: username.value,
      password: password.value
    })

    console.debug('Token received', token)
  } catch (e) {
    console.error(e)
  }


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