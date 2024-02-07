<script setup lang="ts">
import { useAuth } from '@/composables/auth'
const { signOutUser } = useAuth()
</script>

<template>
  <div class="w-full h-full flex flex-col items-center text-white justify-center">
    <h1 class="text-white text-md">Home</h1>
    <button @click="signOutUser" class="text-md">Logout</button>
  </div>
</template>
