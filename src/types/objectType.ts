import type { OBJECT_TYPE, ORBIT_TYPES } from "@/enums/common";

export interface IObjectTypeItem {
  name: OBJECT_TYPE,
  count: number,
  isActive: boolean
}

export interface IObjectCount {
  [OBJECT_TYPE.PAYLOAD]: number
  [OBJECT_TYPE.ROCKET_BODY]: number
  [OBJECT_TYPE.UNKNOWN]: number
  [OBJECT_TYPE.DEBRIS]: number
  [OBJECT_TYPE.ALL]: number
}
