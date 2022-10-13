import React, { useState, useEffect } from 'react';
import { isEmpty, map, filter, equals, length, clone, find, propEq, reject } from 'ramda';
import './ZoneSelector.scss';
import { Skeleton } from '@deliveryhero/armor';
import {
  Zone,
  City,
  ApiDisplayData,
  FormDisplayState,
  DisplayState,
  IZoneContext,
  ZoneSelectorProps,
  QueryResponse,
} from './types';
import { hasIndeterState, transformStateToUI, transformUIToState, updateIndeterState } from './helper';
import ZonePanel from './ZonePanel';
import { defaultZoneContext } from './default';
import { DisplayType } from './enums';
import { ApolloProvider, useLazyQuery } from '@apollo/react-hooks';
import { Country, getActiveCountry } from '../../utils/country';
import { GET_AREAS_QUERY, GET_CITIES_V2_QUERY } from '../../graphql/queries';
import { createApolloClient } from '../../graphql/client';

export const ZoneContext = React.createContext<IZoneContext>(defaultZoneContext);

const ZoneSelector: React.FC<ZoneSelectorProps> = ({
  selectedValues,
  onSelectValues,
  hasZones = false,
  disabled = false,
  overrideLoadCities,
  overrideLoadAreas,
}: ZoneSelectorProps) => {
  const [apiDisplayData, setApiDisplayData] = useState<ApiDisplayData>({
    cities: [],
    regions: [],
    districts: [],
  });
  const [formDisplayState, setFormDisplayState] = useState<FormDisplayState>({
    cities: [],
    regions: [],
    districts: [],
  });
  const [initialLoad, setInitialLoad] = useState(true);
  const [rawApiData, setRawApiData] = useState<QueryResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const setCities = (citiesV2: City[]) => {
    setInitialLoad(false);
    if (isEmpty(apiDisplayData.cities)) {
      setApiDisplayData(state => ({
        ...state,
        cities: citiesV2,
      }));
    }
  };

  const setAreas = (areas: QueryResponse[]) => {
    setInitialLoad(false);
    if (!isEmpty(areas) && isEmpty(apiDisplayData.regions)) {
      setRawApiData(areas);
      const regions = map(area => area.region, areas);
      setApiDisplayData(state => ({
        ...state,
        regions,
      }));
    }
  };

  const [loadCities, { loading: cityLoading }] = useLazyQuery<{ citiesV2: City[] }, { country: Country }>(
    GET_CITIES_V2_QUERY,
    {
      variables: {
        country: getActiveCountry(),
      },
      onCompleted: ({ citiesV2 }) => {
        setCities(citiesV2);
      },
    }
  );

  const [loadAreas, { loading: areaLoading }] = useLazyQuery<
    { areas: QueryResponse[] },
    { country: Country; city: string }
  >(GET_AREAS_QUERY, {
    variables: {
      country: getActiveCountry(),
      city: selectedCity,
    },
    onCompleted: ({ areas }) => {
      setAreas(areas);
    },
  });

  useEffect(() => {
    const transformedState = transformStateToUI(selectedValues, selectedCity, selectedRegion, rawApiData);
    setFormDisplayState(transformedState);
  }, [selectedValues, apiDisplayData, selectedCity, selectedRegion, rawApiData]);

  useEffect(() => {
    if (isEmpty(apiDisplayData.cities)) {
      if (overrideLoadCities) {
        setInitialLoad(true);
        overrideLoadCities().then(citiesV2 => {
          if (!isEmpty(citiesV2)) {
            setCities(citiesV2);
          } else {
            setInitialLoad(false);
          }
        });
      } else {
        loadCities();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiDisplayData.cities]);

  // Fetch Regions
  useEffect(() => {
    if (isEmpty(apiDisplayData.regions) && selectedCity) {
      setInitialLoad(true);
      if (overrideLoadAreas) {
        overrideLoadAreas(selectedCity).then(areas => {
          setAreas(areas);
        });
      } else {
        loadAreas();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, apiDisplayData.regions]);

  useEffect(() => {
    if (selectedRegion && rawApiData) {
      const [region] = filter(data => equals(data.region.id, selectedRegion), rawApiData);

      if (region && !isEmpty(region.districts)) {
        setApiDisplayData(prevState => ({
          ...prevState,
          districts: region.districts,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion, rawApiData]);

  const isLoading = cityLoading || areaLoading || initialLoad;

  const returnSelectedValues = (UIState: FormDisplayState) => {
    const newFormState = transformUIToState(
      {
        ...UIState,
        selectedCity,
        selectedRegion,
        isLoading,
        totalRegions: length(apiDisplayData.regions),
        totalDistricts: length(apiDisplayData.districts),
      },
      selectedValues
    );
    const isAllCitiesChecked = equals(apiDisplayData.cities.length, newFormState.length);
    const hasRegions = Boolean(newFormState.find(city => city.regions));
    const isAllCitiesSelected = isAllCitiesChecked && !hasRegions;
    onSelectValues({ isAllCitiesSelected, formState: newFormState });
  };

  // Mass Update Handlers
  const onUpdateAllDistricts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    let cities = clone(formDisplayState.cities);
    let regions = clone(formDisplayState.regions);
    let districts = clone(formDisplayState.districts);
    const checkedRegion = { id: selectedRegion, indeterminate: false };

    if (checked) {
      const isRegionChecked = Boolean(find(propEq('id', selectedRegion), regions));
      if (!isRegionChecked) {
        regions.push(checkedRegion);
      }
      const isAllRegionsChecked = equals(length(regions), length(apiDisplayData.regions));

      const isCityChecked = Boolean(find(propEq('id', selectedCity), cities));

      if (isCityChecked) {
        cities = updateIndeterState(!isAllRegionsChecked, selectedCity, cities);
      } else {
        cities.push({ id: selectedCity, indeterminate: !isAllRegionsChecked });
      }

      districts = map(
        district => ({
          id: district.id,
          indeterminate: false,
        }),
        apiDisplayData.districts
      );

      regions = updateIndeterState(false, selectedRegion, regions);
    } else {
      districts = [];
      regions = isEmpty(formDisplayState.regions)
        ? formDisplayState.regions
        : reject(propEq('id', selectedRegion), regions);
      cities = isEmpty(regions)
        ? reject(propEq('id', selectedCity), cities)
        : updateIndeterState(true, selectedCity, cities);
    }

    returnSelectedValues({
      cities,
      regions,
      districts,
    });
  };

  const onUpdateAllRegions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    let cities = clone(formDisplayState.cities);
    let regions = clone(formDisplayState.regions);
    let districts = clone(formDisplayState.districts);

    if (checked) {
      if (isEmpty(cities)) {
        cities.push({ id: selectedCity, indeterminate: false });
      } else {
        cities = updateIndeterState(false, selectedCity, cities);
      }
      regions = map(
        region => ({
          id: region.id,
          indeterminate: false,
        }),
        apiDisplayData.regions
      );
      districts = map(
        district => ({
          id: district.id,
          indeterminate: false,
        }),
        apiDisplayData.districts
      );
    } else {
      cities = reject(propEq('id', selectedCity), cities);
      regions = [];
      districts = [];
    }

    returnSelectedValues({
      cities,
      regions,
      districts,
    });
  };

  const onUpdateAllCities = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    const districts = checked
      ? map(
          district => ({
            id: district.id,
            indeterminate: false,
          }),
          apiDisplayData.districts
        )
      : [];

    const regions = checked
      ? map(
          region => ({
            id: region.id,
            indeterminate: false,
          }),
          apiDisplayData.regions
        )
      : [];

    const cities = checked
      ? map(
          city => ({
            id: city.slug,
            indeterminate: false,
          }),
          apiDisplayData.cities
        )
      : [];

    returnSelectedValues({
      cities,
      regions,
      districts,
    });
  };

  // Single Update handlers
  const onUpdateDistrict = (e: React.ChangeEvent<HTMLInputElement>, item: Zone) => {
    const { checked } = e.target;
    const { id } = item;

    let districts = clone(formDisplayState.districts);
    let regions = clone(formDisplayState.regions);
    let cities = clone(formDisplayState.cities);

    const checkedDistrict: DisplayState = { id, indeterminate: false };
    const isRegionChecked = Boolean(find(propEq('id', selectedRegion), regions));
    const isCityChecked = Boolean(find(propEq('id', selectedCity), cities));

    if (checked) {
      districts.push(checkedDistrict);

      const isAllDistrictsChecked = equals(length(districts), length(apiDisplayData.districts));

      if (isRegionChecked) {
        regions = updateIndeterState(!isAllDistrictsChecked, selectedRegion, regions);
      } else {
        regions.push({
          id: selectedRegion,
          indeterminate: !isAllDistrictsChecked,
        });
      }

      const isAllRegionsChecked = equals(length(regions), length(apiDisplayData.regions));

      if (isCityChecked) {
        const indeterminateValue = hasIndeterState(regions) || !isAllRegionsChecked;
        cities = updateIndeterState(indeterminateValue, selectedCity, cities);
      } else {
        cities.push({ id: selectedCity, indeterminate: !isAllRegionsChecked });
      }
    } else {
      districts = reject(district => equals(district.id, id), districts);

      if (isEmpty(districts)) {
        regions = reject(region => equals(region.id, selectedRegion), regions);
      }

      if (!isEmpty(regions)) {
        regions = updateIndeterState(true, selectedRegion, regions);
      }

      if (isEmpty(regions)) {
        cities = reject(city => equals(city.id, selectedCity), cities);
      }

      if (!isEmpty(cities)) {
        cities = updateIndeterState(true, selectedCity, cities);
      }
    }

    returnSelectedValues({
      cities,
      regions,
      districts,
    });
  };

  const onUpdateRegion = (e: React.ChangeEvent<HTMLInputElement>, item: Zone) => {
    const { checked } = e.target;
    const { id } = item;

    let districts = clone(formDisplayState.districts);
    let regions = clone(formDisplayState.regions);
    let cities = clone(formDisplayState.cities);

    const checkedRegion: DisplayState = { id, indeterminate: false };
    const isCityChecked = Boolean(find(propEq('id', selectedCity), cities));

    if (checked) {
      regions.push(checkedRegion);

      const isAllRegionsChecked = equals(length(regions), length(apiDisplayData.regions));

      if (isCityChecked) {
        cities = updateIndeterState(!isAllRegionsChecked, selectedCity, cities);
      } else {
        cities.push({ id: selectedCity, indeterminate: !isAllRegionsChecked });
      }

      // Check all districts if focused panel is current region
      if (equals(selectedRegion, id)) {
        districts = map(
          district => ({
            id: district.id,
            indeterminate: false,
          }),
          apiDisplayData.districts
        );
      }
    } else {
      regions = reject(region => equals(region.id, id), regions);

      // Uncheck all districts if focused panel is current region
      if (equals(selectedRegion, id)) {
        districts = [];
      }

      if (!isEmpty(regions)) {
        cities = updateIndeterState(true, selectedCity, cities);
      }

      if (isEmpty(regions)) {
        cities = reject(city => equals(city.id, selectedCity), cities);
      }
    }

    returnSelectedValues({
      cities,
      regions,
      districts,
    });
  };

  const onUpdateCity = (e: React.ChangeEvent<HTMLInputElement>, item: City) => {
    const { checked } = e.target;
    const { slug } = item;

    let districts = clone(formDisplayState.districts);
    let regions = clone(formDisplayState.regions);
    let cities = clone(formDisplayState.cities);

    const checkedCity: DisplayState = { id: slug, indeterminate: false };

    if (checked) {
      cities.push(checkedCity);
      regions = map(
        region => ({
          id: region.id,
          indeterminate: false,
        }),
        apiDisplayData.regions
      );
      districts = map(
        district => ({
          id: district.id,
          indeterminate: false,
        }),
        apiDisplayData.districts
      );
    } else {
      cities = reject(city => equals(city.id, slug), cities);
      regions = [];
      districts = [];
    }

    returnSelectedValues({
      cities,
      regions,
      districts,
    });
  };

  const onCitySelect = (city: City) => {
    setSelectedCity(city.slug);
  };

  const onRegionSelect = (region: Zone) => {
    setSelectedRegion(region.id);
  };

  const zoneContextObject: IZoneContext = {
    formDisplayState: {
      [DisplayType.CITY]: formDisplayState.cities,
      [DisplayType.REGION]: formDisplayState.regions,
      [DisplayType.DISTRICT]: formDisplayState.districts,
      selectedCity,
      selectedRegion,
    },
    formDisplayData: apiDisplayData,
    formUpdate: {
      [DisplayType.CITY]: {
        onUpdateAll: onUpdateAllCities,
        onUpdate: onUpdateCity,
        onSelect: onCitySelect,
      },
      [DisplayType.REGION]: {
        onUpdateAll: onUpdateAllRegions,
        onUpdate: onUpdateRegion,
        onSelect: onRegionSelect,
      },
      [DisplayType.DISTRICT]: {
        onUpdateAll: onUpdateAllDistricts,
        onUpdate: onUpdateDistrict,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSelect: () => {},
      },
    },
    disabled,
  };

  return (
    <ZoneContext.Provider value={zoneContextObject}>
      <div className='zone-selector'>
        {isLoading && <Skeleton />}
        <ZonePanel itemData={apiDisplayData.cities} displayType={DisplayType.CITY} fluid={!hasZones} />
        {!isEmpty(apiDisplayData.regions) && selectedCity && (
          <ZonePanel itemData={apiDisplayData.regions} displayType={DisplayType.REGION} />
        )}
        {!isEmpty(apiDisplayData.districts) && selectedRegion && (
          <ZonePanel itemData={apiDisplayData.districts} displayType={DisplayType.DISTRICT} fluid />
        )}
      </div>
    </ZoneContext.Provider>
  );
};

const WrappedZoneSelector: React.FC<ZoneSelectorProps> = props => {
  return (
    <ApolloProvider client={createApolloClient()}>
      <ZoneSelector {...props} />
    </ApolloProvider>
  );
};

export default WrappedZoneSelector;
