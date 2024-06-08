import { gql } from "@apollo/client"

const TERM_JOIN_ALL= gql`
    query term_join_all($id_user: String) {
        term_join_all(id_user: $id_user) {
            data_own {
                title,
                id_term,
                time_created,
                description,
                count_question,
                is_author
            },
            data_join {
                title,
                id_term,
                time_created,
                description,
                is_author
            }
        }
    }
`

export default TERM_JOIN_ALL    