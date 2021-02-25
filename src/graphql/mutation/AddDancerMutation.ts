import { gql } from '@apollo/client';

const ADD_DANCER_MUTATION = gql`
  mutation AddDancerMutation($dancer: dancer_insert_input!) {
    insert_dancer(objects: [$dancer]) {
      returning {
        id
        name
        gender
        created_at
        last_updated
      }
    }
  }
`;
export default ADD_DANCER_MUTATION;
