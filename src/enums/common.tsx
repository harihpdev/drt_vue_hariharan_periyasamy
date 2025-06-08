export const OBJECT_FIELDS = {
  NORAD_CAT_ID: 'noradCatId',
  INTL_DES: 'intlDes',
  NAME: 'name',
  LAUNCH_DATE: 'launchDate',
  DECAY_DATE: 'decayDate',
  OBJECT_TYPE: 'objectType',
  LAUNCH_SITE_CODE: 'launchSiteCode',
  COUNTRY_CODE: 'countryCode',
  ORBIT_CODE: 'orbitCode'
} as const;

export type OBJECT_FIELDS = typeof OBJECT_FIELDS[keyof typeof OBJECT_FIELDS];

export const OBJECT_TYPE = {
  ALL: 'All Objects',
  ROCKET_BODY: "ROCKET BODY",
  DEBRIS: "DEBRIS",
  UNKNOWN: "UNKNOWN",
  PAYLOAD: "PAYLOAD"
} as const;

export type OBJECT_TYPE = typeof OBJECT_TYPE[keyof typeof OBJECT_TYPE];

export const ORBIT_TYPES = {
  LEO: "LEO",
  LEO1: "LEO1",
  LEO2: "LEO2",
  LEO3: "LEO3",
  LEO4: "LEO4",
  MEO: "MEO",
  GEO: "GEO",
  HEO: "HEO",
  IGO: "IGO",
  EGO: "EGO",
  NSO: "NSO",
  GTO: "GTO",
  GHO: "GHO",
  HAO: "HAO",
  MGO: "MGO",
  LMO: "LMO",
  UFO: "UFO",
  ESO: "ESO",
  UNKNOWN: "UNKNOWN"
} as const;

export type ORBIT_TYPES = typeof ORBIT_TYPES[keyof typeof ORBIT_TYPES];
