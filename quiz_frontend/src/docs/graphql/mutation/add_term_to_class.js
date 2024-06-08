import { gql } from "@apollo/client";

const ADD_TERM_TO_CLASS = gql`
  mutation add_term_to_class(
    $id_class: String!
    $id_term: String!
    $own_id: String!
    $add_by: String!
  ) {
    add_term_to_class(
      id_class: $id_class
      id_term: $id_term
      own_id: $own_id
      add_by: $add_by
    ) {
      is_add
      exist
    }
  }
`;

export default ADD_TERM_TO_CLASS;
