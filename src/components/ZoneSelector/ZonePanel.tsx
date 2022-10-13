/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useContext, useEffect } from 'react';
// import { Bootstrap } from '@deliveryhero/mmt-design-system';
import { Stack, Checkbox } from '@deliveryhero/armor';
import { equals, isEmpty, length, not, complement } from 'ramda';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ZonePanelItem from './ZonePanelItem';
import { ZoneContext, ZonePanelContext } from './context';
import { hasIndeterState } from './helper';
import { ZonePanelProps } from './types';

// const { Form } = Bootstrap;

const ZonePanel: React.FC<ZonePanelProps> = ({
  displayType,
  itemData,
  fluid = false,
  renderFilter,
}: ZonePanelProps) => {
  const selectAllInputBox = useRef<any>(null);

  const { formDisplayState, formDisplayData, disabled } = useContext(ZoneContext); //formUpdate

  // const { onUpdateAll } = formUpdate[displayType];

  const isAllChecked = equals(length(formDisplayState[displayType]), length(formDisplayData[displayType]));

  const zonePanelContextObject = { displayType };

  useEffect(() => {
    if (selectAllInputBox.current) {
      const isFilled = complement(isEmpty);

      const indeterminateValue =
        (isFilled(formDisplayState[displayType]) && not(isAllChecked)) ||
        hasIndeterState(formDisplayState[displayType]);

      (selectAllInputBox.current as any).indeterminate = indeterminateValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAllInputBox, formDisplayState, isAllChecked]);

  return (
    <div className={fluid ? 'zone-panel-fluid' : 'zone-panel'}>
      <div className='zone-panel__header'>
        <div className='zone-panel__header-text'>{displayType}</div>
        <div className='zone-panel__header-input'>
          <Stack ref={selectAllInputBox} id={`all-${displayType}`}>
            <Checkbox
              ref={selectAllInputBox}
              value={`all-${displayType}`}
              onChange={() => {
                console.log('test');
              }}
              checked={isAllChecked}
              data-testid={`all-${displayType}`}
              disabled={disabled}
              label={`Select all ${displayType}`}
            />
          </Stack>
        </div>
        {renderFilter && <div className='zone-panel__header-search'>{renderFilter}</div>}
      </div>
      <div className='zone-panel__window'>
        <ZonePanelContext.Provider value={zonePanelContextObject}>
          <AutoSizer>
            {({ width, height }) => (
              <List itemData={itemData} itemCount={itemData.length} itemSize={32} height={height} width={width}>
                {ZonePanelItem}
              </List>
            )}
          </AutoSizer>
        </ZonePanelContext.Provider>
      </div>
    </div>
  );
};

export default ZonePanel;
