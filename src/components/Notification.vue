<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'success'
  },
  message: {
    type: String,
    required: true,
    default: ''
  }
})
const bgColor = computed(() => {
  if (props.type === 'success') {
    return 'bg-green-500'
  }
  if (props.type === 'error') {
    return 'bg-red-500'
  }
  return 'bg-yellow-500'
})
</script>

<template>
  <div
    class="absolute top-0 right-0 left-0 w-full h-10 p-2 text-center z-[999999999]"
    :class="bgColor"
  >
    <p class="text-white text-md">{{ message }}</p>
  </div>
</template>
