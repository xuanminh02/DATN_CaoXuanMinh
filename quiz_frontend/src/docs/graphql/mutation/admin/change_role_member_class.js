import { gql } from "@apollo/client"

const CHANGE_ROLE_MEMBER_CLASS= gql`
    mutation CHANGE_ROLE_MEMBER_CLASS($id_user: String, $id_class: String, $role: Int) {
        CHANGE_ROLE_MEMBER_CLASS(id_user: $id_user, id_class: $id_class, role: $role) {
            is_change
        }
    }
`

export default CHANGE_ROLE_MEMBER_CLASS    