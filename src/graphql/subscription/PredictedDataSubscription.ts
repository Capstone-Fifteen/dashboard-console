import { gql } from '@apollo/client';

const PREDICTED_DATA_SUBSCRIPTION = gql`
  subscription PredictedDataSubscription {
    predicted_data(order_by: { created_at: desc }) {
      created_at
      dance_move
      dance_position
      delay
      device_id
    }
  }
`;

export default PREDICTED_DATA_SUBSCRIPTION;
