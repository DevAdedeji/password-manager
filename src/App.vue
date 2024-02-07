<script setup lang="ts">
import { RouterView } from 'vue-router'
import Notification from './components/Notification.vue'
import { useNotification } from './composables/notification'
const { showNotification, notMsg, notType } = useNotification()
</script>

<template>
  <main class="w-[350px] h-[600px] bg-[#2B2C37] relative">
    <Notification v-if="showNotification" :message="notMsg" :type="notType" />
    <RouterView />
  </main>
</template>
