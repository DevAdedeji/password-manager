<script setup lang="ts">
import AddPasswordModal from '@/components/AddPasswordModal.vue'
import EditPasswordModal from '@/components/EditPasswordModal.vue'
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/auth'
import { usePassword } from '@/composables/passwords'
import { useEncryption } from '@/composables/encryption'
import { useNotification } from '@/composables/notification'
import type { PasswordEntity } from '@/services/password/types'

const { signOutUser } = useAuth()
const { fetchPasswords, fetching, passwords, deletePassword } = usePassword()

const showAddPasswordModal = ref(false)

const searchQuery = ref('')
const filteredPasswords = computed(() => {
  if (!searchQuery.value) return passwords.value
  return passwords.value.filter((p) => p.site.includes(searchQuery.value))
})

const currentPassword = ref<PasswordEntity | null>(null)
const showEditPasswordModal = ref(false)
const openEditModal = (password: PasswordEntity) => {
  currentPassword.value = password
  showEditPasswordModal.value = true
}

const { decrypt } = useEncryption()
const { handleNotification } = useNotification()
const copyPasswordToClipboard = (password: PasswordEntity) => {
  const passwordToCopy = decrypt(password.password)
  navigator.clipboard.writeText(passwordToCopy).then(() => {
    handleNotification({ msg: 'Password copied to clipboard', type: 'success' })
  })
}

fetchPasswords()
</script>

<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <header class="flex items-center justify-center border-b border-[#e9e9e9]">
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
      <div class="flex items-center justify-between mt-5">
        <p class="text-base text-center text-black font-semibold">Saved Passwords</p>
        <button
          class="rounded-lg bg-primary text-white py-2 px-4"
          @click="showAddPasswordModal = !showAddPasswordModal"
        >
          Add new
        </button>
      </div>
      <div class="form-box my-5">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for a password"
          v-model="searchQuery"
        />
      </div>
    </div>
    <div class="overflow-y-auto h-[400px]">
      <div v-if="fetching" class="w-full h-full flex items-center justify-center">
        <p class="text-base font-semibold">Fetching your passwords...</p>
      </div>
      <div v-if="!fetching && passwords.length" class="w-[90%] mx-auto flex flex-col gap-3">
        <div
          v-for="password in filteredPasswords"
          :key="password._id"
          class="bg-[#f9f9f9] rounded-md p-4 text-black text-md"
        >
          <div class="flex flex-col gap-4 text-black text-[15px] font-semibold">
            <div class="flex flex-col gap-1">
              <div class="flex items-center justify-between">
                <p class="text-sm text-black font-medium">Site url:</p>
                <button
                  class="ml-auto cursor-pointer"
                  aria-label="Copy password to clipboard"
                  @click="copyPasswordToClipboard(password)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style="fill: rgba(0, 0, 0, 0.49); transform:; msfilter:"
                  >
                    <path
                      d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"
                    ></path>
                  </svg>
                </button>
              </div>
              <p class="font-semibold">{{ password.site }}</p>
            </div>
            <div class="flex items-center justify-between gap-2">
              <div class="flex flex-col gap-1">
                <p class="text-sm text-black font-medium">Password:</p>
                <p class="font-semibold">{{ '**********' }}</p>
              </div>
              <div class="flex items-center gap-1">
                <button
                  class="cursor-pointer"
                  aria-label="Edit password"
                  @click="openEditModal(password)"
                >
                  <img src="../assets/icons/edit.svg" class="w-[20px] h-[20px]" />
                </button>
                <button
                  class="cursor-pointer"
                  aria-label="Delete password"
                  @click="deletePassword(password._id)"
                >
                  <img src="../assets/icons/delete.svg" class="w-[20px] h-[20px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!fetching && !passwords.length"
        class="w-full h-full flex flex-col gap-2 items-center justify-center border border-[#e9e9e9] rounded-md"
      >
        <img src="../assets/no_data.png" class="w-[100px] h-[100px]" />
        <p class="text-base font-semibold">Nothing to show</p>
      </div>
    </div>
    <AddPasswordModal v-if="showAddPasswordModal" @close="showAddPasswordModal = false" />
    <EditPasswordModal
      v-if="showEditPasswordModal && currentPassword"
      @close="showEditPasswordModal = false"
      :password="currentPassword"
    />
  </div>
</template>
