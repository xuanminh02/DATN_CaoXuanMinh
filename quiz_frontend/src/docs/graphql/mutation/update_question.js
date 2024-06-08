import { gql } from "@apollo/client"

const UPDATE_QUESTION= gql`
    mutation UPDATE_QUESTION($id_term: String, $id_question: String, $question: String) {
        UPDATE_QUESTION(id_term: $id_term, id_question: $id_question, question: $question) {
            is_update
        }
    }
`

export default UPDATE_QUESTION    