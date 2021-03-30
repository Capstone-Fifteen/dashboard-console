import { gql } from '@apollo/client';

const LAST_POSITION_SUBSCRIPTION = gql`
  subscription LastPositionSubscription($deviceId: [Int!], $startTime: timestamptz, $endTime: timestamptz) {
    predicted_data(
      distinct_on: device_id
      order_by: [{ device_id: asc }, { created_at: desc }]
      where: { device_id: { _in: $deviceId }, created_at: { _gte: $startTime, _lte: $endTime } }
    ) {
      device_id
      dance_position
    }
  }
`;

export default LAST_POSITION_SUBSCRIPTION;
