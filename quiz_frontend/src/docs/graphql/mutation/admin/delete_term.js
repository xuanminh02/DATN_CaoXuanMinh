import { gql } from "@apollo/client"

const DELETE_TERM= gql`
    mutation DELETE_TERM($id_term: String) {
        DELETE_TERM(id_term: $id_term) {
            is_delete
        }
    }
`

export default DELETE_TERM    