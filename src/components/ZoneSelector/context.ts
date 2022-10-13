/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { DisplayType } from './enums';
import { IZoneContext } from './types';

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

export const ZoneContext = React.createContext<IZoneContext>(defaultZoneContext);

export const defaultZonePanelContext = {
  displayType: 'cities' as DisplayType,
};

export const ZonePanelContext = React.createContext(defaultZonePanelContext);
