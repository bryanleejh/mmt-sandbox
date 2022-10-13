import { DisplayType } from './enums';

export interface ZoneSelectorProps {
  selectedValues: FormAreaState[];
  onSelectValues: (values: { isAllCitiesSelected: boolean; formState: FormAreaState[] }) => void;
  hasZones?: boolean;
  disabled?: boolean;
  overrideLoadCities?: () => Promise<City[]>;
  overrideLoadAreas?: (selectedCity: string) => Promise<QueryResponse[]>;
}

export interface IZoneContext {
  formDisplayState: {
    [DisplayType.CITY]: DisplayState[];
    [DisplayType.REGION]: DisplayState[];
    [DisplayType.DISTRICT]: DisplayState[];
    selectedCity?: string;
    selectedRegion?: string;
  };
  formDisplayData: {
    [DisplayType.CITY]: City[];
    [DisplayType.REGION]: Zone[];
    [DisplayType.DISTRICT]: Zone[];
  };
  formUpdate: {
    [DisplayType.CITY]: {
      onUpdateAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onUpdate: (e: React.ChangeEvent<HTMLInputElement>, item: City) => void;
      onSelect: (city: City) => void;
    };
    [DisplayType.REGION]: {
      onUpdateAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onUpdate: (e: React.ChangeEvent<HTMLInputElement>, item: Zone) => void;
      onSelect: (region: Zone) => void;
    };
    [DisplayType.DISTRICT]: {
      onUpdateAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onUpdate: (e: React.ChangeEvent<HTMLInputElement>, item: Zone) => void;
      onSelect: (id: string) => void;
    };
  };
  disabled: boolean;
}

export interface ZonePanelProps {
  displayType: DisplayType;
  itemData: City[] | Zone[];
  fluid?: boolean;
  renderFilter?: React.ReactNode;
}

export interface QueryResponse {
  region: Zone;
  districts: Zone[];
}

export interface Zone {
  id: string;
  name: string;
}

export interface City extends Zone {
  slug: string;
}

export interface ApiDisplayData {
  cities: City[];
  regions: Zone[];
  districts: Zone[];
}

export interface DisplayState {
  id: string;
  indeterminate: boolean;
}

export interface FormDisplayState {
  cities: DisplayState[];
  regions: DisplayState[];
  districts: DisplayState[];
  selectedCity?: string;
}

export interface FormAreaState {
  city: string;
  regions?: FormRegionState[];
}

export interface FormRegionState {
  region: string;
  districts?: string[];
}

export interface UIState extends FormDisplayState {
  isLoading: boolean;
  totalRegions: number;
  totalDistricts: number;
  selectedCity?: string;
  selectedRegion?: string;
}
