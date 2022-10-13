// Rules
export enum Condition {
  SCREEN = "screen_type",
  PLACEMENT = "placement_type",
}

// Inventory Targeting options
export enum SCREEN {
  OTP = "OTP",
  RLP = "RLP",
  Homescreen = "Homescreen",
}

export enum PLACEMENT {
  CAROUSEL = "carousel",
}

export const INVENTORY_TARGETING_CONDITIONS = [
  Condition.SCREEN,
  Condition.PLACEMENT,
];
