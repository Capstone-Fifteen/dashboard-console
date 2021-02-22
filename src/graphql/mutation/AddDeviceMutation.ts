import { gql } from '@apollo/client';

const ADD_DEVICE_MUTATION = gql`
  mutation AddDeviceMutation($wearable: device_insert_input!) {
    insert_device(objects: [$wearable]) {
      returning {
        id
        name
      }
    }
  }
`;
export default ADD_DEVICE_MUTATION;
