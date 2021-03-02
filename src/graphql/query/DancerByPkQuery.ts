import { gql } from '@apollo/client';

const DANCER_BY_PK_QUERY = gql`
  query DancerByPkQuery($id: Int!) {
    dancer: dancer_by_pk(id: $id) {
      name
      gender
      last_updated
      dancer_analytics(order_by: { created_at: desc }) {
        session {
          id
          name
          start_time
          end_time
        }
        average_delay
        average_emg
        move_accuracy
        position_accuracy
        created_at
      }
      dancer_analytics_aggregate {
        aggregate {
          avg {
            average_delay
            move_accuracy
            position_accuracy
          }
        }
      }
      participants_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export default DANCER_BY_PK_QUERY;
