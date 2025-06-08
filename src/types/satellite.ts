import type { OBJECT_TYPE, ORBIT_TYPES } from "@/enums/common";

export interface ISatellite {
  noradCatId: string;
  intlDes: string;
  name: string;
  launchDate: string;
  decayDate: string | null;
  objectType: OBJECT_TYPE;
  launchSiteCode: string;
  countryCode: string;
  orbitCode: ORBIT_TYPES;
}