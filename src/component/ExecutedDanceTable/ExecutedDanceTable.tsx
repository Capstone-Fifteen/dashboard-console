import React from 'react';
import { Table } from 'rsuite';

const ExecutedDanceTable: React.FunctionComponent<any> = () => {
  const data = [
    { move: 'Dab', time: new Date().toLocaleTimeString() },
    { move: 'Wipe Table', time: new Date().toLocaleTimeString() },
    { move: 'Power Kick', time: new Date().toLocaleTimeString() },
    { move: 'Brush Hair', time: new Date().toLocaleTimeString() },
    { move: 'Dab', time: new Date().toLocaleTimeString() },
    { move: 'Wipe Table', time: new Date().toLocaleTimeString() },
    { move: 'Power Kick', time: new Date().toLocaleTimeString() },
    { move: 'Brush Hair', time: new Date().toLocaleTimeString() },
  ];

  const { Column, HeaderCell, Cell } = Table;

  return (
    <Table data={data} width={300} height={200} style={{ marginTop: 10 }}>
      <Column align="center" width={150}>
        <HeaderCell>Dance Move</HeaderCell>
        <Cell dataKey="move" />
      </Column>
      <Column align="center" width={150}>
        <HeaderCell>Time</HeaderCell>
        <Cell dataKey="time" />
      </Column>
    </Table>
  );
};

export default ExecutedDanceTable;
