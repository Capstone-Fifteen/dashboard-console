import React from 'react';
import { Table, Checkbox, SelectPicker, Input, Icon } from 'rsuite';

const { Cell } = Table;

export const CheckCell: React.FunctionComponent<any> = ({ rowData, onChange, formObject, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={formObject.hasOwnProperty(rowData[dataKey])}
      />
    </div>
  </Cell>
);

export const ImageCell: React.FunctionComponent<any> = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: 'gray',
        borderRadius: 20,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block',
      }}
    >
      {rowData[dataKey] ? (
        <img alt="" src={rowData[dataKey]} width="44" />
      ) : (
        <Icon icon="avatar" size="2x" style={{ marginTop: 4 }} />
      )}
    </div>
  </Cell>
);

export const SelectPickerCell: React.FunctionComponent<any> = ({
  rowData,
  idKey,
  onChange,
  formObject,
  dataKey,
  data,
  disabledItemValues,
  ...props
}) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ height: 40, padding: '5px 10px' }}>
      <SelectPicker
        data={data}
        value={formObject[rowData[idKey]] ? formObject[rowData[idKey]][dataKey] : null}
        onChange={(value) => onChange(value, rowData[idKey], dataKey)}
        disabled={!formObject.hasOwnProperty(rowData[idKey])}
        disabledItemValues={disabledItemValues}
      />
    </div>
  </Cell>
);

export const InputCell: React.FunctionComponent<any> = ({
  rowData,
  idKey,
  onChange,
  formObject,
  dataKey,
  data,
  ...props
}) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ height: 40, padding: '5px 10px' }}>
      <Input
        placeholder="Comma-Separated Value (Optional)"
        value={formObject[rowData[idKey]] ? formObject[rowData[idKey]][dataKey] : ''}
        onChange={(value) => onChange(value, rowData[idKey], dataKey)}
        disabled={!formObject.hasOwnProperty(rowData[idKey])}
      />
    </div>
  </Cell>
);
