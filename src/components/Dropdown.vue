<template>
  <div class="dropdown-filter">
    <div class="dropdown-label px-5 py-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" @click="isOpen=true">
      <label>
        {{ label }}
      </label>
      <ChevronDown />
    </div>
    <div class="dropdown-content" :class="{['open']: isOpen }">
      <div class="dropdown-search">
        <input v-model="searchInput" />
      </div>
      <ul class="dropdown-list">
        <li 
          v-for="option in filteredOptions"
          :key="option.name"
          :class="{['active-item']: selectedOptions.includes(option.value)}"
          @click="$emit('onSelect', option.value)"
        >
          {{ option.name }}
        </li>
      </ul>
      <div class="dropdown-action">
        <button>Reset</button>
        <button>Apply</button>
      </div> 
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { IOption } from '@/types/filter';
  import { ChevronDown } from 'lucide-vue-next';
  import { computed, ref, type ComputedRef, useTemplateRef } from 'vue';
  import { onClickOutside } from '@vueuse/core'

  const props = defineProps<{
    label: string,
    options: IOption[],
    selectedOptions: string[]
  }>()

  const emits = defineEmits<{
    (e: 'onSelect', value: string):void
  }>()
  const searchInput = ref<string>('')
  const filteredOptions: ComputedRef<IOption[]> = computed(() => {
    if (searchInput.value.trim().length === 0) {
      return props.options
    }
    const regex = new RegExp(`/${searchInput.value.trim()}/i`)
    return props.options.filter((item) => regex.test(item.name));
  })

  const target = useTemplateRef<HTMLElement>('target')
  const isOpen = ref<boolean>(false)
  onClickOutside(target, event => isOpen.value = false);

</script>

<style lang="scss" scoped>
  .dropdown-label {
    height: 40px;
    border-radius: 30px;
    padding: 8px 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    z-index: 15;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: visibility 0ms .4s, opacity .2s, transform .2s;
    transform: translate3d(0, -15px, 0);

    .open {
      opacity: 1;
      visibility: visible;
      pointer-events: all;
      z-index: 1000;
      transform: translateZ(0);
      transition: opacity .3s, transform .3s;
    }
  }

  .dropdown-filter {
    flex-basis: 150px;
  }
</style>