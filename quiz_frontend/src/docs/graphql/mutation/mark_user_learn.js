import { gql } from "@apollo/client" 

const mark_user_learn= gql`
    mutation mark_user_learn($id_user: String, $user_learn: Boolean) {
        mark_user_learn(id_user: $id_user, user_learn: $user_learn) {
            is_learn
        }
    }
`

export default mark_user_learn