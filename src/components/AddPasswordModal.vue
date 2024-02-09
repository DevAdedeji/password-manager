<script setup lang="ts">
import { watch, defineEmits } from 'vue'
import { usePassword } from '@/composables/passwords'
import Loader from './Loader.vue'
const { form, addPassword, submit, addedSuccessfully } = usePassword()
const emit = defineEmits(['close'])
watch(addedSuccessfully, () => {
  if (addedSuccessfully) {
    emit('close')
  }
})
</script>

<template>
  <dialog open class="flex items-center justify-center w-full h-full">
    <form
      method="dialog"
      class="w-[90%] mx-auto bg-white flex flex-col gap-4 rounded-md p-4"
      @submit.prevent="addPassword"
    >
      <p class="text-lg text-center text-black font-semibold">Add new password</p>
      <div class="form-box">
        <label for="site" name="site">Site url</label>
        <input
          type="site"
          id="site"
          name="site"
          placeholder="Site url"
          v-model="form.site"
          required
        />
      </div>
      <div class="form-box">
        <label for="password" name="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          v-model="form.password"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="bg-[#979797] text-white py-2 px-4 rounded-md"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="submit"
          class="bg-primary text-white py-2 px-4 rounded-md flex items-center gap-1"
          :class="submit ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <Loader v-if="submit" />
          <span>Save</span>
        </button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  background: rgba(0, 0, 0, 0.5);
}
</style>
