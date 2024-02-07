<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  width: 1.2rem;
  height: 1.2rem;
  border: 0.1rem solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 700px) {
  .loader {
    width: 14px;
    height: 14px;
  }
}
</style>
