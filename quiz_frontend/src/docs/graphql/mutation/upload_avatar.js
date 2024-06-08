import { gql } from "@apollo/client";

const uploadAvatar = gql`
  mutation 
  (
    $id_user: String!
    $file: File!
  ) {
    uploadAvatar(
      id_user: $id_user
      file: $file
    ) {
      url,
      mimetype,
      encoding
    }
  }
`;

export default uploadAvatar;
