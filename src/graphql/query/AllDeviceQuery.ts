import { gql } from '@apollo/client';

const ALL_DEVICE_QUERY = gql`
  query AllDeviceQuery {
    device {
      id
      name
    }
  }
`;

export default ALL_DEVICE_QUERY;
