<template>
  <div class="bg-amber-200 p-3 rounded-2xl h-64">
    <div class="flex justify-between">
      <div>
        <template v-if="true">No tags ...</template>
        <template v-else>TAGS!</template>
      </div>
      <div>
        <icon name="line-md:menu-to-close-alt-transition" @click="stickies.remove(index)"/>
      </div>
    </div>
    <textarea v-model="stickyContent" @change="stickies.update(index, stickyContent)"
              class="w-full h-52 bg-transparent p-2 text-lg font-serif" placeholder="Your note ..."></textarea>
  </div>
</template>

<script setup>
import {useStickies} from "~/stores/stickies.js";

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const stickies = useStickies()
const stickyContent = ref(props.data.content)
</script>
