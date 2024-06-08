import { gql } from "@apollo/client"

const DELETE_TERM_FROM_CLASS= gql`
    mutation DELETE_TERM_FROM_CLASS($id_term: String, $id_class: String) {
        DELETE_TERM_FROM_CLASS(id_term: $id_term, id_class: $id_class) {
            is_delete
        }
    }
`

export default DELETE_TERM_FROM_CLASS    