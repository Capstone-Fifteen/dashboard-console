import { gql } from '@apollo/client';

const UPDATE_SESSION_BY_PK_MUTATION = gql`
  mutation UpdateSessionByPkMutation($id: Int!, $endTime: timestamptz!) {
    update_session_by_pk(pk_columns: { id: $id }, _set: { end_time: $endTime }) {
      id
      name
      start_time
      end_time
    }
  }
`;

export default UPDATE_SESSION_BY_PK_MUTATION;
