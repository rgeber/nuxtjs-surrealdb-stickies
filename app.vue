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
const stickies = useStickies()

onBeforeMount(async () => {
  await surreal.connect()
  auth.setDb(surreal.db)
  stickies.setDb(surreal.db)
  await auth.init()
  await stickies.init()
})


</script>