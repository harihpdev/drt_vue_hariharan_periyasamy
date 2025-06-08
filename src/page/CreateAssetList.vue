<template>
  <div class="asset-list">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 asset-list-title">Create My Asset list</h1>
      <object-type-filter
        :object-types-list="objectTypeList"
        :selected-items="selectedFilters.objectTypes"
        @object-type-select="handleObjectTypeChange"
      />
      <div class="filter-wrapper mb-8">
        <search-input />
        <div class="dropdown-filters">
          <dropdown
            v-for="item in filters"
            :key="item.key"
            :label="item.label"
            :options="item.options"
            :selected-options="selectedFilters[item.key]"
          />
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row gap-6">
        <div class="flex-1 overflow-x-auto">
          <div class="flex items-center mb-3">
            <input type="checkbox" class="mr-2 accent-blue-600">
            <label>Select all</label>
            <div v-if="!isFetching && data!== null" class="ml-auto text-sm text-gray-400">{{ data.data.length }} objects</div>
          </div>
          <table-list
            v-if="!isFetching && data!== null"
            :satellite-list="data.data"
            :selected-items="selectedSatellites"
            @on-row-select="handleRowSelection"
          />
        </div>
        <div class="w-full md:w-1/3 flex flex-col bg-gray-900 border border-blue-600 rounded-lg p-5 sticky top-8 h-fit max-h-[80vh]">
          <div class="flex items-center justify-between mb-5">
            <span class="text-blue-400 text-sm">{{ Object.values(selectedSatellites).length }} objects selected</span>
            <button class="text-gray-400 hover:text-gray-200 text-sm">Clean all ✕</button>
          </div>

          <div class="flex-1 space-y-3 overflow-y-auto mb-4">
            <!-- Example selected asset -->
              <div
                v-for="[key, item] in selectedSatellites"
                :key="key"
                class="flex items-center justify-between p-3 rounded bg-gray-800 border border-gray-700 text-sm"
              >
                <span>{{ item.noradCatId }} {{ item.name }}</span>
                <button class="text-gray-400 hover:text-gray-200" @click="handleRowSelection(item)">✕</button>
              </div>
            <!-- More selected assets -->
          </div>

          <!-- Proceed button -->
          <button class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">
            PROCEED
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ObjectTypeFilter from '@/components/ObjectTypeFilter.vue';
import TableList from '@/components/TableList.vue';
import { OBJECT_TYPE, ORBIT_TYPES } from '@/enums/common';
import { useObjectTypeCountStore } from '@/stores/objectTypeCount';
import type { IObjectTypeItem } from '@/types/objectType';
import { useCloned, useFetch } from '@vueuse/core';
import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue';
import qs from 'qs';
import SearchInput from '@/components/SearchInput.vue';
import type { IDropdownProps, IFilter } from '@/types/filter';
import Dropdown from '@/components/Dropdown.vue';
import { ISatellite } from '@/types/satellite';

const objectTypeCount = useObjectTypeCountStore()

const objectTypeList: ComputedRef<IObjectTypeItem[]> = computed(() => {
  return Object.values(OBJECT_TYPE).map((key: OBJECT_TYPE) => {
    return {
      name: key,
      count: objectTypeCount.objectCount[key]
    } as IObjectTypeItem
  }) 
});

const handleObjectTypeChange = (objectType: OBJECT_TYPE) => {
  if (selectedFilters.value.objectTypes.includes(objectType)) {
    // remove if already exist
    selectedFilters.value.objectTypes = selectedFilters.value.objectTypes.filter((item) => item !== objectType);
    if (selectedFilters.value.objectTypes.length === 0) {
      selectedFilters.value.objectTypes = [ OBJECT_TYPE.ALL ]
    } 
    return;
  }
  
  if (OBJECT_TYPE.ALL === objectType) {
    selectedFilters.value.objectTypes = [ OBJECT_TYPE.ALL ]
    return;
  }
    
  selectedFilters.value.objectTypes = [objectType, ...selectedFilters.value.objectTypes].filter((item) => item !== OBJECT_TYPE.ALL);  
}
const selectedSatellites = reactive(new Map());

const url = ref('https://backend.digantara.dev/v1/satellites')

const attributes = ['noradCatId', 'intlDes', 'name', 'launchDate', 'decayDate', 'objectType', 'launchSiteCode', 'countryCode','orbitCode']

const { isFetching, error, data } = useFetch(url.value  + '?' + qs.stringify({ attributes: attributes.join(',') })).get().json()

const selectedFilters: Ref<IFilter> = ref({
  objectTypes: [OBJECT_TYPE.ALL],
  orbitCodes: [],
  countryCode: [],
});

const filters: IDropdownProps[]  = [
  { label: 'Regime', key: 'orbitCodes', options:  Object.values(ORBIT_TYPES).map((val) => ({ name: val, value: val }))},
  { label: 'Country', key: 'countryCode', options: [{name: 'US', value: 'America' }]},
]

const handleRowSelection = (satellite: ISatellite) => {
  const key = satellite.noradCatId as string
  if (selectedSatellites.size === 10) {
    alert('You can only select 10 Items')
    return;
  }
  if (selectedSatellites.has(satellite.noradCatId)) {
    selectedSatellites.delete(satellite.noradCatId)
    return
  }
  selectedSatellites.set(key, satellite)
}

</script>

<style lang="scss" scoped>
  .filter-wrapper {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
  }

  .dropdown-filters {
    display: flex;
    gap: 16px;
    flex-grow: 1;
  }
</style>