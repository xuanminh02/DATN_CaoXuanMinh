import { gql } from "@apollo/client"

const DELETE_MEMBER_FROM_CLASS= gql`
    mutation DELETE_MEMBER_FROM_CLASS($id_user: String, $id_class: String) {
        DELETE_MEMBER_FROM_CLASS(id_user: $id_user, id_class: $id_class) {
            is_delete
        }
    }
`

export default DELETE_MEMBER_FROM_CLASS    