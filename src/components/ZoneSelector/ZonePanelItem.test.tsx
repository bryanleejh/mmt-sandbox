import React from 'react';
import ZonePanelItem from './ZonePanelItem';
import { render, fireEvent } from '@testing-library/react';
import { ZoneContext } from './ZoneSelector';
import { defaultZoneContext } from './default';
import { paramCase } from 'param-case';
import { ZonePanelContext } from './ZonePanel';
import { DisplayType } from './enums';

const mockData = [
  {
    id: 711,
    name: 'Singapore',
    slug: 'sg-singapore',
  },
];

const defaultComponentProps = {
  data: mockData,
  index: 0,
  style: {},
};

const customRender = (ui, { providerProps, ...renderOptions }) => {
  const mockPanelProvider = {
    value: {
      displayType: DisplayType.CITY,
    },
  };
  return render(
    <ZoneContext.Provider {...providerProps}>
      <ZonePanelContext.Provider {...mockPanelProvider}>{ui}</ZonePanelContext.Provider>
    </ZoneContext.Provider>,
    renderOptions
  );
};

describe('ZonePanelItem', () => {
  it('should render a single item', () => {
    const providerProps = {
      value: defaultZoneContext,
    };
    const { asFragment } = customRender(<ZonePanelItem {...defaultComponentProps} />, { providerProps });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render disabled state', () => {
    const providerProps = {
      value: {
        ...defaultZoneContext,
        disabled: true,
      },
    };
    const { asFragment } = customRender(<ZonePanelItem {...defaultComponentProps} />, { providerProps });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should check rendered checkbox based on display state', () => {
    const providerProps = {
      value: {
        ...defaultZoneContext,
        formDisplayState: {
          cities: [{ id: 'sg-singapore', indeterminate: true }],
        },
      },
    };
    const { getByTestId } = customRender(<ZonePanelItem {...defaultComponentProps} />, { providerProps });
    const panelItemCheckbox = getByTestId(`checkbox-${paramCase(mockData[0].name)}`);
    expect(panelItemCheckbox.checked).toEqual(true);
  });

  it('should render indeterminate state', () => {
    const providerProps = {
      value: {
        ...defaultZoneContext,
        formDisplayState: {
          cities: [{ id: 'sg-singapore', indeterminate: true }],
        },
      },
    };
    const { asFragment } = customRender(<ZonePanelItem {...defaultComponentProps} />, { providerProps });
    expect(asFragment()).toMatchSnapshot();
  });
});
