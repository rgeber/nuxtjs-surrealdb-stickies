<template>
  <div class="grid grid-cols-2 gap-2">
    <stickies-sticky v-for="(stickyData, stickyIndex) in stickyList" :data="stickyData" :index="stickyIndex" :key="stickyData.id"/>
  </div>

  <button class="" @click="stickies.add()">add</button>

</template>

<script setup>

const {stickies: stickyList} = storeToRefs(useStickies())

const stickies = useStickies()

onBeforeMount(async () => {
  await stickies.load();
})

</script>
