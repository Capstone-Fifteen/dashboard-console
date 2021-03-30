import { gql } from '@apollo/client';

const RAW_DATA_SUBSCRIPTION = gql`
  subscription RawDataSubscription(
    $deviceId: [Int!]
    $startTime: timestamptz
    $endTime: timestamptz
    $limit: Int
    $order: order_by
  ) {
    raw_data(
      order_by: { created_at: $order }
      where: { device_id: { _in: $deviceId }, created_at: { _gte: $startTime, _lte: $endTime } }
      limit: $limit
    ) {
      created_at
      device_id
      emg_reading
      pitch_reading
      roll_reading
      x_reading
      y_reading
      yaw_reading
      z_reading
    }
  }
`;

export default RAW_DATA_SUBSCRIPTION;
