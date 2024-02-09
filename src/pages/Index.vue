<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/auth'
const { signOutUser } = useAuth()
import AddPasswordModal from '@/components/AddPasswordModal.vue'
import EditPasswordModal from '@/components/EditPasswordModal.vue'
const showAddPasswordModal = ref(false)
const showEditPasswordModal = ref(false)
</script>

<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <header class="flex items-center justify-center border-b border-[#f9f9f9]">
      <nav class="w-[90%] mx-auto flex items-center justify-between py-4">
        <img src="/logo.png" class="w-[30px] h-[30px]" />
        <p class="text-black text-lg font-semibold">Password Manager</p>
        <button aria-label="Logout button" @click="signOutUser">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: #979797; transform:; msfilter:"
            class="rotate-180"
          >
            <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
            <path
              d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
            ></path>
          </svg>
        </button>
      </nav>
    </header>
    <div class="w-[90%] mx-auto">
      <div class="flex items-center justify-between mt-3">
        <p class="text-base text-center text-black font-semibold">Saved Passwords</p>
        <button
          class="rounded-lg bg-primary text-white py-2 px-4"
          @click="showAddPasswordModal = !showAddPasswordModal"
        >
          Add new
        </button>
      </div>
      <div class="form-box my-4">
        <input type="text" id="search" name="search" placeholder="Search for a password" />
      </div>
    </div>
    <div class="overflow-y-auto h-[400px]">
      <div class="w-[90%] mx-auto flex flex-col gap-3">
        <div v-for="i in 20" :key="i" class="bg-[#f9f9f9] rounded-md p-4 text-black text-md">
          <div class="flex flex-col gap-3 text-black text-[15px] font-semibold">
            <p>https://linkedin.com</p>
            <div class="flex items-center justify-between gap-2">
              <p>*************</p>
              <div class="flex items-center gap-1">
                <button
                  class="cursor-pointer"
                  aria-label="Edit password"
                  @click="showEditPasswordModal = true"
                >
                  <img src="../assets/icons/edit.svg" class="w-[20px] h-[20px]" />
                </button>
                <button class="cursor-pointer" aria-label="Delete password">
                  <img src="../assets/icons/delete.svg" class="w-[20px] h-[20px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddPasswordModal v-show="showAddPasswordModal" @close="showAddPasswordModal = false" />
    <EditPasswordModal v-show="showEditPasswordModal" @close="showEditPasswordModal = false" />
  </div>
</template>
