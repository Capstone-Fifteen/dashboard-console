import React from 'react';
import { Table } from 'rsuite';
import { epochTimeFormatter } from '../../utils/numeric';

interface Props {
  data: any[];
  expectedDanceData?: string[];
}

const ExecutedDanceTable: React.FunctionComponent<Props> = ({ data, expectedDanceData }) => {
  const tableData = data.map((value, index) => ({
    ...value,
    expected: expectedDanceData && expectedDanceData[data.length - index - 1],
    created_at: epochTimeFormatter(value['created_at']),
  }));

  const { Column, HeaderCell, Cell } = Table;

  return (
    <Table data={tableData} width={300} height={200} style={{ marginTop: 10 }}>
      <Column align="center" width={100}>
        <HeaderCell>Executed Move</HeaderCell>
        <Cell dataKey="dance_move" />
      </Column>
      {expectedDanceData && (
        <Column align="center" width={100}>
          <HeaderCell>Expected Move</HeaderCell>
          <Cell dataKey="expected" />
        </Column>
      )}
      <Column align="center" width={100}>
        <HeaderCell>Time</HeaderCell>
        <Cell dataKey="created_at" />
      </Column>
    </Table>
  );
};

export default ExecutedDanceTable;
