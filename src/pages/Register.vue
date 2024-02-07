<script setup lang="ts">
import Loader from '../components/Loader.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-[70%] mx-auto flex flex-col items-center gap-4">
      <img src="/logo.png" class="w-[50px] h-[50px] mb-5" />
      <form @submit.prevent class="w-full flex flex-col gap-6">
        <div class="form-box">
          <label for="email" name="email">Email</label>
          <input type="email" placeholder="Email" />
        </div>
        <div class="form-box">
          <label for="password" name="password">Password</label>
          <input type="password" placeholder="Password" />
        </div>
        <button
          type="submit"
          class="h-[40px] rounded-lg text-white bg-primary flex items-center justify-center gap-2"
        >
          <Loader />
          <span>Register</span>
        </button>
        <p class="text-md text-center text-white">
          Already have an account?
          <RouterLink to="/login" class="text-primary">Sign in</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
