import { gql } from "@apollo/client"

const INSERT_TEST= gql`
    mutation INSERT_TEST($id_user: String, $id_term: String, $id_question: String, $id_test: String, $chose_answer: String, $correct_answer: String) {
        INSERT_TEST(id_user: $id_user, id_term: $id_term, id_question: $id_question, id_test: $id_test, chose_answer: $chose_answer, correct_answer: $correct_answer) {
            is_insert
        }
    }
`

export default INSERT_TEST    