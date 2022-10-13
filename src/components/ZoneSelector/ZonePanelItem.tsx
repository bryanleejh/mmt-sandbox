/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react'; // ChangeEvent
import { Stack, Checkbox } from '@deliveryhero/armor';
import { ListChildComponentProps } from 'react-window';
import { NavigateNext } from '@material-ui/icons';
import { paramCase } from 'param-case';
import theme from '../../styles/theme';
import { find, includes, propEq } from 'ramda';
import { ZoneContext, ZonePanelContext } from './context';
import { DisplayState } from './types';

const ZonePanelItem = ({ data, index, style }: ListChildComponentProps) => {
  const selectInputBox = useRef<any>(null);
  const {
    formDisplayData,
    formDisplayState: { selectedCity, selectedRegion, ...formDisplayState },
    formUpdate,
    disabled,
  } = React.useContext(ZoneContext);
  const { displayType } = React.useContext(ZonePanelContext);
  const item = data[index];
  const id: string = item.slug || item.id;
  const isActive = includes(id, [selectedCity, selectedRegion]);
  const isZoneSelected = Boolean(find(propEq('id', id), formDisplayState[displayType]));

  const { onSelect } = formUpdate[displayType]; // onUpdate

  useEffect(() => {
    if (selectInputBox.current) {
      const item = find<DisplayState>(propEq('id', id), formDisplayState[displayType]);

      (selectInputBox.current as any).indeterminate = item?.indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectInputBox, formDisplayState, formDisplayData]);

  return (
    <div className={`zone-panel__item ${isActive ? 'zone-panel__item--active' : ''}`} style={style}>
      <Stack id={item.name}>
        <Checkbox
          ref={selectInputBox}
          value={item.slug}
          checked={isZoneSelected}
          disabled={disabled}
          data-testid={`checkbox-${paramCase(item.name)}`}
          onChange={() => {
            console.log('test');
          }}
          label={item.name}
        />
      </Stack>

      <NavigateNext
        data-testid={`select-${paramCase(item.name)}`}
        onClick={() => onSelect(item)}
        fontSize='small'
        style={{
          color: theme.colors.gray[300],
        }}
      />
    </div>
  );
};

export default ZonePanelItem;
