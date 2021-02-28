import React from 'react';
import { Table } from 'rsuite';
import { epochTimeFormatter } from '../../utils/numeric';

interface Props {
  data: any[];
  expectedData?: string[] | number[];
  type: 'move' | 'position';
}

const PerformanceTable: React.FunctionComponent<Props> = ({ data, expectedData, type }) => {
  const tableData = data.map((value, index) => ({
    ...value,
    expected: expectedData && expectedData[data.length - index - 1],
    created_at: epochTimeFormatter(value['created_at']),
  }));

  const { Column, HeaderCell, Cell } = Table;

  const dataKey = type === 'move' ? 'dance_move' : 'dance_position';

  const renderMatchedRow = (content: string) => <span style={{ color: 'green' }}>{content}</span>;
  const renderUnmatchedRow = (content: string) => <p style={{ color: 'red' }}>{content}</p>;

  return (
    <Table data={tableData} width={400} height={200} style={{ marginTop: 10 }}>
      <Column align="center" flexGrow={1}>
        <HeaderCell>Actual</HeaderCell>
        {expectedData ? (
          <Cell>
            {(rowData: any) =>
              rowData[dataKey] === rowData['expected']
                ? renderMatchedRow(rowData[dataKey])
                : renderUnmatchedRow(rowData[dataKey])
            }
          </Cell>
        ) : (
          <Cell dataKey="dance_move" />
        )}
      </Column>
      {expectedData && (
        <Column align="center" flexGrow={1}>
          <HeaderCell>Expected</HeaderCell>
          <Cell dataKey="expected">
            {(rowData: any) =>
              rowData[dataKey] === rowData['expected']
                ? renderMatchedRow(rowData['expected'])
                : renderUnmatchedRow(rowData['expected'])
            }
          </Cell>
        </Column>
      )}
      <Column align="center" flexGrow={1}>
        <HeaderCell>Time</HeaderCell>
        <Cell dataKey="created_at" />
      </Column>
    </Table>
  );
};

export default PerformanceTable;
