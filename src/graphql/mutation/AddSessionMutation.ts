import { gql } from '@apollo/client';

const ADD_SESSION_MUTATION = gql`
  mutation AddSessionMutation($name: String!, $startTime: timestamptz!, $participants: [participant_insert_input!]!) {
    session: insert_session_one(object: { name: $name, start_time: $startTime, participants: { data: $participants } }) {
      id
      name
    }
  }
`;

export default ADD_SESSION_MUTATION;
