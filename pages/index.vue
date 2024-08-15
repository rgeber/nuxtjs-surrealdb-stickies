<template>
  <main>

    <section v-if="!auth.initialized" class="flex items-center justify-center pt-32 pb-12">
      <icon name="line-md:loading-twotone-loop" class="text-7xl text-emerald-500"/>
    </section>

    <section v-show="auth.initialized && !auth.authenticated" title="login" class="flex flex-col md:flex-row md:mt-8 md:gap-4">
      <auth-login class="md:w-1/2 mx-auto bg-amber-200 p-5 rounded-3xl shadow-xl"/>
      <auth-signup class="md:w-1/2 mx-auto bg-emerald-200 p-5 rounded-3xl shadow-xl"/>
    </section>
    <section v-show="auth.initialized && auth.authenticated">
      <auth-logout-button/>
    </section>
  </main>
</template>

<script setup>
const auth = useAuth()
</script>
