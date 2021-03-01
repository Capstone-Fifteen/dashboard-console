import { gql } from '@apollo/client';

const ALL_SESSION_QUERY = gql`
  query AllSessionQuery {
    session {
      id
      name
      start_time
      end_time
      participants_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export default ALL_SESSION_QUERY;
