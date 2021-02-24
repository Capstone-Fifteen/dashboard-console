import React from 'react';
import { Table } from 'rsuite';
import moment from 'moment';

interface Props {
  data: any[];
}

const ExecutedDanceTable: React.FunctionComponent<Props> = ({ data }) => {
  const tableData = data.map((value) => ({
    ...value,
    created_at: moment(value['created_at']).format('LTS'),
  }));

  const { Column, HeaderCell, Cell } = Table;

  return (
    <Table data={tableData} width={300} height={200} style={{ marginTop: 10 }}>
      <Column align="center" width={150}>
        <HeaderCell>Dance Move</HeaderCell>
        <Cell dataKey="dance_move" />
      </Column>
      <Column align="center" width={150}>
        <HeaderCell>Time</HeaderCell>
        <Cell dataKey="created_at" />
      </Column>
    </Table>
  );
};

export default ExecutedDanceTable;
