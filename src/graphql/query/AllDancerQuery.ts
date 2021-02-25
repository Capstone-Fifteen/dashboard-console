import { gql } from '@apollo/client';

const ALL_DANCER_QUERY = gql`
  query AllDancerQuery {
    dancer {
      id
      name
      gender
      last_updated
    }
  }
`;

export default ALL_DANCER_QUERY;
