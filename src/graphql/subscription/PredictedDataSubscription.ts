import { gql } from '@apollo/client';

const PREDICTED_DATA_SUBSCRIPTION = gql`
  subscription PredictedDataSubscription($deviceId: [Int!], $startTime: timestamptz, $endTime: timestamptz) {
    predicted_data(
      order_by: { created_at: desc }
      where: { device_id: { _in: $deviceId }, created_at: { _gte: $startTime, _lte: $endTime } }
    ) {
      created_at
      dance_move
      dance_position
      delay
      device_id
    }
  }
`;

export default PREDICTED_DATA_SUBSCRIPTION;
