import { gql } from '@apollo/client';

const PREDICTED_DATA_SUBSCRIPTION = gql`
  subscription PredictedDataSubscription {
    predicted_data {
      created_at
      dance_move
      dance_position
      delay
      device_id
    }
  }
`;

export default PREDICTED_DATA_SUBSCRIPTION;
