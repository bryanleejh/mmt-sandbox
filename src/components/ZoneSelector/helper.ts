import {
  equals,
  find,
  map,
  propEq,
  T,
  F,
  not,
  isEmpty,
  and,
  clone,
  curry,
  when,
  assoc,
  length,
  omit,
  findIndex,
} from 'ramda';
import { DisplayState, FormAreaState, FormRegionState, QueryResponse, UIState } from './types';

export const hasIndeterState = (list: DisplayState[]) => Boolean(find(propEq('indeterminate', true), list));

export const transformStateToUI = (
  state: FormAreaState[],
  selectedCity: string,
  selectedRegion: string,
  rawApiData?: QueryResponse[]
) => {
  const cities = map(
    data => ({
      id: data.city,
      indeterminate: Boolean(data.regions),
    }),
    state
  );

  let regions: DisplayState[] = [];
  let districts: DisplayState[] = [];
  if (selectedCity) {
    const formattedCity = find<DisplayState>(propEq('id', selectedCity), cities);

    if (equals(formattedCity?.indeterminate, T())) {
      const cityObj = find<FormAreaState>(propEq('city', selectedCity), state);
      if (cityObj) {
        if (cityObj.regions) {
          regions = map(
            city => ({
              id: city.region,
              indeterminate: Boolean(city.districts),
            }),
            cityObj.regions
          );

          if (selectedRegion) {
            const formattedRegion = find<DisplayState>(propEq('id', selectedRegion), regions);

            if (equals(formattedRegion?.indeterminate, T())) {
              const regionObj = find<FormRegionState>(propEq('region', selectedRegion), cityObj.regions);

              if (regionObj && regionObj.districts) {
                districts = map(
                  district => ({
                    id: district,
                    indeterminate: false,
                  }),
                  regionObj.districts
                );
              }
            }

            if (equals(formattedRegion?.indeterminate, F())) {
              if (rawApiData) {
                const apiData = find(data => equals(data.region.id, selectedRegion), rawApiData);

                if (apiData) {
                  districts = map(
                    district => ({
                      id: district.id,
                      indeterminate: false,
                    }),
                    apiData.districts
                  );
                }
              }
            }
          }
        }
      }
    }

    if (equals(formattedCity?.indeterminate, F())) {
      if (rawApiData) {
        // Selected all regions
        const apiRegions = map(data => ({ id: data.region.id }), rawApiData);
        regions = map(
          region => ({
            id: region.id,
            indeterminate: false,
          }),
          apiRegions
        );

        if (selectedRegion) {
          // Select all districts
          const apiData = find(data => equals(data.region.id, selectedRegion), rawApiData);
          if (apiData) {
            districts = map(
              district => ({
                id: district.id,
                indeterminate: false,
              }),
              apiData.districts
            );
          }
        }
      }
    }
  }

  return {
    cities,
    regions,
    districts,
  };
};

export const generateCityObject = ({
  selectedCity,
  selectedRegion,
  regions,
  districts,
  totalRegions,
  totalDistricts,
}: Omit<UIState, 'isLoading' | 'cities'>) => {
  const isAllRegionsChecked = equals(length(regions), totalRegions);
  const isAllDistrictsChecked = equals(length(districts), totalDistricts);
  const city = {
    city: selectedCity,
    ...(not(isEmpty(regions)) &&
      not(isAllRegionsChecked) && {
        regions: map(region => {
          if (region.indeterminate && equals(selectedRegion, region.id)) {
            return {
              region: region.id,
              ...(not(isAllDistrictsChecked) && {
                districts: map(district => district.id, districts),
              }),
            } as FormRegionState;
          }
          return {
            region: region.id,
          } as FormRegionState;
        }, regions),
      }),
  };

  return city as FormAreaState;
};

export const transformUIToState = (displayState: UIState, currentFormState: FormAreaState[]) => {
  const {
    isLoading,
    cities,
    regions,
    districts,
    selectedCity,
    selectedRegion,
    totalRegions,
    totalDistricts,
  } = displayState;
  let updatedFormState = clone(currentFormState);

  if (and(not(isLoading), isEmpty(cities))) {
    updatedFormState = [];
  }

  if (selectedCity) {
    if (not(isEmpty(updatedFormState))) {
      const formattedCity = find<DisplayState>(propEq('id', selectedCity), cities);
      const cityInFormStateIndex = findIndex<FormAreaState>(propEq('city', selectedCity), updatedFormState);

      if (equals(formattedCity?.indeterminate, T())) {
        if (cityInFormStateIndex > -1) {
          // Update existing city object in form state
          const city = clone(updatedFormState[cityInFormStateIndex]);
          city.regions = map(region => {
            if (region.indeterminate) {
              if (equals(selectedRegion, region.id)) {
                return {
                  region: region.id,
                  districts: map(district => district.id, districts),
                } as FormRegionState;
              } else {
                const existingRegionWithDistricts = find(propEq('region', region.id), city?.regions!);
                return {
                  ...existingRegionWithDistricts,
                } as FormRegionState;
              }
            }

            return {
              region: region.id,
            } as FormRegionState;
          }, regions);
          updatedFormState[cityInFormStateIndex] = city;
        } else {
          // Insert city into form state
          const city = generateCityObject({
            selectedCity,
            selectedRegion,
            regions,
            districts,
            totalRegions,
            totalDistricts,
          });
          updatedFormState.push(city);
        }
      }
      if (equals(formattedCity?.indeterminate, F())) {
        if (cityInFormStateIndex > -1) {
          let city = clone(updatedFormState[cityInFormStateIndex]);
          city = omit(['regions'], city);
          updatedFormState[cityInFormStateIndex] = city;
        }
      }
    } else if (not(isEmpty(cities))) {
      // Insert city into form state
      const city = generateCityObject({
        selectedCity,
        selectedRegion,
        regions,
        districts,
        totalRegions,
        totalDistricts,
      });
      updatedFormState.push(city);
    }
  }

  if (!selectedCity && not(isEmpty(cities))) {
    updatedFormState = map(city => ({ city: city.id }), cities);
  }

  return updatedFormState;
};

export const updateIndeterState = curry((checked, id, items) =>
  map(when(propEq('id', id), assoc('indeterminate', checked)), items)
);
