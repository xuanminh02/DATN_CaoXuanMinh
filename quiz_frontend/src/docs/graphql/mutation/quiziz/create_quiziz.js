import { gql } from "@apollo/client"

const CREATEQUIZIZ= gql`
    mutation createQuiz($id_quiziz: String, $owner_id: String, $titleQuiz: String, $categoryQuiz: [String]) {
        createQuiz(id_quiziz: $id_quiziz, owner_id: $owner_id, titleQuiz: $titleQuiz, categoryQuiz: $categoryQuiz) {
            is_create
        }
    }
`

export default CREATEQUIZIZ    