<template>
  <main>
    <section v-show="!auth.authenticated" title="login" class="flex flex-col md:flex-row md:mt-8 md:gap-4">
      <auth-login class="md:w-1/2 mx-auto bg-amber-200 p-5 rounded-3xl shadow-xl"/>
      <auth-signup class="md:w-1/2 mx-auto bg-emerald-200 p-5 rounded-3xl shadow-xl"/>
    </section>
    <section v-show="auth.authenticated">
      <button @click="auth.signout()">Logout</button>
    </section>
  </main>
</template>

<script setup>
const auth = useAuth()
</script>
