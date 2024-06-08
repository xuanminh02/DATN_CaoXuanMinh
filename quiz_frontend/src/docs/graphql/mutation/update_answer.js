import { gql } from "@apollo/client"

const UPDATE_ANSWER= gql`
    mutation UPDATE_ANSWER($id_term: String, $id_question: String, $answer: String) {
        UPDATE_ANSWER(id_term: $id_term, id_question: $id_question, answer: $answer) {
            is_update
        }
    }
`

export default UPDATE_ANSWER    