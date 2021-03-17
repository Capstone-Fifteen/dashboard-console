import { gql } from '@apollo/client';

const ALL_DEVICE_QUERY = gql`
  query AllDeviceQuery {
    device {
      id
      name
      description
      created_at
      updated_at
    }
  }
`;

export default ALL_DEVICE_QUERY;
