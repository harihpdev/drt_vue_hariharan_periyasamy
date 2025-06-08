<template>
  <div class="satellite-list">
    <div v-bind="containerProps" class="table-wrapper" :style="`height: ${height - 320}px`">
      <div v-bind="wrapperProps">
        <div class="flex bg-gray-900 text-gray-400 font-semibold sticky top-0 z-10">
          <div class="w-6/100 p-3">#</div>
          <div class="w-1/100 p-3">NORAD ID</div>
          <div class="w-34/100 p-3">Name</div>
          <div class="w-20/100 p-3">COSPAR ID</div>
          <div class="w-10/100 p-3">Regime</div>
          <div class="w-10/100 p-3">Country</div>
          <div class="w-10/100 p-3">&nbsp;</div>
        </div>
        <div v-for="{index, data} in list" :key="index" class="flexItem">
          <div class="w-6/100 p-3">
            <input type="checkbox" :checked="selectedItems.has(data.noradCatId)" :value="data.name" class="accent-blue-600" @click="$emit('onRowSelect', data)">
          </div>
          <div class="w-10/100 p-3">{{ data.noradCatId }}</div>
          <div class="w-34/100 p-3">{{ data.name }}</div>
          <div class="w-20/100 p-3">{{ data.intlDes }}</div>
          <div class="w-10/100 p-3">{{ data.orbitCode}}</div>
          <div class="w-10/100 p-3">{{ data.countryCode }}</div>
          <div class="w-10/100 p-3">*</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { OBJECT_TYPE } from '@/enums/common';
  import type { ISatellite } from '@/types/satellite';
  import { useWindowSize, useVirtualList } from '@vueuse/core';
  import { computed, type ComputedRef } from 'vue';

  const props = defineProps<{
    satelliteList: ISatellite[],
    selectedItems: Map<string, ISatellite>
  }>()
  const emit = defineEmits<{
    (e: 'onRowSelect', val: ISatellite): void
  }>()
  const hasData: ComputedRef<boolean> = computed(() => props.satelliteList.length > 0)
  const { height } = useWindowSize();
  const { list, containerProps, wrapperProps } = useVirtualList(props.satelliteList.slice(0, 200), { itemHeight: 48, overscan: 10, })
</script>
<style lang="scss" scoped>
  .table {
    height: 100vh;
  }

  .flexItem {
    display: flex;
    gap: 10px;
  }
</style>