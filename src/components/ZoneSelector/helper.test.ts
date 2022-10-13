import * as helper from './helper';
import {
  mockAPIResponse,
  mockCityObject,
  mockDisplayState,
  mockDisplayStateWithAllDistricts,
  mockFormState,
} from './__mocks__/mock';

describe('helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hasIndeterState()', () => {
    it('should return true if UI has indeterminate state', () => {
      const hasIndeterSpy = jest.spyOn(helper, 'hasIndeterState');

      const result = helper.hasIndeterState(mockDisplayState.cities);

      expect(hasIndeterSpy).toBeCalled();
      expect(hasIndeterSpy).toBeCalledTimes(1);
      expect(hasIndeterSpy).toBeCalledWith(mockDisplayState.cities);
      expect(result).toBeTruthy();
    });

    it('should return false if UI has no indeterminate state', () => {
      const hasIndeterSpy = jest.spyOn(helper, 'hasIndeterState');

      const result = helper.hasIndeterState(mockDisplayState.districts);

      expect(hasIndeterSpy).toBeCalled();
      expect(hasIndeterSpy).toBeCalledTimes(1);
      expect(hasIndeterSpy).toBeCalledWith(mockDisplayState.districts);
      expect(result).toBeFalsy();
    });
  });

  const selectedCity = 'sg-singapore';
  const selectedRegion = '4829894c-61a5-437a-a1b4-1d64b4a4a38b';

  describe('transformStateToUI()', () => {
    it('should transform formState with indeterminate into UI state', () => {
      const transformStateSpy = jest.spyOn(helper, 'transformStateToUI');
      const result = helper.transformStateToUI(mockFormState, selectedCity, selectedRegion, mockAPIResponse);

      expect(transformStateSpy).toBeCalled();
      expect(transformStateSpy).toBeCalledTimes(1);
      expect(result).toEqual(mockDisplayState);
    });

    it.skip('should transform formState into UI state', () => {
      const transformStateSpy = jest.spyOn(helper, 'transformStateToUI');
      const nonIndeterminateRegion = '0cff5b26-3bfd-4e09-bf54-6d84753c375e';
      const result = helper.transformStateToUI(mockFormState, selectedCity, nonIndeterminateRegion, mockAPIResponse);

      expect(transformStateSpy).toBeCalled();
      expect(transformStateSpy).toBeCalledTimes(1);
      expect(result).toEqual(mockDisplayStateWithAllDistricts);
    });
  });

  describe('transformUIToState()', () => {
    it('should transform UI state back to formState', () => {
      const transformUISpy = jest.spyOn(helper, 'transformUIToState');
      const mockUIState = {
        isLoading: false,
        selectedCity,
        selectedRegion,
        totalRegions: 5,
        totalDistricts: 5,
        ...mockDisplayState,
      };

      const result = helper.transformUIToState(mockUIState, mockFormState);

      expect(transformUISpy).toBeCalled();
      expect(transformUISpy).toBeCalledTimes(1);
      expect(result).toEqual(mockFormState);
    });
  });

  describe('generateCityObject()', () => {
    it('should generate city object', () => {
      const generateCityObjectSpy = jest.spyOn(helper, 'generateCityObject');
      const result = helper.generateCityObject({
        selectedCity,
        selectedRegion,
        totalRegions: 5,
        totalDistricts: 8,
        ...mockDisplayState,
      });

      expect(generateCityObjectSpy).toBeCalled();
      expect(generateCityObjectSpy).toBeCalledTimes(1);
      expect(result).toEqual(mockCityObject);
    });
  });
});
