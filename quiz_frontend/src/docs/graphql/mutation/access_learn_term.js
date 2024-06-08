import { gql } from "@apollo/client";

const ACCESS_LEARN_TERM = gql`
  mutation ACCESS_LEARN_TERM(
    $id_user: String
    $id_term: String
    $own_id: String
    $time_access: String
  ) {
    ACCESS_LEARN_TERM(
      id_user: $id_user
      id_term: $id_term
      own_id: $own_id
      time_access: $time_access
    ) {
      is_user
    }
  }
`;

export default ACCESS_LEARN_TERM;
