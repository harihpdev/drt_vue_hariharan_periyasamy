<template>
  <div class="search-wrapper w-full px-5 py-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100">
    <input v-model="input" type="text" class="placeholder-gray-400 focus:outline-none " placeholder="Search by Name/NORAD ID" @keyup.enter="$emit('change', input)">
    <div class="close-icon">
      <X v-show="isCloseVisible" @click="input = ''"/>
    </div>
    <div class="search-icon">
      <Search />
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { Search, X } from 'lucide-vue-next'
import { computed, ref } from 'vue';
  const input = ref('')
  const isCloseVisible = computed(() => input.value.trim().length !==0 )

  const handleInputChange = () => {
    
  }
</script>

<style lang="scss" scoped>
  .search-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    height: 40px;
    // background: rgb(0, 0, 0, 0.8);
    border-radius: 30px;
    max-width: 280px;
    min-width: 324px;

    input {
      outline: none !important;
      border: 0px;
      background: transparent;
      flex-grow: 1;
    }
  }
</style>
