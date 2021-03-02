import { gql } from '@apollo/client';

const ADD_DANCER_ANALYTIC_MUTATION = gql`
  mutation AddDancerAnalyticMutation($data: [dancer_analytic_insert_input!]!) {
    insert_dancer_analytic(objects: $data) {
      returning {
        dancer_id
        session_id
      }
    }
  }
`;

export default ADD_DANCER_ANALYTIC_MUTATION;
