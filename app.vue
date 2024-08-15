<template>
  <div>
    <NuxtRouteAnnouncer/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>

const surreal = useSurreal()
const auth = useAuth()

onBeforeMount(async () => {
  await surreal.connect()
  auth.setDb(surreal.db)
  await auth.init()
})


</script>