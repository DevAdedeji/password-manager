<template>
  <dialog open class="flex items-center justify-center w-full h-full">
    <form class="w-[90%] mx-auto bg-white flex flex-col gap-4 rounded-md p-4" @submit.prevent>
      <p class="text-lg text-center text-black font-semibold">Add new password</p>
      <div class="form-box">
        <label for="site" name="site">Site url</label>
        <input type="site" placeholder="site url" required />
      </div>
      <div class="form-box">
        <label for="password" name="password">Password</label>
        <input type="password" placeholder="Password" required />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="bg-[#979797] text-white py-2 px-4 rounded-md"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button type="submit" class="bg-primary text-white py-2 px-4 rounded-md">Save</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  background: rgba(0, 0, 0, 0.5);
}
</style>
