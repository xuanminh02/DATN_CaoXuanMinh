import { gql } from "@apollo/client"

const DELETE_QUESTION= gql`
    mutation DELETE_QUESTION($id_term: String, $id_question: String) {
        DELETE_QUESTION(id_term: $id_term, id_question: $id_question) {
            is_delete
        }
    }
`

export default DELETE_QUESTION    