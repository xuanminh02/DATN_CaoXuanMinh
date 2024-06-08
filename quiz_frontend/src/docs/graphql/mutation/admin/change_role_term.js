import { gql } from "@apollo/client"

const CHANGE_ROLE_TERM= gql`
    mutation CHANGE_ROLE_TERM($id_term: String, $visible: Int, $editable: Int) {
        CHANGE_ROLE_TERM(id_term: $id_term, visible: $visible, editable: $editable) {
            is_change
        }
    }
`

export default CHANGE_ROLE_TERM    