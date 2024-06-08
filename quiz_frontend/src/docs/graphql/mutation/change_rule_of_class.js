import { gql } from "@apollo/client";

const CHANGE_RULE_OF_CLASS = gql`
  mutation CHANGE_RULE_OF_CLASS(
    $perform: Boolean,
    $invite: Boolean,
    $id_class: String
  ) {
    CHANGE_RULE_OF_CLASS(
      perform: $perform,
      invite: $invite,
      id_class: $id_class,
    ) {
      is_change
    }
  }
`;

export default CHANGE_RULE_OF_CLASS;
