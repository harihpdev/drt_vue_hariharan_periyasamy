import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IObjectCount } from '@/types/objectType'
import { OBJECT_TYPE } from '@/enums/common'


const DEFAULT_OBJECT_COUNT: IObjectCount = { 
  [OBJECT_TYPE.ALL]: 27893,
  [OBJECT_TYPE.PAYLOAD]: 13997,
  [OBJECT_TYPE.ROCKET_BODY]: 2167,
  [OBJECT_TYPE.UNKNOWN]: 559,
  [OBJECT_TYPE.DEBRIS]: 10595
}

export const useObjectTypeCountStore = defineStore('objectTypeCount', () => {
  const objectCount = ref<IObjectCount>(DEFAULT_OBJECT_COUNT)

  // TODO Check if we can compute count data or fetch from different api
  const updateObjectTypeCount = (objectTypeCount: IObjectCount) => {
    objectCount.value = objectTypeCount;
  }
  
  return { objectCount, updateObjectTypeCount }
})
