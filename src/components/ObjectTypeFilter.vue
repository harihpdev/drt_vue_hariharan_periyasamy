<template>

  <div v-if="hasObjectTypes" class="object-type-wrapper flex flex-wrap gap-3 mb-4">
    <div
      class="object-type-item flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
      v-for="item in objectTypesList"
      :key="item.name"
      :class="{['active-object-type']: selectedItems.includes(item.name)}"
      @click="$emit('objectTypeSelect', item.name)"
    >
      {{ item.name }}
      <span class="text-sm">({{item.count}})</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { OBJECT_TYPE } from '@/enums/common';
  import type { IObjectTypeItem } from '@/types/objectType';
  import { computed } from 'vue';

  const props = defineProps<{
    objectTypesList: IObjectTypeItem[],
    selectedItems: OBJECT_TYPE[]
  }>()
  defineEmits<{
    (e: 'objectTypeSelect', objectType: OBJECT_TYPE): void
  }>()


  const hasObjectTypes = computed(() => props.objectTypesList.length !== 0);
</script>

<style lang="scss" scoped>
  .object-type-item {
    height: 40px;
    cursor: pointer;
    // padding: 8px 20px;
    // color: #fff;
  }

  .active-object-type {
    // border-radius: 20px;
    // border:  1px solid teal;
    background-color: var(--color-blue-600);
  }
</style>
