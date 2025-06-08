<template>
  <div class="home flex justify-center items-center">
    <div class="w-200">
      <RouterLink to="/asset/create">
        <button>Create Asset List</button>
      </RouterLink>
    </div>
    <div class="w-200">
      <RouterLink to="/asset/saved">
        <button>My Asset List</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
  .home {
    height: 100vh;
  }
</style>
