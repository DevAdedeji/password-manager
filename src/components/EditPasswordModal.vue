<script setup lang="ts">
import Loader from './Loader.vue'
import { type PasswordEntity } from '@/services/password/types'
import { defineProps, onMounted, type PropType, defineEmits, watch } from 'vue'
import { usePassword } from '@/composables/passwords'
import { useEncryption } from '@/composables/encryption'

const props = defineProps({
  password: {
    type: (Object as PropType<PasswordEntity>) || null,
    required: true
  }
})
const emit = defineEmits(['close'])

const { form, editPassword, submit, editedSuccessfully } = usePassword()
const { decrypt } = useEncryption()

watch(editedSuccessfully, () => {
  if (editedSuccessfully) {
    emit('close')
  }
})

onMounted(() => {
  if (props.password) {
    form.value.site = props.password.site
    form.value.password = decrypt(props.password.password)
  }
})
</script>

<template>
  <dialog open class="flex items-center justify-center w-full h-full">
    <form
      class="w-[90%] mx-auto bg-white flex flex-col gap-4 rounded-md p-4"
      @submit.prevent="editPassword(password._id)"
    >
      <p class="text-lg text-center text-black font-semibold">Edit password</p>
      <div class="form-box">
        <label for="site" name="site">Site url</label>
        <input
          type="site"
          placeholder="site url"
          id="site"
          name="site"
          v-model="form.site"
          required
        />
      </div>
      <div class="form-box">
        <label for="password" name="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
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
