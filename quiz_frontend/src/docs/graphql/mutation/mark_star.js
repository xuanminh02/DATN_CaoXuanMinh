import { gql } from "@apollo/client" 

const MARK_STAR= gql`
    mutation MARK_STAR($id_user: String!, $id_term: String, $id_question: String, $is_star: Boolean) {
        MARK_STAR(id_user: $id_user, id_term: $id_term, id_question: $id_question, is_star: $is_star) {
            is_star
        }
    }
`

export default MARK_STAR