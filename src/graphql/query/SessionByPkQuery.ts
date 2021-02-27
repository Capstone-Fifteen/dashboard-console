import { gql } from '@apollo/client';

const SESSION_BY_PK_QUERY = gql`
  query SessionByPkQuery($id: Int!) {
    sessionInfo: session_by_pk(id: $id) {
      id
      name
      start_time
      participants {
        device {
          id
          name
        }
        dancer {
          name
        }
        expected_moves
        expected_position
      }
    }
  }
`;

export default SESSION_BY_PK_QUERY;
