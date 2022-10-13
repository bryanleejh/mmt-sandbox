import React from 'react';
import mmtSdk from '@deliveryhero/mmt-sdk';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { ZoneSelector } from './index';
import { Country } from '../../utils/country';
import { citiesResponseMock, areasResponseMock } from './__mocks__/mock';

const mockCity = 'sg-singapore';

const mockSelectedValues = [{ city: mockCity }];

const defaultComponentProps: any = {
  selectedValues: mockSelectedValues,
  onSelectValues: jest.fn(),
  hasZones: true,
  disabled: false,
};

jest.mock('react-virtualized-auto-sizer', () => {
  const width = 1024;
  const height = 768;
  return ({ children }) => <div>{children({ width, height })}</div>;
});

beforeAll(() => {
  mmtSdk.getActiveCountry = jest.fn().mockReturnValue({ code: 'SG', geid: Country.Singapore });
});

afterEach(cleanup);

describe('ZoneSelector', () => {
  it.skip('should render', async () => {
    const { asFragment } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...defaultComponentProps} />
      </MockedProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it.skip('should render disabled state', async () => {
    const componentPropsWithDisabledState = {
      ...defaultComponentProps,
      disabled: true,
    };
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...componentPropsWithDisabledState} disabled />
      </MockedProvider>
    );
    await wait();
    expect(getByTestId('all-cities')).toBeDisabled();
  });

  it.skip('selecting all cities should update all cities', async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...defaultComponentProps} />
      </MockedProvider>
    );
    await wait();
    const allCitiesCheckbox = getByTestId('all-cities');
    expect(allCitiesCheckbox).toBeInTheDocument();
    expect(allCitiesCheckbox.checked).toEqual(false);
    fireEvent.click(allCitiesCheckbox);
    expect(allCitiesCheckbox.checked).toEqual(true);
    fireEvent.click(allCitiesCheckbox);
    expect(allCitiesCheckbox.checked).toEqual(true);
  });

  it.skip('should select city', async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, citiesResponseMock]}>
        <ZoneSelector {...defaultComponentProps} />
      </MockedProvider>
    );
    await wait();
    await wait();
    await wait();
    await wait();
    await wait();
    const cityCheckbox = getByTestId('checkbox-singapore');
    expect(cityCheckbox).toBeInTheDocument();
    expect(cityCheckbox.checked).toEqual(true);
    fireEvent.click(cityCheckbox);
    expect(cityCheckbox.checked).toEqual(false);
    fireEvent.click(cityCheckbox);
    expect(cityCheckbox.checked).toEqual(true);
  });

  it.skip('selecting city should render regions', async () => {
    const setSelectCityMock = jest.fn();
    const componentPropsWithCity = {
      ...defaultComponentProps,
      api: {
        ...defaultComponentProps.api,
        selectedCity: 'sg-singapore',
        setSelectedCity: setSelectCityMock,
      },
    };
    const { getByTestId, asFragment } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...componentPropsWithCity} />
      </MockedProvider>
    );
    await wait();
    const citySelector = getByTestId('select-singapore');
    expect(citySelector).toBeInTheDocument();
    fireEvent.click(citySelector);
    expect(setSelectCityMock).toBeCalled();
    expect(setSelectCityMock).toBeCalledWith('sg-singapore');
    expect(asFragment()).toMatchSnapshot();
  });

  it.skip('selecting all regions should update all regions', async () => {
    const componentPropsWithCity = {
      ...defaultComponentProps,
      api: {
        ...defaultComponentProps.api,
        selectedCity: 'sg-singapore',
      },
    };
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...componentPropsWithCity} />
      </MockedProvider>
    );
    await wait();
    const allRegionCheckbox = getByTestId('all-regions');
    expect(allRegionCheckbox).toBeInTheDocument();
    expect(allRegionCheckbox.checked).toEqual(true);
    fireEvent.click(allRegionCheckbox);
    expect(allRegionCheckbox.checked).toEqual(false);
    fireEvent.click(allRegionCheckbox);
    expect(allRegionCheckbox.checked).toEqual(true);
  });

  it.skip('should select regions', async () => {
    const componentPropsWithCity = {
      ...defaultComponentProps,
      api: {
        ...defaultComponentProps.api,
        selectedCity: 'sg-singapore',
      },
    };
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...componentPropsWithCity} />
      </MockedProvider>
    );
    await wait();
    const regionCheckbox = getByTestId('checkbox-central');
    expect(regionCheckbox).toBeInTheDocument();
    expect(regionCheckbox.checked).toEqual(true);
    fireEvent.click(regionCheckbox);
    expect(regionCheckbox.checked).toEqual(false);
    fireEvent.click(regionCheckbox);
    expect(regionCheckbox.checked).toEqual(true);
  });

  it.skip('selecting region should render districts', async () => {
    const componentPropsWithCity = {
      ...defaultComponentProps,
      api: {
        ...defaultComponentProps.api,
        selectedCity: 'sg-singapore',
      },
    };
    const { getByTestId, asFragment } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...componentPropsWithCity} />
      </MockedProvider>
    );
    await wait();
    const regionSelector = getByTestId('select-central');
    expect(regionSelector).toBeInTheDocument();
    fireEvent.click(regionSelector);
    expect(asFragment()).toMatchSnapshot();
  });

  it.skip('selecting all districts should update all regions', async () => {
    const componentPropsWithCity = {
      ...defaultComponentProps,
      api: {
        ...defaultComponentProps.api,
        selectedCity: 'sg-singapore',
      },
    };
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...componentPropsWithCity} />
      </MockedProvider>
    );
    await wait();
    const regionSelector = getByTestId('select-central');
    expect(regionSelector).toBeInTheDocument();
    fireEvent.click(regionSelector);
    const allDistrictCheckbox = getByTestId('all-districts');
    expect(allDistrictCheckbox).toBeInTheDocument();
    expect(allDistrictCheckbox.checked).toEqual(true);
    fireEvent.click(allDistrictCheckbox);
    expect(allDistrictCheckbox.checked).toEqual(false);
    fireEvent.click(allDistrictCheckbox);
    expect(allDistrictCheckbox.checked).toEqual(true);
  });

  it.skip('should select district', async () => {
    const componentPropsWithCity = {
      ...defaultComponentProps,
      api: {
        ...defaultComponentProps.api,
        selectedCity: 'sg-singapore',
      },
    };
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={[citiesResponseMock, areasResponseMock]}>
        <ZoneSelector {...componentPropsWithCity} />
      </MockedProvider>
    );
    await wait();
    const regionSelector = getByTestId('select-central');
    expect(regionSelector).toBeInTheDocument();
    fireEvent.click(regionSelector);
    const districtCheckbox = getByTestId('checkbox-tanjong-pagar');
    expect(districtCheckbox).toBeInTheDocument();
    expect(districtCheckbox.checked).toEqual(true);
    fireEvent.click(districtCheckbox);
    expect(districtCheckbox.checked).toEqual(false);
    fireEvent.click(districtCheckbox);
    expect(districtCheckbox.checked).toEqual(true);
  });
});
