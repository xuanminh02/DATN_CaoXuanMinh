import { gql } from "@apollo/client";

const GET_TERM_OF_CLASS = gql`
  query get_term_of_class($id_class: String) {
    get_term_of_class(id_class: $id_class) {
      id_class
      id_term,
      title,
      description,
      count_question,
      author_id,
      author_displayName, 
      author_photoURL
    }
  }
`;

export default GET_TERM_OF_CLASS;
