import { gql } from "@apollo/client"

const ADD_QUESTION= gql`
    mutation ADD_QUESTION($id_term: String, $id_question: String, $answer: String, $question: String) {
        ADD_QUESTION(id_term: $id_term, id_question: $id_question, answer: $answer, question: $question) {
            is_add
        }
    }
`

export default ADD_QUESTION    