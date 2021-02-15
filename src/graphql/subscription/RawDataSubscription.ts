import { gql } from '@apollo/client';

const RAW_DATA_SUBSCRIPTION = gql`
  subscription RawDataSubscription {
    raw_data {
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
