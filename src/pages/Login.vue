<script setup lang="ts">
import Loader from '../components/Loader.vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composables/auth'
const { form, loginUser, submit } = useAuth()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-[80%] mx-auto flex flex-col items-center gap-4">
      <img src="/logo.png" class="w-[50px] h-[50px] mb-5" />
      <form @submit.prevent="loginUser" class="w-full flex flex-col gap-6">
        <h1 class="text-primary text-xl text-center font-semibold">Login</h1>
        <div class="form-box">
          <label for="email" name="email">Email</label>
          <input type="email" placeholder="Email" v-model="form.email" required />
        </div>
        <div class="form-box">
          <label for="password" name="password">Password</label>
          <input type="password" placeholder="Password" v-model="form.password" required />
        </div>
        <button
          type="submit"
          :disabled="submit"
          class="h-[40px] rounded-lg text-white bg-primary flex items-center justify-center gap-2"
          :class="submit ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <Loader v-if="submit" />
          <span>Login</span>
        </button>
        <p class="text-md text-center text-black">
          Don't have an account?
          <RouterLink to="/register" class="text-primary">Sign up</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>
