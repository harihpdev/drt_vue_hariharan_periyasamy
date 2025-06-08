import type { OBJECT_TYPE, ORBIT_TYPES } from "@/enums/common";

export interface IFilter {
  objectTypes: OBJECT_TYPE[]
  orbitCodes: ORBIT_TYPES[]
  countryCode: string[]
}

export interface IOption {
  name: string,
  value: string
}

export interface IDropdownProps {
  key: keyof IFilter,
  label: string,
  options: IOption[]
}