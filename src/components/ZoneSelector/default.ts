/* eslint-disable @typescript-eslint/no-empty-function */
import { DisplayType } from './enums';

export const defaultZoneContext = {
  formDisplayState: {
    [DisplayType.CITY]: [],
    [DisplayType.REGION]: [],
    [DisplayType.DISTRICT]: [],
  },
  formDisplayData: {
    [DisplayType.CITY]: [],
    [DisplayType.REGION]: [],
    [DisplayType.DISTRICT]: [],
  },
  formUpdate: {
    [DisplayType.CITY]: {
      onUpdateAll: () => {},
      onUpdate: () => {},
      onSelect: () => {},
    },
    [DisplayType.REGION]: {
      onUpdateAll: () => {},
      onUpdate: () => {},
      onSelect: () => {},
    },
    [DisplayType.DISTRICT]: {
      onUpdateAll: () => {},
      onUpdate: () => {},
      onSelect: () => {},
    },
  },
  disabled: false,
};
